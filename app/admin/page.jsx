"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Search,
    Filter,
    Plus,
    MoreHorizontal,
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
    Bell,
    BellRing,
    Users
} from "lucide-react";

const StatsCard = ({ title, value, icon: Icon, color }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#121212] border border-white/5 p-6 rounded-2xl relative overflow-hidden group"
    >
        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 blur-xl group-hover:opacity-20 transition-opacity ${color}`} />
        <div className="flex justify-between items-start relative z-10">
            <div>
                <p className="text-white/40 text-sm font-mono uppercase tracking-wider mb-2">{title}</p>
                <h3 className="text-3xl font-bold text-white">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl bg-white/5 border border-white/5`}>
                <Icon className="w-6 h-6 text-white/80" />
            </div>
        </div>
    </motion.div>
);

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

  useEffect(() => {
    const tableBody = document.getElementById("subscriber-table-body");
    if (!tableBody) return;

    const fetchSubscribers = async () => {
      try {
        const res = await fetch("/api/newsletter/subscribers?status=all&limit=5");
        const result = await res.json();
        if (!result.success || result.data.subscribers.length === 0) {
          tableBody.innerHTML = `<tr><td colSpan="4" class="px-6 py-8 text-center text-white/30 text-sm">No subscribers yet</td></tr>`;
          return;
        }

        tableBody.innerHTML = result.data.subscribers.map((sub) => `
          <tr class="hover:bg-white/[0.02] transition-colors">
            <td class="px-6 py-4">
              <span class="text-white/80 text-sm font-mono">${sub.email}</span>
            </td>
            <td class="px-6 py-4">
              <span class="text-white/50 text-sm">${sub.name || "—"}</span>
            </td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                sub.status === "active"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }">
                <div class="w-1.5 h-1.5 rounded-full ${sub.status === "active" ? "bg-green-500" : "bg-red-500"}" />
                ${sub.status}
              </span>
            </td>
            <td class="px-6 py-4">
              <span class="text-white/40 text-xs">${sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}</span>
            </td>
          </tr>
        `).join("");
      } catch (err) {
        tableBody.innerHTML = `<tr><td colSpan="4" class="px-6 py-8 text-center text-red-400/50 text-sm">Failed to load</td></tr>`;
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

  // Calculate quick stats (this would ideally come from backend but for now derived from current view or just static for demo)
  // In a real app I would fetch these stats. For now I'll just show counts of current page which is inaccurate but visual.
  // Ideally, I should fetch stats separately.
  
  return (
    <div className="space-y-8">
      
      {/* Top Header & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {/* We can't easily get total counts without backend route update, so I will omit exact numbers for now or use placeholders */}
           <StatsCard 
              title="System Status" 
              value="Online" 
              icon={CheckCircle2} 
              color="bg-green-500"
           />
           <StatsCard
              title="Newsletter Subscribers"
              value={subscriberCount}
              icon={Users}
              color="bg-purple-500"
           />
           <StatsCard 
              title="Drafts Pending" 
              value={posts.filter(p => !p.published).length} 
              icon={Clock} 
              color="bg-yellow-500"
           />
      </div>

      <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
              <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Content Database</h2>
                  <p className="text-white/40 text-sm">Manage and monitor all published entities.</p>
              </div>
              <div className="flex items-center gap-3">
                <Link 
                  href="/admin/blog-order"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-medium transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="21" y1="10" x2="3" y2="10"></line>
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="14" x2="3" y2="14"></line>
                    <line x1="21" y1="18" x2="3" y2="18"></line>
                  </svg>
                  <span>Manage Order</span>
                </Link>
                <Link 
                  href="/admin/posts/new"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#b02222] hover:bg-[#c92e2e] text-white rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(176,34,34,0.3)] hover:shadow-[0_0_30px_rgba(176,34,34,0.5)] active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Entry</span>
                </Link>
              </div>
          </div>

          {/* Control Panel (Filters) */}
          <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Search query..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-black/40 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-[#b02222]/50 transition-all text-sm"
                  />
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                  <Filter className="w-4 h-4 text-white/30" />
                  <select
                    value={filterCategory}
                    onChange={(e) => {
                      setFilterCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="bg-black/40 border border-white/5 rounded-xl py-2.5 px-4 text-white/80 focus:outline-none focus:border-[#b02222]/50 text-sm cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Personal Life">Personal</option>
                  </select>
              </div>
          </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-red-500" />
           {error}
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden relative min-h-[400px]">
        {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-[#b02222] border-t-transparent rounded-full animate-spin" />
                    <span className="text-white/40 text-xs font-mono">LOADING DATA...</span>
                </div>
            </div>
        ) : null}

        {!loading && posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-white/20" />
             </div>
             <h3 className="text-white font-medium mb-1">No Entries Found</h3>
             <p className="text-white/40 text-sm">Try adjusting your filters or create a new post.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-wider text-white/40 font-medium">Article Details</th>
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-wider text-white/40 font-medium">Category</th>
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-wider text-white/40 font-medium">Deployment</th>
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-wider text-white/40 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {posts.map((post) => (
                  <motion.tr
                    key={post._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="group hover:bg-[#b02222]/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                         <span className="text-white font-medium group-hover:text-[#b02222] transition-colors">{post.title}</span>
                         <span className="text-white/30 text-xs mt-0.5 truncate max-w-[200px]">{post.slug}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-xs rounded-lg border border-white/10 bg-white/5 text-white/70">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                         <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${
                            post.published 
                            ? "bg-green-500/10 border-green-500/20 text-green-400" 
                            : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500"
                         }`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${post.published ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                             <span className="text-xs font-medium">{post.published ? "Live" : "Draft"}</span>
                         </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => handleTogglePublish(post._id, post.published)}
                            title={post.published ? "Unpublish" : "Publish"}
                            className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
                        >
                            {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <Link
                            href={`/admin/posts/${post._id}`}
                            title="Edit"
                            className="p-2 hover:bg-white/10 rounded-lg text-blue-400/80 hover:text-blue-400 transition-colors"
                        >
                            <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                            onClick={() => handleNotify(post)}
                            title="Notify subscribers"
                            className="p-2 hover:bg-[#b02222]/10 rounded-lg text-[#b02222]/70 hover:text-[#b02222] transition-colors"
                        >
                            <BellRing className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleDelete(post._id, post.title)}
                            title="Delete"
                            className="p-2 hover:bg-red-500/10 rounded-lg text-red-500/80 hover:text-red-500 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Subscribers Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Newsletter Subscribers</h2>
            <p className="text-white/40 text-sm mt-1">People who signed up via the newsletter popup</p>
          </div>
          <Link
            href="/admin/subscribers"
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all"
          >
            View All
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-wider text-white/40 font-medium">Email</th>
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-wider text-white/40 font-medium">Name</th>
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-wider text-white/40 font-medium">Status</th>
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-wider text-white/40 font-medium">Subscribed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5" id="subscriber-table-body">
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-white/30 text-sm">Loading subscribers...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
