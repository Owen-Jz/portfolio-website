"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { X, Plus, Trash2, Download, Save, Loader2, FileText, CheckCircle } from "lucide-react";
import { downloadInvoicePdf, computeTotals, formatMoney } from "../../libs/invoice-pdf";

const CURRENCIES = ["USD", "NGN", "GBP", "EUR", "CAD", "AUD"];

const COMPANY = {
  name: "Owen Digitals",
  tagline: "Design & Development Studio",
  email: "official@owendigitals.work",
};

// Default due date = issue date + 14 days.
function isoDate(d) {
  return new Date(d).toISOString().split("T")[0];
}
function displayDate(iso) {
  if (!iso) return "—";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function InvoiceEditor({ brief, initialInvoice, onClose, onSaved }) {
  const today = useMemo(() => isoDate(new Date()), []);
  const in14 = useMemo(() => isoDate(Date.now() + 14 * 86400000), []);

  const [invoiceNumber, setInvoiceNumber] = useState(initialInvoice?.invoiceNumber || "");
  const [currency, setCurrency] = useState(initialInvoice?.currency || "USD");
  const [issueDate, setIssueDate] = useState(today);
  const [dueDate, setDueDate] = useState(in14);
  const [taxRate, setTaxRate] = useState(initialInvoice?.taxRate ?? 0);
  const [notes, setNotes] = useState(initialInvoice?.notes || "");
  const [items, setItems] = useState(
    (initialInvoice?.lineItems?.length
      ? initialInvoice.lineItems
      : [{ description: "", details: "", quantity: 1, unitPrice: 0 }]
    ).map((li) => ({
      description: li.description || "",
      details: li.details || "",
      quantity: li.quantity ?? 1,
      unitPrice: li.unitPrice ?? 0,
    }))
  );

  // Client (bill-to) — prefilled from the brief, editable.
  const [clientName, setClientName] = useState(brief.fullName || "");
  const [clientCompany, setClientCompany] = useState(brief.companyName || "");
  const [clientEmail, setClientEmail] = useState(brief.email || "");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const invoice = { invoiceNumber, currency, taxRate: Number(taxRate) || 0, notes, lineItems: items };
  const totals = computeTotals(invoice);

  const updateItem = (i, field, value) => {
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, [field]: value } : it)));
    setSaved(false);
  };
  const addItem = () => setItems((prev) => [...prev, { description: "", details: "", quantity: 1, unitPrice: 0 }]);
  const removeItem = (i) => setItems((prev) => prev.filter((_, idx) => idx !== i));

  const persist = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/briefs/invoice", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: brief._id, invoice }),
      });
      const data = await res.json();
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
        onSaved?.(data.invoice);
      }
      return res.ok;
    } catch {
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Save the latest edits, then export.
      await persist();
      await downloadInvoicePdf({
        invoice,
        company: COMPANY,
        client: { name: clientName, company: clientCompany, email: clientEmail },
        issueDate: displayDate(issueDate),
        dueDate: displayDate(dueDate),
      });
    } catch (e) {
      console.error("PDF download failed", e);
      alert("Could not generate the PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const inputCls =
    "w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#b02222]/50 focus-visible:ring-2 focus-visible:ring-[#b02222]/25 transition-all";
  const labelCls = "text-white/40 text-[11px] font-semibold uppercase tracking-[0.1em] mb-1.5 block";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Invoice editor"
    >
      <motion.div
        initial={{ scale: 0.97, opacity: 0, y: 14 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.97, opacity: 0, y: 14 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-[#0a0a0a] border border-white/10 rounded-t-2xl sm:rounded-2xl max-w-3xl w-full max-h-[94vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 px-5 sm:px-6 py-5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#b02222] to-purple-600 shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">Invoice</h2>
              <p className="text-white/40 text-sm truncate">Review, edit, and download as PDF</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/60"
            aria-label="Close invoice editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-5 sm:px-6 py-6 space-y-7">
          {/* Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <label className={labelCls}>Invoice #</label>
              <input className={inputCls} value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Issue date</label>
              <input type="date" className={inputCls} value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Due date</label>
              <input type="date" className={inputCls} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Currency</label>
              <select
                className={`${inputCls} cursor-pointer`}
                value={currency}
                onChange={(e) => { setCurrency(e.target.value); setSaved(false); }}
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bill to */}
          <div>
            <label className={labelCls}>Bill to</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input className={inputCls} placeholder="Client name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
              <input className={inputCls} placeholder="Company" value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} />
              <input className={inputCls} placeholder="Email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
            </div>
          </div>

          {/* Line items */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className={labelCls + " mb-0"}>Line items</label>
              <button
                onClick={addItem}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs font-medium hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/60"
              >
                <Plus className="w-3.5 h-3.5" /> Add item
              </button>
            </div>

            <div className="space-y-2.5">
              {items.map((it, i) => (
                <div key={i} className="bg-[#121212] border border-white/10 rounded-xl p-3">
                  <div className="flex gap-2.5">
                    <div className="flex-1 min-w-0 space-y-2">
                      <input
                        className={inputCls}
                        placeholder="Deliverable (e.g. Website Design & Build)"
                        value={it.description}
                        onChange={(e) => updateItem(i, "description", e.target.value)}
                      />
                      <input
                        className={`${inputCls} text-white/60`}
                        placeholder="Scope details (optional)"
                        value={it.details}
                        onChange={(e) => updateItem(i, "details", e.target.value)}
                      />
                    </div>
                    <button
                      onClick={() => removeItem(i)}
                      disabled={items.length === 1}
                      className="p-2 h-fit rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
                      aria-label="Remove line item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2.5 mt-2.5">
                    <div className="w-20">
                      <span className="text-white/30 text-[10px] uppercase tracking-wide">Qty</span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        className={inputCls}
                        value={it.quantity}
                        onChange={(e) => updateItem(i, "quantity", e.target.value === "" ? "" : Number(e.target.value))}
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-white/30 text-[10px] uppercase tracking-wide">Rate ({currency})</span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        className={inputCls}
                        value={it.unitPrice}
                        onChange={(e) => updateItem(i, "unitPrice", e.target.value === "" ? "" : Number(e.target.value))}
                      />
                    </div>
                    <div className="w-28 text-right">
                      <span className="text-white/30 text-[10px] uppercase tracking-wide block">Amount</span>
                      <span className="text-white text-sm font-mono font-semibold leading-[38px]">
                        {formatMoney((Number(it.quantity) || 0) * (Number(it.unitPrice) || 0), currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tax + Notes + Totals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="w-32">
                <label className={labelCls}>Tax rate (%)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  className={inputCls}
                  value={taxRate}
                  onChange={(e) => { setTaxRate(e.target.value === "" ? "" : Number(e.target.value)); setSaved(false); }}
                />
              </div>
              <div>
                <label className={labelCls}>Notes / payment terms</label>
                <textarea
                  rows={4}
                  className={`${inputCls} resize-none leading-relaxed`}
                  placeholder="e.g. 50% deposit to begin, balance due on delivery."
                  value={notes}
                  onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
                />
              </div>
            </div>

            <div className="bg-[#121212] border border-white/10 rounded-xl p-5 h-fit">
              <div className="flex justify-between text-sm text-white/60 mb-2.5">
                <span>Subtotal</span>
                <span className="font-mono text-white/90">{formatMoney(totals.subtotal, currency)}</span>
              </div>
              {totals.taxRate > 0 && (
                <div className="flex justify-between text-sm text-white/60 mb-2.5">
                  <span>Tax ({totals.taxRate}%)</span>
                  <span className="font-mono text-white/90">{formatMoney(totals.tax, currency)}</span>
                </div>
              )}
              <div className="h-px bg-white/10 my-3" />
              <div className="flex justify-between items-baseline">
                <span className="text-white font-semibold">Total Due</span>
                <span className="font-mono text-[#c92e2e] text-xl font-bold">{formatMoney(totals.total, currency)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/10 px-5 sm:px-6 py-4 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={persist}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/80 rounded-xl text-sm font-medium hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Save className="w-4 h-4" />}
            {saved ? "Saved" : "Save"}
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#b02222] to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-[#c92e2e] hover:to-purple-500 active:scale-[0.99] transition-all shadow-[0_0_24px_rgba(176,34,34,0.3)] disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Download PDF
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
