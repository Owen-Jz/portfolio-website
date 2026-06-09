"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Wrench,
  RefreshCw,
  ListOrdered,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

// Small status pill for a utility action
function StatusPill({ status }) {
  if (status === "loading") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Running
      </span>
    );
  }
  if (status === "success") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-green-400">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Done
      </span>
    );
  }
  if (status === "error") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-red-400">
        <AlertCircle className="w-3.5 h-3.5" />
        Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-white/30">
      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
      Idle
    </span>
  );
}

function ResultPanel({ result, status }) {
  if (!result) return null;
  return (
    <div
      className={`mt-4 rounded-xl border p-4 ${
        status === "success"
          ? "bg-green-500/[0.06] border-green-500/20"
          : "bg-red-500/[0.06] border-red-500/20"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        {status === "success" ? (
          <CheckCircle2 className="w-4 h-4 text-green-400" />
        ) : (
          <AlertCircle className="w-4 h-4 text-red-400" />
        )}
        <span
          className={`text-xs font-medium ${
            status === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {status === "success" ? "Completed successfully" : "Something went wrong"}
        </span>
      </div>
      <pre className="text-xs text-white/60 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}

export default function SyncBlogPage() {
  const [syncStatus, setSyncStatus] = useState("idle");
  const [fixStatus, setFixStatus] = useState("idle");
  const [syncResult, setSyncResult] = useState(null);
  const [fixResult, setFixResult] = useState(null);

  const syncPosts = async () => {
    setSyncStatus("loading");
    setSyncResult(null);
    try {
      const response = await fetch("/api/blog/sync", {
        method: "POST",
      });
      const data = await response.json();
      setSyncResult(data);
      setSyncStatus(data.success ? "success" : "error");
    } catch (error) {
      setSyncResult({ error: error.message });
      setSyncStatus("error");
    }
  };

  const fixOrder = async () => {
    setFixStatus("loading");
    setFixResult(null);
    try {
      const response = await fetch("/api/blog/fix-order");
      const data = await response.json();
      setFixResult(data);
      setFixStatus(data.success ? "success" : "error");
    } catch (error) {
      setFixResult({ error: error.message });
      setFixStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-white/70">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#b02222]/80 mb-0.5">
              Utilities
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Blog maintenance
            </h1>
            <p className="text-sm text-white/40 mt-1">
              One-off tools to keep blog data consistent.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {/* Sync Section */}
        <section className="bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-2 rounded-xl bg-white/5 border border-white/5 text-white/70">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">
                  Sync blog posts
                </h2>
                <p className="text-sm text-white/40 mt-1 max-w-md">
                  Update every post with content from the local data file —
                  refreshes titles, content and images.
                </p>
              </div>
            </div>
            <StatusPill status={syncStatus} />
          </div>

          <button
            onClick={syncPosts}
            disabled={syncStatus === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#b02222] py-3 px-6 font-medium text-white transition-all hover:bg-[#c92e2e] enabled:shadow-[0_0_20px_rgba(176,34,34,0.3)] enabled:hover:shadow-[0_0_30px_rgba(176,34,34,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {syncStatus === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Syncing…
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Sync blog posts
              </>
            )}
          </button>

          <ResultPanel result={syncResult} status={syncStatus} />
        </section>

        {/* Fix Order Section */}
        <section className="bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-2 rounded-xl bg-white/5 border border-white/5 text-white/70">
                <ListOrdered className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">
                  Fix post order
                </h2>
                <p className="text-sm text-white/40 mt-1 max-w-md">
                  Initialise the order and featured fields for posts that are
                  missing them. Run this if drag-and-drop ordering isn&apos;t working.
                </p>
              </div>
            </div>
            <StatusPill status={fixStatus} />
          </div>

          <button
            onClick={fixOrder}
            disabled={fixStatus === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 py-3 px-6 font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {fixStatus === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Fixing…
              </>
            ) : (
              <>
                <ListOrdered className="w-4 h-4" />
                Fix post order fields
              </>
            )}
          </button>

          <ResultPanel result={fixResult} status={fixStatus} />
        </section>

        {/* Link to blog order page */}
        <Link
          href="/admin/blog-order"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-[#121212] p-5 transition-colors hover:border-white/10 hover:bg-white/[0.02]"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-white/70">
              <ListOrdered className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                Manage post order
              </p>
              <p className="text-xs text-white/40">
                Drag to reorder and choose a featured post.
              </p>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
        </Link>
      </div>
    </div>
  );
}
