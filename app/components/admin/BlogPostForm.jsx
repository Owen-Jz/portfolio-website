"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

export default function BlogPostForm({ post, onSuccess }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Design",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    readTime: "5 min read",
    image: "",
    author: "Owen Digitals",
    published: false,
    notifySubscribers: false,
    seoTitle: "",
    seoDescription: "",
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        slug: post.slug || "",
        excerpt: post.excerpt || "",
        content: post.content || "",
        category: post.category || "Design",
        date: post.date || new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        readTime: post.readTime || "5 min read",
        image: post.image || "",
        author: post.author || "Owen Digitals",
        published: post.published || false,
        notifySubscribers: false,
        seoTitle: post.seoTitle || "",
        seoDescription: post.seoDescription || "",
      });
    }
  }, [post]);

  // Auto-generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
      seoTitle: prev.seoTitle || title,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const url = post ? `/api/admin/posts/${post._id}` : "/api/admin/posts";
      const method = post ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Notify subscribers if checkbox is checked and post is being published
        if (formData.notifySubscribers && formData.published && result.data?._id) {
          fetch(`/api/admin/notify-post`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: result.data._id }),
          }).catch((err) => console.error("Failed to send notifications:", err));
        }

        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/admin");
        }
      } else {
        alert(result.error || "Failed to save post");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                className={`w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b02222] ${
                  errors.title ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="Enter post title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className={`w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b02222] ${
                  errors.slug ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="post-url-slug"
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-400">{errors.slug}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                URL-friendly version of the title (lowercase, hyphens only)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Excerpt *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                rows={3}
                className={`w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b02222] ${
                  errors.excerpt ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="Brief description of the post"
              />
              {errors.excerpt && (
                <p className="mt-1 text-sm text-red-400">{errors.excerpt}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b02222]"
                >
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Personal Life">Personal Life</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Featured Image Path
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className={`w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b02222] ${
                    errors.image ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="/blog_images/image.png or https://example.com/image.png"
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-400">{errors.image}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Use a relative path (e.g., /blog_images/image.png) or a full URL
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b02222]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Read Time
                </label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) =>
                    setFormData({ ...formData, readTime: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b02222]"
                  placeholder="5 min read"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b02222]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Content</h2>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content (HTML) *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={15}
              className={`w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b02222] font-mono text-sm ${
                errors.content ? "border-red-500" : "border-gray-700"
              }`}
              placeholder="<p>Your HTML content here...</p>"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-400">{errors.content}</p>
            )}
          </div>
        </div>

        {/* SEO */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                SEO Title
              </label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) =>
                  setFormData({ ...formData, seoTitle: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b02222]"
                placeholder="SEO optimized title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                SEO Description
              </label>
              <textarea
                value={formData.seoDescription}
                onChange={(e) =>
                  setFormData({ ...formData, seoDescription: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b02222]"
                placeholder="Meta description for search engines"
              />
            </div>
          </div>
        </div>

        {/* Publish Settings */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Publish Settings</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-5 h-5 rounded border-gray-700 bg-gray-800/50 text-[#b02222] focus:ring-2 focus:ring-[#b02222]"
              />
              <span className="text-gray-300">Publish this post</span>
            </label>

            {formData.published && (
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notifySubscribers}
                  onChange={(e) =>
                    setFormData({ ...formData, notifySubscribers: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-gray-700 bg-gray-800/50 text-[#b02222] focus:ring-2 focus:ring-[#b02222]"
                />
                <span className="text-gray-300">Notify subscribers of this post</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          onClick={() => router.push("/admin")}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}

