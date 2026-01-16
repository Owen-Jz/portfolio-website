"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8">
      <div className="bg-[#151515] border border-white/10 rounded-2xl p-8 max-w-lg w-full">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/admin"
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Blog Maintenance</h1>
        </div>

        {/* Sync Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-2">Sync Blog Posts</h2>
          <p className="text-white/60 text-sm mb-4">
            Update all blog posts with content from the local data file. This updates titles, content, and images.
          </p>

          <button
            onClick={syncPosts}
            disabled={syncStatus === "loading"}
            className="w-full py-3 px-6 bg-[#b02222] text-white font-semibold rounded-lg hover:bg-[#8a1b1b] transition-colors disabled:opacity-50"
          >
            {syncStatus === "loading" ? "Syncing..." : "Sync Blog Posts"}
          </button>

          {syncResult && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                syncStatus === "success"
                  ? "bg-green-500/10 border border-green-500/30"
                  : "bg-red-500/10 border border-red-500/30"
              }`}
            >
              <pre className="text-sm text-white/80 whitespace-pre-wrap">
                {JSON.stringify(syncResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 pt-6">
          {/* Fix Order Section */}
          <h2 className="text-lg font-semibold text-white mb-2">Fix Post Order</h2>
          <p className="text-white/60 text-sm mb-4">
            Initialize order and featured fields for posts that don't have them. 
            Run this if drag-and-drop ordering isn't working.
          </p>

          <button
            onClick={fixOrder}
            disabled={fixStatus === "loading"}
            className="w-full py-3 px-6 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            {fixStatus === "loading" ? "Fixing..." : "Fix Post Order Fields"}
          </button>

          {fixResult && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                fixStatus === "success"
                  ? "bg-green-500/10 border border-green-500/30"
                  : "bg-red-500/10 border border-red-500/30"
              }`}
            >
              <pre className="text-sm text-white/80 whitespace-pre-wrap">
                {JSON.stringify(fixResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Link to blog order page */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <Link
            href="/admin/blog-order"
            className="block w-full py-3 px-6 bg-blue-600/20 border border-blue-500/30 text-blue-400 font-semibold rounded-lg hover:bg-blue-600/30 transition-colors text-center"
          >
            Go to Blog Order Management →
          </Link>
        </div>
      </div>
    </div>
  );
}
