import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "../../../libs/db";
import ProjectBrief from "../../../models/ProjectBrief";
import { chat, extractJson } from "../../../libs/minimax";

const typeLabels = {
  website: "Website Design",
  branding: "Branding",
  "ui-ux": "UI/UX Design",
};

const CURRENCIES = ["USD", "NGN", "GBP", "EUR", "CAD", "AUD"];

// Best-effort currency hint from whatever the client typed in the budget field.
function detectCurrency(budget) {
  if (!budget) return null;
  const b = String(budget).toLowerCase();
  if (b.includes("₦") || /\bngn\b|\bnaira\b/.test(b)) return "NGN";
  if (b.includes("£") || /\bgbp\b|\bpound/.test(b)) return "GBP";
  if (b.includes("€") || /\beur\b|\beuro/.test(b)) return "EUR";
  if (/\bcad\b/.test(b)) return "CAD";
  if (/\baud\b/.test(b)) return "AUD";
  if (b.includes("$") || /\busd\b|\bdollar/.test(b)) return "USD";
  return null;
}

function buildContext(brief) {
  const insights = brief.aiInsights || {};
  const lines = [
    `Project type: ${typeLabels[brief.type] || brief.type}`,
    `Client: ${brief.fullName}${brief.companyName ? ` (${brief.companyName})` : ""}`,
  ];
  if (insights.summary) lines.push(`\nProject summary:\n${insights.summary}`);
  if (Array.isArray(insights.keyPoints) && insights.keyPoints.length) {
    lines.push(`\nKey deliverables / requirements:\n- ${insights.keyPoints.join("\n- ")}`);
  }
  // Raw brief fields that inform scope & price.
  const raw = [
    ["Business", brief.businessDescription],
    ["Purpose / goals", brief.projectPurpose],
    ["Pages needed", brief.pagesNeeded],
    ["Features requested", brief.features],
    ["Animations", brief.animations],
    ["Timeline", brief.timeline],
    ["Budget", brief.budget],
    ["Additional notes", brief.additionalNotes],
  ].filter(([, v]) => v && String(v).trim());
  if (raw.length) {
    lines.push(`\nBrief details:`);
    for (const [k, v] of raw) lines.push(`${k}: ${String(v).trim()}`);
  }
  return lines.join("\n");
}

const SYSTEM_PROMPT = `You are the billing manager for Owen Digitals, a premium design & development studio. Turn a client's project brief and its summarized deliverables into a clean, professional invoice draft that Owen can review and edit.

Respond with ONLY a JSON object (no prose, no markdown fences) in exactly this shape:
{
  "currency": "USD",
  "lineItems": [
    { "description": "Short deliverable title (e.g. 'Website Design & Build')", "details": "One concise line describing what's included", "quantity": 1, "unitPrice": 0 }
  ],
  "taxRate": 0,
  "notes": "A short payment-terms / thank-you note for the invoice footer"
}

Rules:
- Break the project into 3-6 clear, sellable line items derived from the actual deliverables (pages, features, design, branding, etc.). Never one vague catch-all line.
- Each line item: a punchy 'description', a one-line 'details' scope note, a 'quantity' (usually 1), and a numeric 'unitPrice' (a plain number, no currency symbols or commas).
- If the brief states a budget, choose 'currency' to match it and set unitPrices so the SUBTOTAL lands at (or just under) that budget. Distribute realistically across line items — the biggest deliverable gets the most.
- If NO budget is given, propose fair professional rates for a premium studio; Owen will adjust them.
- 'currency' must be one of: ${CURRENCIES.join(", ")}.
- 'notes': mention a deposit-to-start term (e.g. '50% deposit to begin, balance due on delivery') and a brief thank-you. Do not invent tax; default taxRate to 0.
- Output valid JSON only.`;

// Persist edits made in the invoice editor (line items, prices, currency, etc.).
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, invoice } = await request.json();
    if (!id || !invoice) {
      return NextResponse.json({ error: "id and invoice are required" }, { status: 400 });
    }

    await connectDB();
    const brief = await ProjectBrief.findById(id);
    if (!brief) {
      return NextResponse.json({ error: "Brief not found" }, { status: 404 });
    }

    const lineItems = (Array.isArray(invoice.lineItems) ? invoice.lineItems : [])
      .map((li) => ({
        description: String(li.description || "").trim(),
        details: String(li.details || "").trim(),
        quantity: Number.isFinite(+li.quantity) ? +li.quantity : 1,
        unitPrice: Number.isFinite(+li.unitPrice) ? +li.unitPrice : 0,
      }))
      .filter((li) => li.description);

    brief.invoice = {
      invoiceNumber: String(invoice.invoiceNumber || "").trim() || brief.invoice?.invoiceNumber,
      currency: CURRENCIES.includes(invoice.currency) ? invoice.currency : "USD",
      lineItems,
      taxRate: Number.isFinite(+invoice.taxRate) ? +invoice.taxRate : 0,
      notes: String(invoice.notes || "").trim(),
      generatedAt: brief.invoice?.generatedAt || new Date(),
    };
    await brief.save();

    return NextResponse.json({ success: true, invoice: brief.invoice });
  } catch (error) {
    console.error("Error saving invoice:", error);
    return NextResponse.json({ error: "Failed to save invoice." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Brief id is required" }, { status: 400 });
    }

    await connectDB();
    const brief = await ProjectBrief.findById(id);
    if (!brief) {
      return NextResponse.json({ error: "Brief not found" }, { status: 404 });
    }

    const content = await chat(
      [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Draft an invoice for this project:\n\n${buildContext(brief)}` },
      ],
      { temperature: 0.3, maxTokens: 6000 }
    );

    const parsed = extractJson(content);
    if (!parsed || !Array.isArray(parsed.lineItems) || parsed.lineItems.length === 0) {
      console.error("MiniMax invoice unparseable:", content?.slice(0, 500));
      return NextResponse.json(
        { error: "AI invoice could not be parsed. Please try again." },
        { status: 502 }
      );
    }

    const hintCurrency = detectCurrency(brief.budget);
    const currency = CURRENCIES.includes(parsed.currency)
      ? parsed.currency
      : hintCurrency || "USD";

    const lineItems = parsed.lineItems
      .map((li) => ({
        description: String(li.description || "").trim(),
        details: String(li.details || "").trim(),
        quantity: Number.isFinite(+li.quantity) && +li.quantity > 0 ? +li.quantity : 1,
        unitPrice: Number.isFinite(+li.unitPrice) && +li.unitPrice >= 0 ? Math.round(+li.unitPrice) : 0,
      }))
      .filter((li) => li.description);

    // Stable-ish invoice number: INV-YYYYMMDD-<last4 of id>.
    const d = new Date();
    const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
    const invoiceNumber = brief.invoice?.invoiceNumber || `INV-${ymd}-${String(id).slice(-4).toUpperCase()}`;

    const invoice = {
      invoiceNumber,
      currency,
      lineItems,
      taxRate: Number.isFinite(+parsed.taxRate) ? +parsed.taxRate : 0,
      notes: String(parsed.notes || "").trim(),
      generatedAt: new Date(),
    };

    brief.invoice = invoice;
    await brief.save();

    return NextResponse.json({ success: true, invoice });
  } catch (error) {
    console.error("Error generating invoice:", error);
    const message = error?.message?.includes("MINIMAX_API_KEY")
      ? "AI is not configured (missing API key)."
      : "Failed to generate invoice. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
