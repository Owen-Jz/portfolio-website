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
  RefreshCw
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Newsletter Subscribers</h1>
            <p className="text-white/40 text-sm mt-1">
              {total} total subscriber{total !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={(e) => {
              setSearchEmail(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-black/40 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-[#b02222]/50 transition-all text-sm"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-white/30" />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-black/40 border border-white/5 rounded-xl py-2.5 px-4 text-white/80 focus:outline-none focus:border-[#b02222]/50 text-sm cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden relative min-h-[400px]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-[#b02222] border-t-transparent rounded-full animate-spin" />
              <span className="text-white/40 text-xs font-mono">LOADING DATA...</span>
            </div>
          </div>
        )}

        {!loading && subscribers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-white font-medium mb-1">No Subscribers Found</h3>
            <p className="text-white/40 text-sm">
              {searchEmail || statusFilter !== "all"
                ? "Try adjusting your filters."
                : "Share your newsletter to get started."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-wider text-white/40 font-medium">Email</th>
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-wider text-white/40 font-medium">Name</th>
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-wider text-white/40 font-medium">Status</th>
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-wider text-white/40 font-medium">Subscribed</th>
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-wider text-white/40 font-medium">Unsubscribed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {subscribers.map((sub) => (
                  <motion.tr
                    key={sub._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-white/30" />
                        <span className="text-white/80 text-sm font-mono">{sub.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-white/30" />
                        <span className="text-white/50 text-sm">{sub.name || "—"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          sub.status === "active"
                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                            : "bg-red-500/10 border-red-500/20 text-red-400"
                        }`}
                      >
                        {sub.status === "active" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {sub.status === "active" ? "Active" : "Unsubscribed"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-white/30" />
                        <span className="text-white/40 text-xs">
                          {sub.subscribedAt
                            ? new Date(sub.subscribedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-white/30" />
                        <span className="text-white/40 text-xs">
                          {sub.unsubscribedAt
                            ? new Date(sub.unsubscribedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "—"}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-3 bg-white/5 border border-white/10 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex items-center px-4 text-sm font-mono text-white/50">
            {currentPage} / {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-3 bg-white/5 border border-white/10 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}