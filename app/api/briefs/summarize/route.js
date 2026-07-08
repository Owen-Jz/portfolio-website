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

// Human-readable labels for every field we feed the model.
const fieldLabels = {
  companyName: "Company",
  projectName: "Project name",
  businessDescription: "Business description",
  targetAudience: "Target audience",
  projectPurpose: "Project purpose / goals",
  style: "Preferred style",
  existingAssets: "Existing assets",
  brandGuidelines: "Brand guidelines",
  creativeFreedom: "Creative freedom",
  brandPerception: "Desired brand perception",
  voicePersonality: "Voice / personality",
  websitesLiked: "Websites / references they like",
  pagesNeeded: "Pages needed",
  features: "Features requested",
  contentReady: "Content ready?",
  mediaReady: "Media ready?",
  animations: "Animations",
  domainOwned: "Domain owned?",
  domainDetails: "Domain details",
  timeline: "Timeline",
  budget: "Budget",
  additionalNotes: "Additional notes",
};

function buildBriefText(brief) {
  const lines = [
    `Project type: ${typeLabels[brief.type] || brief.type}`,
    `Client name: ${brief.fullName}`,
    brief.email ? `Client email: ${brief.email}` : null,
    brief.phone ? `Client phone: ${brief.phone}` : null,
  ].filter(Boolean);

  for (const [key, label] of Object.entries(fieldLabels)) {
    const value = brief[key];
    if (value && String(value).trim()) {
      lines.push(`${label}: ${String(value).trim()}`);
    }
  }
  return lines.join("\n");
}

const SYSTEM_PROMPT = `You are the senior project strategist for Owen Digitals, a premium design & development studio led by Owen (a Full Stack Design Engineer). A prospective client just submitted a project brief. Your job is to help Owen digest it fast and reply like a pro.

Analyze the brief and respond with ONLY a JSON object (no prose, no markdown fences) in exactly this shape:
{
  "summary": "A tight 2-4 sentence plain-English summary of what this client wants, their goal, and any constraints. Written for Owen to skim.",
  "keyPoints": ["The most important requirements, asks, and constraints as short bullet strings", "..."],
  "nextSteps": ["Concrete, prioritized actions Owen should take to move this deal forward", "..."],
  "followUpEmail": {
    "subject": "A specific, warm subject line for the follow-up email",
    "body": "A ready-to-send follow-up email from Owen to the client. Warm, confident, concise, and personalized to their brief. Reference specifics they mentioned, confirm you understand the goal, ask 1-3 sharp clarifying questions if needed, and propose a clear next step (e.g. a quick call). Sign off as 'Owen — Owen Digitals'. Use \\n for line breaks. Do NOT invent pricing or timelines that weren't provided."
  }
}

Rules:
- Be specific to THIS brief. Never generic.
- keyPoints and nextSteps: 3-6 items each, punchy.
- If a field is missing, don't fabricate — flag the gap as a clarifying question in the email instead.
- Output valid JSON only.`;

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
        { role: "user", content: `Here is the client's project brief:\n\n${buildBriefText(brief)}` },
      ],
      // M2.5 is a reasoning model — reasoning tokens count against max_tokens,
      // so we budget generously to guarantee the JSON output is never truncated.
      { temperature: 0.4, maxTokens: 8000 }
    );

    const parsed = extractJson(content);
    if (!parsed || !parsed.summary) {
      console.error("MiniMax returned unparseable content:", content?.slice(0, 500));
      return NextResponse.json(
        { error: "AI response could not be parsed. Please try again." },
        { status: 502 }
      );
    }

    const insights = {
      summary: String(parsed.summary || ""),
      keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints.map(String) : [],
      nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps.map(String) : [],
      followUpEmail: {
        subject: String(parsed.followUpEmail?.subject || ""),
        body: String(parsed.followUpEmail?.body || ""),
      },
      generatedAt: new Date(),
    };

    brief.aiInsights = insights;
    await brief.save();

    return NextResponse.json({ success: true, insights });
  } catch (error) {
    console.error("Error generating brief summary:", error);
    const message =
      error?.message?.includes("MINIMAX_API_KEY")
        ? "AI is not configured (missing API key)."
        : "Failed to generate AI summary. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
