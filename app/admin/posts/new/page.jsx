"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FilePlus } from "lucide-react";
import BlogPostForm from "../../../components/admin/BlogPostForm";

export default function NewPostPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin");
  };

  return (
    <div className="max-w-3xl mx-auto">
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
          <div className="p-2.5 rounded-xl bg-[#b02222]/10 border border-[#b02222]/20 text-[#b02222]">
            <FilePlus className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#b02222]/80 mb-0.5">
              New entry
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              New post
            </h1>
          </div>
        </div>
      </div>

      <BlogPostForm onSuccess={handleSuccess} />
    </div>
  );
}
