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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#b02222] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Briefs</h1>
          <p className="text-white/40 text-sm mt-1">{briefs.length} total submissions</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={copyAllToClipboard}
            disabled={filteredBriefs.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white/80 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            {showCopiedAll ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            {showCopiedAll ? "Copied!" : "Copy All"}
          </button>
          <button
            onClick={exportToCSV}
            disabled={filteredBriefs.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-[#b02222] text-white rounded-lg hover:bg-[#991d1d] transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#b02222]"
          />
        </div>
        <div className="flex gap-2">
          {["all", "website", "branding", "ui-ux"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f 
                  ? "bg-[#b02222] text-white" 
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {f === "all" ? "All" : typeConfig[f]?.label || f}
            </button>
          ))}
        </div>
      </div>

      {filteredBriefs.length === 0 ? (
        <div className="text-center py-16 text-white/40">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No briefs found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBriefs.map((brief) => {
            const config = typeConfig[brief.type];
            
            return (
              <motion.div
                key={brief._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${config.color}`}>
                      <config.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{brief.fullName}</h3>
                      <p className="text-white/40 text-sm">{brief.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyBriefToClipboard(brief)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                      title="Copy to clipboard"
                    >
                      {copiedId === brief._id ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deleteBrief(brief._id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/60 hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[brief.status]?.bg} ${statusConfig[brief.status]?.color}`}>
                      {statusConfig[brief.status]?.label}
                    </span>
                    <span className="text-white/30 text-sm">
                      {new Date(brief.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => setSelectedBrief(brief)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {brief.companyName && (
                  <p className="text-white/50 text-sm mt-3 pl-14">
                    {brief.companyName}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {selectedBrief && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBrief(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-[#0a0a0a] border-b border-white/10 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${typeConfig[selectedBrief.type]?.color}`}>
                    {(() => {
                      const Icon = typeConfig[selectedBrief.type]?.icon;
                      return <Icon className="w-5 h-5 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedBrief.fullName}</h2>
                    <p className="text-white/40 text-sm">{typeConfig[selectedBrief.type]?.label} Brief</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyBriefToClipboard(selectedBrief)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                    title="Copy to clipboard"
                  >
                    {copiedId === selectedBrief._id ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => {
                      deleteBrief(selectedBrief._id);
                      setSelectedBrief(null);
                    }}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/60 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedBrief(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white/60" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Mail className="w-4 h-4 text-white/40" />
                    <a href={`mailto:${selectedBrief.email}`} className="text-white/80 text-sm hover:text-[#b02222]">
                      {selectedBrief.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Calendar className="w-4 h-4 text-white/40" />
                    <span className="text-white/80 text-sm">
                      {new Date(selectedBrief.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(selectedBrief).map(([key, value]) => {
                    if (!value || ["_id", "__v", "createdAt", "updatedAt", "type", "status"].includes(key)) return null;
                    
                    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    
                    return (
                      <div key={key}>
                        <label className="text-white/40 text-xs uppercase tracking-wider">{label}</label>
                        <p className="text-white mt-1">{value}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <label className="text-white/40 text-xs uppercase tracking-wider mb-3 block">Update Status</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(statusConfig).map(([status, config]) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedBrief._id, status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedBrief.status === status
                            ? `${config.bg} ${config.color}`
                            : "bg-white/5 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        {config.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
