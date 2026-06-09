"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil, Loader2, FileX2 } from "lucide-react";
import BlogPostForm from "../../../components/admin/BlogPostForm";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/posts/${params.id}`);
        const result = await response.json();

        if (result.success) {
          setPost(result.data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id, router]);

  const handleSuccess = () => {
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 h-5 w-40 rounded bg-white/5 animate-pulse" />
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-[#121212] py-24">
          <Loader2 className="w-7 h-7 text-[#b02222] animate-spin" />
          <p className="text-sm text-white/40">Loading post…</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-[#121212] py-20 text-center px-6">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
            <FileX2 className="w-7 h-7 text-white/30" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Post not found</h2>
            <p className="text-sm text-white/40 mt-1 max-w-sm">
              We couldn&apos;t load this post. It may have been deleted or the link is incorrect.
            </p>
          </div>
          <Link
            href="/admin"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to dashboard
          </Link>
        </div>
      </div>
    );
  }

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
            <Pencil className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#b02222]/80 mb-0.5">
              Editing
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight truncate">
              Edit post
            </h1>
            {post?.title && (
              <p className="text-sm text-white/40 mt-1 truncate">{post.title}</p>
            )}
          </div>
        </div>
      </div>

      <BlogPostForm post={post} onSuccess={handleSuccess} />
    </div>
  );
}
