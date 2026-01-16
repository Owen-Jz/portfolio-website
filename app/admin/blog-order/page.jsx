"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import {
  GripVertical,
  Star,
  StarOff,
  Save,
  RefreshCw,
  Check,
  AlertCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogOrderPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [notification, setNotification] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/blog-order");
      const result = await response.json();

      if (result.success) {
        // Add order index if not present
        const orderedPosts = result.data.map((post, index) => ({
          ...post,
          order: post.order ?? index,
        }));
        setPosts(orderedPosts);
        setOriginalPosts(orderedPosts);
        setHasChanges(false);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      showNotification("Failed to load posts", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleReorder = (newOrder) => {
    // Update order values based on new positions
    const updatedPosts = newOrder.map((post, index) => ({
      ...post,
      order: index,
    }));
    setPosts(updatedPosts);
    setHasChanges(true);
  };

  const handleSetFeatured = async (postId) => {
    // Optimistically update UI
    const updatedPosts = posts.map((post) => ({
      ...post,
      isFeatured: post._id === postId,
    }));

    // Move featured post to top
    const featuredPost = updatedPosts.find((p) => p._id === postId);
    const otherPosts = updatedPosts.filter((p) => p._id !== postId);
    const reorderedPosts = [featuredPost, ...otherPosts].map((post, index) => ({
      ...post,
      order: index,
    }));

    setPosts(reorderedPosts);
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = posts.map((post) => ({
        _id: post._id,
        order: post.order,
        isFeatured: post.isFeatured || false,
      }));

      console.log("Saving payload:", payload);

      const response = await fetch("/api/admin/blog-order", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posts: payload }),
      });

      const result = await response.json();
      console.log("Save result:", result);

      if (result.success) {
        setOriginalPosts(posts);
        setHasChanges(false);
        showNotification(result.message || "Blog order saved successfully!");
      } else {
        showNotification(result.error || "Failed to save", "error");
      }
    } catch (error) {
      console.error("Failed to save:", error);
      showNotification("Failed to save changes: " + error.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setPosts(originalPosts);
    setHasChanges(false);
    showNotification("Changes discarded");
  };

  if (!session) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border ${
              notification.type === "error"
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : "bg-green-500/10 border-green-500/30 text-green-400"
            }`}
          >
            {notification.type === "error" ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <Check className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/admin"
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white/60" />
            </Link>
            <h1 className="text-2xl font-bold text-white">Blog Post Order</h1>
          </div>
          <p className="text-white/50 text-sm pl-10">
            Drag posts to reorder. Click the star to set as featured.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {hasChanges && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white/70 rounded-xl hover:bg-white/10 transition-colors text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#b02222] text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#c92e2e] shadow-[0_0_20px_rgba(176,34,34,0.3)]"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Saving..." : "Save Order"}
          </button>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-[#b02222] border-t-transparent rounded-full animate-spin" />
              <span className="text-white/40 text-xs font-mono">
                LOADING POSTS...
              </span>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-white/40">No blog posts found</p>
          </div>
        ) : (
          <Reorder.Group
            axis="y"
            values={posts}
            onReorder={handleReorder}
            className="divide-y divide-white/5"
          >
            {posts.map((post, index) => (
              <Reorder.Item
                key={post._id}
                value={post}
                className="relative"
              >
                <motion.div
                  layout
                  className={`flex items-center gap-4 p-4 cursor-grab active:cursor-grabbing transition-colors ${
                    post.isFeatured
                      ? "bg-[#b02222]/10 border-l-2 border-l-[#b02222]"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Drag Handle */}
                  <div className="flex items-center gap-3 text-white/30">
                    <GripVertical className="w-5 h-5" />
                    <span className="text-xs font-mono w-6 text-center">
                      {index + 1}
                    </span>
                  </div>

                  {/* Post Image */}
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Post Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium truncate">
                        {post.title}
                      </h3>
                      {post.isFeatured && (
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#b02222] text-white rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-white/40 text-sm truncate">
                      {post.category} • /{post.slug}
                    </p>
                  </div>

                  {/* Featured Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetFeatured(post._id);
                    }}
                    className={`p-2.5 rounded-xl transition-all ${
                      post.isFeatured
                        ? "bg-[#b02222] text-white shadow-[0_0_15px_rgba(176,34,34,0.4)]"
                        : "bg-white/5 text-white/40 hover:text-[#b02222] hover:bg-[#b02222]/10"
                    }`}
                    title={post.isFeatured ? "Featured Post" : "Set as Featured"}
                  >
                    {post.isFeatured ? (
                      <Star className="w-5 h-5 fill-current" />
                    ) : (
                      <StarOff className="w-5 h-5" />
                    )}
                  </button>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>

      {/* Help Text */}
      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
        <h4 className="text-white/70 font-medium text-sm mb-2">Instructions</h4>
        <ul className="text-white/40 text-sm space-y-1">
          <li>• <strong>Drag</strong> posts up or down to change their display order</li>
          <li>• <strong>Click the star</strong> to set a post as the featured post (shown larger on the blog page)</li>
          <li>• <strong>Save</strong> your changes when you're done</li>
          <li>• The featured post will automatically move to the top</li>
        </ul>
        <div className="mt-4 pt-4 border-t border-white/5">
          <a 
            href="/api/blog/debug" 
            target="_blank" 
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            Debug: View raw database values →
          </a>
        </div>
      </div>
    </div>
  );
}
