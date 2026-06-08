"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Mail,
  User,
  Calendar,
  CheckCircle2,
  XCircle,
  Download
} from "lucide-react";

export default function SubscribersPage() {
  const { data: session } = useSession();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchEmail, setSearchEmail] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    fetchSubscribers();
  }, [currentPage, statusFilter, searchEmail]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
        status: statusFilter,
      });

      if (searchEmail) {
        params.append("search", searchEmail);
      }

      const response = await fetch(`/api/newsletter/subscribers?${params}`);
      const result = await response.json();

      if (result.success) {
        setSubscribers(result.data.subscribers);
        setTotal(result.data.pagination.total);
        setTotalPages(result.data.pagination.totalPages);
      } else {
        setError(result.error || "Failed to fetch subscribers");
      }
    } catch (err) {
      setError("Failed to load subscribers");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const rows = [
      ["Email", "Name", "Status", "Subscribed At", "Unsubscribed At"],
      ...subscribers.map((s) => [
        s.email,
        s.name || "",
        s.status,
        s.subscribedAt ? new Date(s.subscribedAt).toISOString() : "",
        s.unsubscribedAt ? new Date(s.unsubscribedAt).toISOString() : "",
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!session) return null;

  const formatDate = (value) =>
    value
      ? new Date(value).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  const StatusPill = ({ status }) => {
    const active = status === "active";
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
          active
            ? "bg-green-500/10 border-green-500/20 text-green-400"
            : "bg-red-500/10 border-red-500/20 text-red-400"
        }`}
      >
        {active ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
        {active ? "Active" : "Unsubscribed"}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            aria-label="Back to dashboard"
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/60 shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <div>
            <h1 className="text-[28px] md:text-[32px] font-bold text-white tracking-tight leading-none">
              Newsletter Subscribers
            </h1>
            <p className="text-white/40 text-sm mt-2">
              {loading ? "Loading subscribers…" : `${total} total subscriber${total !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={subscribers.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-white/80 rounded-xl text-sm font-medium transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/60 shrink-0"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
          <label htmlFor="subscriber-search" className="sr-only">Search by email</label>
          <input
            id="subscriber-search"
            type="text"
            placeholder="Search by email…"
            value={searchEmail}
            onChange={(e) => {
              setSearchEmail(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-[#b02222]/50 focus-visible:ring-2 focus-visible:ring-[#b02222]/30 transition-all text-sm"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <Filter className="w-4 h-4 text-white/30 shrink-0" />
          <label htmlFor="status-filter" className="sr-only">Filter by status</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 md:flex-none bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 text-white/80 focus:outline-none focus:border-[#b02222]/50 focus-visible:ring-2 focus-visible:ring-[#b02222]/30 text-sm cursor-pointer transition-all"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
          {error}
        </div>
      )}

      {/* Data */}
      <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
        {/* Loading skeleton */}
        {loading ? (
          <>
            {/* Desktop skeleton */}
            <div className="hidden md:block">
              <div className="border-b border-white/5 bg-white/[0.02] px-6 py-4 grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] gap-4">
                {["Email", "Name", "Status", "Subscribed", "Unsubscribed"].map((h) => (
                  <span key={h} className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                    {h}
                  </span>
                ))}
              </div>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="px-6 py-4 grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] gap-4 items-center border-b border-white/5 last:border-0 animate-pulse"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="h-3.5 w-44 bg-white/5 rounded-full" />
                  <div className="h-3.5 w-24 bg-white/5 rounded-full" />
                  <div className="h-6 w-24 bg-white/5 rounded-full" />
                  <div className="h-3 w-20 bg-white/5 rounded-full" />
                  <div className="h-3 w-20 bg-white/5 rounded-full" />
                </div>
              ))}
            </div>
            {/* Mobile skeleton */}
            <div className="md:hidden divide-y divide-white/5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-4 space-y-3 animate-pulse" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="h-3.5 w-48 bg-white/5 rounded-full" />
                  <div className="flex justify-between">
                    <div className="h-3 w-24 bg-white/5 rounded-full" />
                    <div className="h-6 w-24 bg-white/5 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : subscribers.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-5">
              <Mail className="w-7 h-7 text-white/30" />
            </div>
            <h3 className="text-white font-semibold mb-1.5">No subscribers found</h3>
            <p className="text-white/40 text-sm max-w-xs">
              {searchEmail || statusFilter !== "all"
                ? "Try adjusting your search or filters."
                : "Share your newsletter to start collecting subscribers."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Email</th>
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Name</th>
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Status</th>
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Subscribed</th>
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Unsubscribed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {subscribers.map((sub, index) => (
                    <motion.tr
                      key={sub._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.2) }}
                      className="hover:bg-white/[0.025] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <Mail className="w-4 h-4 text-white/30 shrink-0" />
                          <span className="text-white/90 text-sm font-mono">{sub.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white/60 text-sm">{sub.name || "—"}</span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusPill status={sub.status} />
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white/40 text-xs font-mono">{formatDate(sub.subscribedAt)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white/40 text-xs font-mono">{formatDate(sub.unsubscribedAt)}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-white/5">
              {subscribers.map((sub, index) => (
                <motion.div
                  key={sub._id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.2) }}
                  className="p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Mail className="w-4 h-4 text-white/30 shrink-0" />
                      <span className="text-white/90 text-sm font-mono truncate">{sub.email}</span>
                    </div>
                    <StatusPill status={sub.status} />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-white/50">
                      <User className="w-3.5 h-3.5 text-white/30" />
                      <span>{sub.name || "—"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/40 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-white/30" />
                      <span>{formatDate(sub.subscribedAt)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="p-3 bg-white/5 border border-white/10 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/60"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex items-center px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-white/60 min-w-[80px] justify-center">
            {currentPage} / {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="p-3 bg-white/5 border border-white/10 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/60"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
