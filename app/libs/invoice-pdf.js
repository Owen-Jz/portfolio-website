/**
 * Client-side invoice PDF generator built on jsPDF + autotable.
 *
 * jsPDF touches `window`, so this module must only ever run in the browser.
 * We dynamic-import the libraries inside the function so nothing lands in the
 * server bundle.
 */

const CURRENCY_SYMBOLS = {
  USD: "$",
  NGN: "₦", // ₦
  GBP: "£", // £
  EUR: "€", // €
  CAD: "CA$",
  AUD: "A$",
};

const BRAND = [176, 34, 34]; // #b02222
const INK = [17, 17, 19];
const MUTED = [120, 120, 128];

export function currencySymbol(code) {
  return CURRENCY_SYMBOLS[code] || `${code || ""} `;
}

export function formatMoney(amount, currency) {
  const n = Number(amount) || 0;
  const formatted = n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${currencySymbol(currency)}${formatted}`;
}

export function computeTotals(invoice) {
  const items = invoice.lineItems || [];
  const subtotal = items.reduce((sum, li) => sum + (Number(li.quantity) || 0) * (Number(li.unitPrice) || 0), 0);
  const taxRate = Number(invoice.taxRate) || 0;
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;
  return { subtotal, taxRate, tax, total };
}

/**
 * Build and trigger download of the invoice PDF.
 *
 * @param {object} params
 * @param {object} params.invoice   { invoiceNumber, currency, lineItems[], taxRate, notes }
 * @param {object} params.company   { name, email, tagline }
 * @param {object} params.client    { name, email, company }
 * @param {string} params.issueDate ISO or display date string
 * @param {string} params.dueDate   ISO or display date string
 */
export async function downloadInvoicePdf({ invoice, company, client, issueDate, dueDate }) {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 48;
  const currency = invoice.currency || "USD";

  // ---- Header band ----
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, pageW, 6, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...INK);
  doc.text(company?.name || "Owen Digitals", margin, 64);

  if (company?.tagline) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text(company.tagline, margin, 80);
  }
  if (company?.email) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text(company.email, margin, company?.tagline ? 94 : 80);
  }

  // INVOICE title (right aligned)
  doc.setFont("helvetica", "bold");
  doc.setFontSize?.(26);
  doc.setFontSize(26);
  doc.setTextColor(...BRAND);
  doc.text("INVOICE", pageW - margin, 64, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text(`#${invoice.invoiceNumber || "—"}`, pageW - margin, 82, { align: "right" });

  // ---- Meta + Bill To ----
  let y = 130;
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text("BILL TO", margin, y);
  doc.text("DETAILS", pageW - margin - 200, y);

  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(client?.name || "—", margin, y + 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  let by = y + 34;
  if (client?.company) { doc.text(String(client.company), margin, by); by += 14; }
  if (client?.email) { doc.text(String(client.email), margin, by); by += 14; }

  // Meta rows (right column)
  const metaX = pageW - margin - 200;
  const metaValX = pageW - margin;
  const meta = [
    ["Issue date", issueDate || "—"],
    ["Due date", dueDate || "—"],
    ["Currency", currency],
  ];
  let my = y + 18;
  doc.setFontSize(10);
  meta.forEach(([label, val]) => {
    doc.setTextColor(...MUTED);
    doc.setFont("helvetica", "normal");
    doc.text(label, metaX, my);
    doc.setTextColor(...INK);
    doc.setFont("helvetica", "bold");
    doc.text(String(val), metaValX, my, { align: "right" });
    my += 16;
  });

  const startY = Math.max(by, my) + 22;

  // ---- Line items table ----
  const body = (invoice.lineItems || []).map((li) => {
    const qty = Number(li.quantity) || 0;
    const rate = Number(li.unitPrice) || 0;
    const desc = li.details ? `${li.description}\n${li.details}` : li.description;
    return [desc, String(qty), formatMoney(rate, currency), formatMoney(qty * rate, currency)];
  });

  autoTable(doc, {
    startY,
    head: [["Description", "Qty", "Rate", "Amount"]],
    body,
    margin: { left: margin, right: margin },
    styles: { font: "helvetica", fontSize: 10, cellPadding: 8, textColor: INK, lineColor: [235, 235, 238], lineWidth: 0.5 },
    headStyles: { fillColor: INK, textColor: [255, 255, 255], fontStyle: "bold", halign: "left" },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { cellWidth: 50, halign: "center" },
      2: { cellWidth: 90, halign: "right" },
      3: { cellWidth: 90, halign: "right" },
    },
    didParseCell: (data) => {
      // Dim the details second line.
      if (data.section === "body" && data.column.index === 0) {
        data.cell.styles.fontSize = 10;
      }
    },
  });

  // ---- Totals ----
  const { subtotal, taxRate, tax, total } = computeTotals(invoice);
  let ty = doc.lastAutoTable.finalY + 20;
  const labelX = pageW - margin - 200;
  const valX = pageW - margin;

  const totalRow = (label, val, opts = {}) => {
    doc.setFont("helvetica", opts.bold ? "bold" : "normal");
    doc.setFontSize(opts.big ? 13 : 10);
    doc.setTextColor(...(opts.brand ? BRAND : opts.bold ? INK : MUTED));
    doc.text(label, labelX, ty);
    doc.setTextColor(...(opts.brand ? BRAND : INK));
    doc.text(val, valX, ty, { align: "right" });
    ty += opts.big ? 24 : 18;
  };

  totalRow("Subtotal", formatMoney(subtotal, currency));
  if (taxRate > 0) totalRow(`Tax (${taxRate}%)`, formatMoney(tax, currency));
  // divider
  doc.setDrawColor(235, 235, 238);
  doc.line(labelX, ty - 6, valX, ty - 6);
  ty += 6;
  totalRow("Total Due", formatMoney(total, currency), { bold: true, big: true, brand: true });

  // ---- Notes / payment terms ----
  if (invoice.notes) {
    ty += 16;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text("NOTES & PAYMENT TERMS", margin, ty);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...INK);
    const wrapped = doc.splitTextToSize(invoice.notes, pageW - margin * 2);
    doc.text(wrapped, margin, ty + 16);
  }

  // ---- Footer ----
  const footerY = doc.internal.pageSize.getHeight() - 40;
  doc.setDrawColor(235, 235, 238);
  doc.line(margin, footerY, pageW - margin, footerY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text(`Thank you for your business — ${company?.name || "Owen Digitals"}`, margin, footerY + 16);

  const safeName = (client?.name || "client").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  doc.save(`${invoice.invoiceNumber || "invoice"}-${safeName}.pdf`);
}
