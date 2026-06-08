"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Search,
    Filter,
    Plus,
    Edit3,
    Trash2,
    Eye,
    EyeOff,
    FileText,
    CheckCircle2,
    Clock,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    BellRing,
    Users,
    ListOrdered,
} from "lucide-react";
import { cn } from "../libs/utils";

const StatsCard = ({ title, value, icon: Icon, accent, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut", delay }}
        className="bg-[#121212] border border-white/5 p-5 rounded-2xl flex items-center justify-between"
    >
        <div>
            <p className="text-white/40 text-sm mb-1.5">{title}</p>
            <h3 className="text-3xl font-bold text-white tracking-tight font-mono">{value}</h3>
        </div>
        <div className={cn("p-3 rounded-xl border", accent)}>
            <Icon className="w-5 h-5" />
        </div>
    </motion.div>
);

// Skeleton row for the posts table while loading
const PostSkeletonRow = () => (
    <tr className="border-b border-white/5">
        <td className="px-6 py-5">
            <div className="h-4 w-48 rounded bg-white/5 animate-pulse" />
            <div className="h-3 w-32 rounded bg-white/[0.03] animate-pulse mt-2" />
        </td>
        <td className="px-6 py-5">
            <div className="h-6 w-20 rounded-lg bg-white/5 animate-pulse" />
        </td>
        <td className="px-6 py-5">
            <div className="h-6 w-16 rounded-full bg-white/5 animate-pulse" />
        </td>
        <td className="px-6 py-5">
            <div className="h-8 w-28 rounded-lg bg-white/5 animate-pulse ml-auto" />
        </td>
    </tr>
);

const SubscriberSkeletonRow = () => (
    <tr className="border-b border-white/5">
        <td className="px-6 py-4"><div className="h-4 w-40 rounded bg-white/5 animate-pulse" /></td>
        <td className="px-6 py-4"><div className="h-4 w-24 rounded bg-white/5 animate-pulse" /></td>
        <td className="px-6 py-4"><div className="h-6 w-20 rounded-full bg-white/5 animate-pulse" /></td>
        <td className="px-6 py-4"><div className="h-4 w-20 rounded bg-white/5 animate-pulse" /></td>
    </tr>
);

const formatDate = (value) =>
    value
        ? new Date(value).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : "—";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [subscribers, setSubscribers] = useState([]);
  const [subscribersLoading, setSubscribersLoading] = useState(true);
  const [subscribersError, setSubscribersError] = useState(false);
  const postsPerPage = 10;

  useEffect(() => {
    fetchPosts();
    fetchSubscriberCount();
  }, [currentPage, filterCategory, searchTerm]);

  const fetchSubscriberCount = async () => {
    try {
      const response = await fetch("/api/newsletter/subscribers?status=all");
      const result = await response.json();
      if (result.success) {
        setSubscriberCount(result.data.total);
      }
    } catch (err) {
      console.error("Failed to fetch subscriber count:", err);
    }
  };

  // Subscriber mini-table — now rendered via React state instead of innerHTML
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setSubscribersLoading(true);
        setSubscribersError(false);
        const res = await fetch("/api/newsletter/subscribers?status=all&limit=5");
        const result = await res.json();
        if (!result.success) {
          setSubscribersError(true);
          setSubscribers([]);
          return;
        }
        setSubscribers(result.data.subscribers || []);
      } catch (err) {
        console.error("Failed to load subscribers:", err);
        setSubscribersError(true);
        setSubscribers([]);
      } finally {
        setSubscribersLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: postsPerPage.toString(),
      });

      if (filterCategory !== "All") {
        params.append("category", filterCategory);
      }

      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`/api/admin/posts?${params}`);
      const result = await response.json();

      if (result.success) {
        setPosts(result.data.posts);
        setTotalPages(result.data.totalPages);
      } else {
        setError(result.error || "Failed to fetch posts");
      }
    } catch (err) {
      setError("Failed to load posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        fetchPosts();
      } else {
        alert(result.error || "Failed to delete post");
      }
    } catch (err) {
      alert("Failed to delete post");
      console.error(err);
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          published: !currentStatus,
        }),
      });

      const result = await response.json();

      if (result.success) {
        fetchPosts();
      } else {
        alert(result.error || "Failed to update post");
      }
    } catch (err) {
      alert("Failed to update post");
      console.error(err);
    }
  };

  const handleNotify = async (post) => {
    if (!confirm(`Send notification to all subscribers about "${post.title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/notify-post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post._id }),
      });

      const result = await response.json();

      if (result.success) {
        alert(`Notifications sent! ${result.notified} delivered, ${result.failed} failed.`);
      } else {
        alert(result.error || "Failed to send notifications");
      }
    } catch (err) {
      alert("Failed to send notifications");
      console.error(err);
    }
  };

  if (!session) {
    return null;
  }

  const greetingName = session.user?.name || session.user?.email?.split("@")[0] || "";

  return (
    <div className="space-y-8">

      {/* Greeting */}
      <div>
        <h1 className="text-[28px] sm:text-[32px] leading-tight font-bold text-white tracking-tight">
          Welcome back{greetingName ? `, ${greetingName}` : ""}
        </h1>
        <p className="text-white/40 text-sm mt-1.5">Here's what's happening across your blog.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="System status"
          value="Online"
          icon={CheckCircle2}
          accent="bg-green-500/10 border-green-500/20 text-green-400"
          delay={0}
        />
        <StatsCard
          title="Subscribers"
          value={subscriberCount}
          icon={Users}
          accent="bg-blue-500/10 border-blue-500/20 text-blue-400"
          delay={0.05}
        />
        <StatsCard
          title="Drafts pending"
          value={posts.filter((p) => !p.published).length}
          icon={Clock}
          accent="bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
          delay={0.1}
        />
      </div>

      {/* Posts section header + actions */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Posts</h2>
            <p className="text-white/40 text-sm mt-1">Manage your blog posts.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/blog-order"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white/90 rounded-xl text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/40"
            >
              <ListOrdered className="w-4 h-4" />
              <span>Manage order</span>
            </Link>
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#b02222] hover:bg-[#c92e2e] text-white rounded-xl text-sm font-medium transition-colors shadow-[0_0_20px_rgba(176,34,34,0.3)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/50"
            >
              <Plus className="w-4 h-4" />
              <span>New post</span>
            </Link>
          </div>
        </div>

        {/* Filters / toolbar */}
        <div className="bg-[#121212] border border-white/5 rounded-2xl p-3 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <label htmlFor="post-search" className="sr-only">Search posts</label>
            <input
              id="post-search"
              type="text"
              placeholder="Search posts…"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-black/40 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-[#b02222]/50 focus:ring-2 focus:ring-[#b02222]/20 transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <Filter className="w-4 h-4 text-white/30 shrink-0" />
            <label htmlFor="category-filter" className="sr-only">Filter by category</label>
            <select
              id="category-filter"
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 md:flex-none bg-black/40 border border-white/5 rounded-xl py-2.5 px-3.5 text-white/80 focus:outline-none focus:border-[#b02222]/50 focus:ring-2 focus:ring-[#b02222]/20 text-sm cursor-pointer transition-all"
            >
              <option value="All">All categories</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
              <option value="Personal Life">Personal</option>
              <option value="Technology">Technology</option>
              <option value="Growth">Growth</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-sm flex items-center gap-2.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          {error}
        </div>
      )}

      {/* Posts table */}
      <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-xs font-medium tracking-wide text-white/40">Post</th>
                <th className="px-6 py-4 text-xs font-medium tracking-wide text-white/40">Category</th>
                <th className="px-6 py-4 text-xs font-medium tracking-wide text-white/40">Status</th>
                <th className="px-6 py-4 text-xs font-medium tracking-wide text-white/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <PostSkeletonRow key={i} />)
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                      <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-4">
                        <FileText className="w-7 h-7 text-white/20" />
                      </div>
                      <h3 className="text-white font-semibold mb-1">No posts found</h3>
                      <p className="text-white/40 text-sm max-w-xs">
                        {searchTerm || filterCategory !== "All"
                          ? "Try adjusting your search or filters."
                          : "Create your first post to get started."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                posts.map((post, index) => (
                  <motion.tr
                    key={post._id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut", delay: index * 0.03 }}
                    className="group border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-white font-medium group-hover:text-[#c92e2e] transition-colors">
                          {post.title}
                        </span>
                        <span className="text-white/30 text-xs font-mono mt-0.5 truncate max-w-[260px]">
                          /{post.slug}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-xs rounded-lg border border-white/10 bg-white/5 text-white/70">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border",
                          post.published
                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                            : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                        )}
                      >
                        <span className={cn("w-1.5 h-1.5 rounded-full", post.published ? "bg-green-500" : "bg-yellow-500")} />
                        <span className="text-xs font-medium">{post.published ? "Live" : "Draft"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleTogglePublish(post._id, post.published)}
                          title={post.published ? "Unpublish" : "Publish"}
                          aria-label={post.published ? "Unpublish post" : "Publish post"}
                          className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/40"
                        >
                          {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <Link
                          href={`/admin/posts/${post._id}`}
                          title="Edit"
                          aria-label="Edit post"
                          className="p-2 hover:bg-white/10 rounded-lg text-blue-400/80 hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleNotify(post)}
                          title="Notify subscribers"
                          aria-label="Notify subscribers"
                          className="p-2 hover:bg-[#b02222]/10 rounded-lg text-[#b02222]/80 hover:text-[#c92e2e] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/40"
                        >
                          <BellRing className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post._id, post.title)}
                          title="Delete"
                          aria-label="Delete post"
                          className="p-2 hover:bg-red-500/10 rounded-lg text-red-500/80 hover:text-red-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/40"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="px-4 text-sm font-mono text-white/50 tabular-nums">
            {currentPage} / {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/40"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {/* Subscribers section */}
      <div className="pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Subscribers</h2>
            <p className="text-white/40 text-sm mt-1">People who signed up via the newsletter popup.</p>
          </div>
          <Link
            href="/admin/subscribers"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white/90 rounded-xl text-sm font-medium transition-colors self-start sm:self-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/40"
          >
            View all
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-xs font-medium tracking-wide text-white/40">Email</th>
                  <th className="px-6 py-4 text-xs font-medium tracking-wide text-white/40">Name</th>
                  <th className="px-6 py-4 text-xs font-medium tracking-wide text-white/40">Status</th>
                  <th className="px-6 py-4 text-xs font-medium tracking-wide text-white/40">Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {subscribersLoading ? (
                  Array.from({ length: 3 }).map((_, i) => <SubscriberSkeletonRow key={i} />)
                ) : subscribersError ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-red-400/70 text-sm">
                      Failed to load subscribers.
                    </td>
                  </tr>
                ) : subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-white/30 text-sm">
                      No subscribers yet.
                    </td>
                  </tr>
                ) : (
                  subscribers.map((sub, index) => (
                    <tr
                      key={sub.email || index}
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-white/80 text-sm font-mono">{sub.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white/50 text-sm">{sub.name || "—"}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                            sub.status === "active"
                              ? "bg-green-500/10 border-green-500/20 text-green-400"
                              : "bg-red-500/10 border-red-500/20 text-red-400"
                          )}
                        >
                          <span className={cn("w-1.5 h-1.5 rounded-full", sub.status === "active" ? "bg-green-500" : "bg-red-500")} />
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white/40 text-xs font-mono">{formatDate(sub.subscribedAt)}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
