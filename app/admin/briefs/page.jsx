"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Globe, Palette, Smartphone, X, ExternalLink, Mail, Calendar, DollarSign, Eye, Check, Clock, Copy, Trash2, Download, CheckCircle, Search } from "lucide-react";

const typeConfig = {
  website: { label: "Website", icon: Globe, color: "from-blue-500 to-cyan-500" },
  branding: { label: "Branding", icon: Palette, color: "from-purple-500 to-pink-500" },
  "ui-ux": { label: "UI/UX", icon: Smartphone, color: "from-orange-500 to-red-500" },
};

const statusConfig = {
  new: { label: "New", color: "text-blue-400", bg: "bg-blue-400/10" },
  reviewed: { label: "Reviewed", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  contacted: { label: "Contacted", color: "text-green-400", bg: "bg-green-400/10" },
  completed: { label: "Completed", color: "text-gray-400", bg: "bg-gray-400/10" },
};

// Groups used to render the detail modal as clean, sensible sections.
const detailSections = [
  {
    title: "Contact",
    fields: [
      ["fullName", "Full Name"],
      ["email", "Email"],
      ["phone", "Phone"],
      ["companyName", "Company"],
    ],
  },
  {
    title: "Project Overview",
    fields: [
      ["projectName", "Project Name"],
      ["businessDescription", "Business Description"],
      ["targetAudience", "Target Audience"],
      ["projectPurpose", "Project Purpose"],
    ],
  },
  {
    title: "Brand & Style",
    fields: [
      ["style", "Style"],
      ["existingAssets", "Existing Assets"],
      ["brandGuidelines", "Brand Guidelines"],
      ["creativeFreedom", "Creative Freedom"],
      ["brandPerception", "Brand Perception"],
      ["voicePersonality", "Voice / Personality"],
      ["websitesLiked", "Websites Liked"],
    ],
  },
  {
    title: "Scope & Build",
    fields: [
      ["pagesNeeded", "Pages Needed"],
      ["features", "Features"],
      ["contentReady", "Content Ready"],
      ["mediaReady", "Media Ready"],
      ["animations", "Animations"],
      ["domainOwned", "Domain Owned"],
      ["domainDetails", "Domain Details"],
    ],
  },
  {
    title: "Logistics",
    fields: [
      ["timeline", "Timeline"],
      ["budget", "Budget"],
      ["additionalNotes", "Additional Notes"],
    ],
  },
];

export default function BriefsAdminPage() {
  const [briefs, setBriefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrief, setSelectedBrief] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [showCopiedAll, setShowCopiedAll] = useState(false);

  useEffect(() => {
    fetchBriefs();
  }, []);

  const fetchBriefs = async () => {
    try {
      const res = await fetch("/api/briefs");
      const data = await res.json();
      setBriefs(data.briefs || []);
    } catch (error) {
      console.error("Error fetching briefs:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch("/api/briefs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setBriefs(briefs.map(b => b._id === id ? { ...b, status } : b));
        if (selectedBrief?._id === id) {
          setSelectedBrief({ ...selectedBrief, status });
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteBrief = async (id) => {
    if (!confirm("Are you sure you want to delete this brief?")) return;
    try {
      const res = await fetch(`/api/briefs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setBriefs(briefs.filter(b => b._id !== id));
        if (selectedBrief?._id === id) {
          setSelectedBrief(null);
        }
      }
    } catch (error) {
      console.error("Error deleting brief:", error);
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Type", "Full Name", "Email", "Phone", "Company Name", "Project Name",
      "Business Description", "Target Audience", "Project Purpose", "Style",
      "Existing Assets", "Brand Guidelines", "Creative Freedom", "Brand Perception",
      "Voice/Personality", "Websites Liked", "Pages Needed", "Features",
      "Content Ready", "Media Ready", "Animations", "Domain Owned", "Domain Details",
      "Timeline", "Budget", "Additional Notes", "Status", "Created At"
    ];

    const rows = filteredBriefs.map(brief => [
      typeConfig[brief.type]?.label || brief.type,
      brief.fullName || "",
      brief.email || "",
      brief.phone || "",
      brief.companyName || "",
      brief.projectName || "",
      brief.businessDescription || "",
      brief.targetAudience || "",
      brief.projectPurpose || "",
      brief.style || "",
      brief.existingAssets || "",
      brief.brandGuidelines || "",
      brief.creativeFreedom || "",
      brief.brandPerception || "",
      brief.voicePersonality || "",
      brief.websitesLiked || "",
      brief.pagesNeeded || "",
      brief.features || "",
      brief.contentReady || "",
      brief.mediaReady || "",
      brief.animations || "",
      brief.domainOwned || "",
      brief.domainDetails || "",
      brief.timeline || "",
      brief.budget || "",
      brief.additionalNotes || "",
      statusConfig[brief.status]?.label || brief.status,
      new Date(brief.createdAt).toLocaleString()
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `project-briefs-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const copyBriefToClipboard = (brief) => {
    const text = `
Project Brief - ${typeConfig[brief.type]?.label}
==========================================
Name: ${brief.fullName}
Email: ${brief.email}
Phone: ${brief.phone || "N/A"}
Company: ${brief.companyName || "N/A"}
Project Name: ${brief.projectName || "N/A"}

Business Description: ${brief.businessDescription || "N/A"}
Target Audience: ${brief.targetAudience || "N/A"}
Project Purpose: ${brief.projectPurpose || "N/A"}
Style: ${brief.style || "N/A"}
Existing Assets: ${brief.existingAssets || "N/A"}
Brand Guidelines: ${brief.brandGuidelines || "N/A"}
Creative Freedom: ${brief.creativeFreedom || "N/A"}
Brand Perception: ${brief.brandPerception || "N/A"}
Voice/Personality: ${brief.voicePersonality || "N/A"}
Websites Liked: ${brief.websitesLiked || "N/A"}
Pages Needed: ${brief.pagesNeeded || "N/A"}
Features: ${brief.features || "N/A"}
Content Ready: ${brief.contentReady || "N/A"}
Media Ready: ${brief.mediaReady || "N/A"}
Animations: ${brief.animations || "N/A"}
Domain Owned: ${brief.domainOwned || "N/A"}
Domain Details: ${brief.domainDetails || "N/A"}
Timeline: ${brief.timeline || "N/A"}
Budget: ${brief.budget || "N/A"}
Additional Notes: ${brief.additionalNotes || "N/A"}

Status: ${statusConfig[brief.status]?.label}
Submitted: ${new Date(brief.createdAt).toLocaleString()}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedId(brief._id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyAllToClipboard = () => {
    const text = filteredBriefs.map(brief => `
==========================================
${typeConfig[brief.type]?.label} Brief
==========================================
Name: ${brief.fullName}
Email: ${brief.email}
Phone: ${brief.phone || "N/A"}
Company: ${brief.companyName || "N/A"}
Project Name: ${brief.projectName || "N/A"}
Business Description: ${brief.businessDescription || "N/A"}
Target Audience: ${brief.targetAudience || "N/A"}
Project Purpose: ${brief.projectPurpose || "N/A"}
Style: ${brief.style || "N/A"}
Existing Assets: ${brief.existingAssets || "N/A"}
Brand Guidelines: ${brief.brandGuidelines || "N/A"}
Creative Freedom: ${brief.creativeFreedom || "N/A"}
Brand Perception: ${brief.brandPerception || "N/A"}
Voice/Personality: ${brief.voicePersonality || "N/A"}
Websites Liked: ${brief.websitesLiked || "N/A"}
Pages Needed: ${brief.pagesNeeded || "N/A"}
Features: ${brief.features || "N/A"}
Content Ready: ${brief.contentReady || "N/A"}
Media Ready: ${brief.mediaReady || "N/A"}
Animations: ${brief.animations || "N/A"}
Domain Owned: ${brief.domainOwned || "N/A"}
Domain Details: ${brief.domainDetails || "N/A"}
Timeline: ${brief.timeline || "N/A"}
Budget: ${brief.budget || "N/A"}
Additional Notes: ${brief.additionalNotes || "N/A"}
Status: ${statusConfig[brief.status]?.label}
Submitted: ${new Date(brief.createdAt).toLocaleString()}
`).join("\n\n");

    navigator.clipboard.writeText(text);
    setShowCopiedAll(true);
    setTimeout(() => setShowCopiedAll(false), 2000);
  };

  const filteredBriefs = briefs.filter(brief => {
    const matchesFilter = filter === "all" || brief.type === filter;
    const matchesSearch = !searchQuery ||
      brief.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brief.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brief.companyName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-white tracking-tight leading-none">
            Project Briefs
          </h1>
          <p className="text-white/40 text-sm mt-2">
            {loading ? "Loading submissions…" : `${briefs.length} total submission${briefs.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={copyAllToClipboard}
            disabled={filteredBriefs.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/80 rounded-xl text-sm font-medium hover:bg-white/10 hover:text-white active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/60"
          >
            {showCopiedAll ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            {showCopiedAll ? "Copied!" : "Copy All"}
          </button>
          <button
            onClick={exportToCSV}
            disabled={filteredBriefs.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#b02222] text-white rounded-xl text-sm font-medium hover:bg-[#c92e2e] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(176,34,34,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/60"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
          <label htmlFor="brief-search" className="sr-only">Search briefs</label>
          <input
            id="brief-search"
            type="text"
            placeholder="Search by name, email, or company…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#b02222]/50 focus-visible:ring-2 focus-visible:ring-[#b02222]/30 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "website", "branding", "ui-ux"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/60 ${
                filter === f
                  ? "bg-[#b02222] text-white shadow-[0_0_16px_rgba(176,34,34,0.25)]"
                  : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {f === "all" ? "All" : typeConfig[f]?.label || f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#121212] border border-white/5 rounded-2xl p-4 animate-pulse"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-40 bg-white/5 rounded-full" />
                  <div className="h-3 w-56 bg-white/5 rounded-full" />
                </div>
                <div className="hidden sm:block h-6 w-20 bg-white/5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredBriefs.length === 0 ? (
        <div className="bg-[#121212] border border-white/5 rounded-2xl flex flex-col items-center justify-center text-center py-20 px-6">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-5">
            <FileText className="w-7 h-7 text-white/30" />
          </div>
          <h3 className="text-white font-semibold mb-1.5">No briefs found</h3>
          <p className="text-white/40 text-sm max-w-xs">
            {searchQuery || filter !== "all"
              ? "Try adjusting your search or filters to see more results."
              : "New project briefs will appear here as they come in."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBriefs.map((brief, index) => {
            const config = typeConfig[brief.type] || typeConfig.website;
            const status = statusConfig[brief.status];

            return (
              <motion.div
                key={brief._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut", delay: Math.min(index * 0.03, 0.3) }}
                onClick={() => setSelectedBrief(brief)}
                className="group bg-[#121212] border border-white/5 rounded-2xl p-4 hover:border-white/10 hover:bg-[#161616] transition-colors cursor-pointer"
              >
                <div className="flex items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${config.color} shrink-0`}>
                      <config.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white font-semibold truncate leading-tight">{brief.fullName}</h3>
                      <p className="text-white/40 text-sm font-mono truncate mt-0.5">{brief.email}</p>
                      {brief.companyName && (
                        <p className="text-white/50 text-xs mt-1 truncate sm:hidden">{brief.companyName}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {brief.companyName && (
                      <span className="hidden lg:inline text-white/40 text-sm max-w-[160px] truncate">
                        {brief.companyName}
                      </span>
                    )}
                    {status && (
                      <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    )}
                    <span className="hidden md:inline text-white/30 text-xs font-mono whitespace-nowrap">
                      {new Date(brief.createdAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-1 ml-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); copyBriefToClipboard(brief); }}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/60"
                        title="Copy to clipboard"
                        aria-label="Copy brief to clipboard"
                      >
                        {copiedId === brief._id ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteBrief(brief._id); }}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/50 hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
                        title="Delete"
                        aria-label="Delete brief"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedBrief(brief); }}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/60"
                        title="View details"
                        aria-label="View brief details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile-only status row */}
                {status && (
                  <div className="flex sm:hidden items-center gap-2 mt-3 pl-[52px]">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                    <span className="text-white/30 text-xs font-mono">
                      {new Date(brief.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedBrief && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
            onClick={() => setSelectedBrief(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Brief details for ${selectedBrief.fullName}`}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-[#0a0a0a] border border-white/10 rounded-t-2xl sm:rounded-2xl max-w-2xl w-full max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky header */}
              <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 px-5 sm:px-6 py-5 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${typeConfig[selectedBrief.type]?.color || typeConfig.website.color} shrink-0`}>
                    {(() => {
                      const Icon = typeConfig[selectedBrief.type]?.icon || FileText;
                      return <Icon className="w-5 h-5 text-white" />;
                    })()}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold text-white truncate leading-tight">{selectedBrief.fullName}</h2>
                    <p className="text-white/40 text-sm">{typeConfig[selectedBrief.type]?.label || selectedBrief.type} Brief</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => copyBriefToClipboard(selectedBrief)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/60"
                    title="Copy to clipboard"
                    aria-label="Copy brief to clipboard"
                  >
                    {copiedId === selectedBrief._id ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => {
                      deleteBrief(selectedBrief._id);
                      setSelectedBrief(null);
                    }}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/60 hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
                    title="Delete"
                    aria-label="Delete brief"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedBrief(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/60"
                    title="Close"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto px-5 sm:px-6 py-6 space-y-7">
                {/* Quick facts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3.5 bg-[#1a1a1a] border border-white/5 rounded-xl">
                    <Mail className="w-4 h-4 text-white/40 shrink-0" />
                    <a href={`mailto:${selectedBrief.email}`} className="text-white/90 text-sm font-mono hover:text-[#c92e2e] transition-colors truncate">
                      {selectedBrief.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 bg-[#1a1a1a] border border-white/5 rounded-xl">
                    <Calendar className="w-4 h-4 text-white/40 shrink-0" />
                    <span className="text-white/90 text-sm">
                      {new Date(selectedBrief.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </div>

                {/* Grouped definition list */}
                {detailSections.map((section) => {
                  const visible = section.fields.filter(([key]) => selectedBrief[key]);
                  if (visible.length === 0) return null;
                  return (
                    <div key={section.title}>
                      <h3 className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.12em] mb-3">
                        {section.title}
                      </h3>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                        {visible.map(([key, label]) => (
                          <div key={key} className="min-w-0">
                            <dt className="text-white/40 text-xs">{label}</dt>
                            <dd className="text-white text-sm mt-1 break-words whitespace-pre-wrap leading-relaxed">
                              {selectedBrief[key]}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  );
                })}
              </div>

              {/* Sticky footer — Update Status segmented control */}
              <div className="sticky bottom-0 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/10 px-5 sm:px-6 py-4 shrink-0">
                <label className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.12em] mb-2.5 block">
                  Update Status
                </label>
                <div className="flex p-1 bg-black/40 border border-white/5 rounded-xl gap-1" role="group" aria-label="Update brief status">
                  {Object.entries(statusConfig).map(([status, config]) => {
                    const active = selectedBrief.status === status;
                    return (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedBrief._id, status)}
                        aria-pressed={active}
                        className={`flex-1 px-2 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/60 ${
                          active
                            ? `${config.bg} ${config.color}`
                            : "text-white/50 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {config.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
