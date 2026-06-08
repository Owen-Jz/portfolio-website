"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Type,
  Link2,
  FileText,
  Image as ImageIcon,
  Tag,
  Calendar,
  Clock,
  User,
  Code2,
  Search,
  Send,
  BellRing,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import Button from "../ui/Button";

const CATEGORIES = ["Design", "Business", "Personal Life", "Technology", "Growth"];

// Small reusable section wrapper for consistent rhythm
function Section({ label, title, description, icon: Icon, children }) {
  return (
    <section className="bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-8">
      <div className="flex items-start gap-3 mb-6">
        {Icon && (
          <div className="mt-0.5 p-2 rounded-xl bg-white/5 border border-white/5 text-white/70">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <div>
          {label && (
            <span className="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#b02222]/80 mb-1">
              {label}
            </span>
          )}
          <h2 className="text-lg font-semibold text-white leading-tight">{title}</h2>
          {description && (
            <p className="text-sm text-white/40 mt-1">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

// Shared field label
function FieldLabel({ htmlFor, children, optional }) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2"
    >
      {children}
      {optional && (
        <span className="text-[10px] font-mono uppercase tracking-wider text-white/30">
          optional
        </span>
      )}
    </label>
  );
}

// Inline error message
function FieldError({ children }) {
  if (!children) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-400">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {children}
    </p>
  );
}

const inputBase =
  "w-full bg-black/40 border rounded-xl px-4 py-2.5 text-white placeholder-white/30 transition-colors focus:outline-none focus:border-[#b02222] focus:ring-2 focus:ring-[#b02222]/20";

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

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-28" noValidate>
      {/* Basic Information */}
      <Section
        label="Article"
        title="Basic information"
        description="The essentials — what the post is called and how it's found."
        icon={Type}
      >
        <div>
          <FieldLabel htmlFor="title">
            <Type className="w-3.5 h-3.5 text-white/40" />
            Title
          </FieldLabel>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            aria-invalid={!!errors.title}
            className={`${inputBase} ${
              errors.title ? "border-red-500/60" : "border-white/10"
            }`}
            placeholder="A clear, compelling headline"
          />
          <FieldError>{errors.title}</FieldError>
        </div>

        <div>
          <FieldLabel htmlFor="slug">
            <Link2 className="w-3.5 h-3.5 text-white/40" />
            Slug
          </FieldLabel>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-mono text-white/25">
              /blog/
            </span>
            <input
              id="slug"
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              aria-invalid={!!errors.slug}
              className={`${inputBase} pl-[3.75rem] font-mono text-sm ${
                errors.slug ? "border-red-500/60" : "border-white/10"
              }`}
              placeholder="post-url-slug"
            />
          </div>
          <FieldError>{errors.slug}</FieldError>
          {!errors.slug && (
            <p className="mt-1.5 text-xs text-white/30">
              URL-friendly version of the title — lowercase letters, numbers and hyphens only.
            </p>
          )}
        </div>

        <div>
          <FieldLabel htmlFor="excerpt">
            <FileText className="w-3.5 h-3.5 text-white/40" />
            Excerpt
          </FieldLabel>
          <textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            rows={3}
            aria-invalid={!!errors.excerpt}
            className={`${inputBase} resize-y leading-relaxed ${
              errors.excerpt ? "border-red-500/60" : "border-white/10"
            }`}
            placeholder="A short summary shown in listings and link previews."
          />
          <FieldError>{errors.excerpt}</FieldError>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <FieldLabel htmlFor="category">
              <Tag className="w-3.5 h-3.5 text-white/40" />
              Category
            </FieldLabel>
            <div className="relative">
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className={`${inputBase} border-white/10 appearance-none cursor-pointer pr-10`}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#1a1a1a]">
                    {c}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="image" optional>
              <ImageIcon className="w-3.5 h-3.5 text-white/40" />
              Featured image
            </FieldLabel>
            <input
              id="image"
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              aria-invalid={!!errors.image}
              className={`${inputBase} font-mono text-sm ${
                errors.image ? "border-red-500/60" : "border-white/10"
              }`}
              placeholder="/blog_images/image.png"
            />
            <FieldError>{errors.image}</FieldError>
            {!errors.image && (
              <p className="mt-1.5 text-xs text-white/30">
                A relative path (e.g. /blog_images/image.png) or a full URL.
              </p>
            )}
          </div>
        </div>

        {/* Image preview */}
        <AnimatePresence>
          {formData.image && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#1a1a1a] p-3">
                <div className="relative w-24 h-16 shrink-0 overflow-hidden rounded-lg bg-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.image}
                    alt="Featured preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.opacity = "0";
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white/70">Preview</p>
                  <p className="text-xs font-mono text-white/30 truncate max-w-[24rem]">
                    {formData.image}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <FieldLabel htmlFor="date">
              <Calendar className="w-3.5 h-3.5 text-white/40" />
              Date
            </FieldLabel>
            <input
              id="date"
              type="text"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className={`${inputBase} border-white/10`}
              placeholder="June 7, 2026"
            />
          </div>

          <div>
            <FieldLabel htmlFor="readTime">
              <Clock className="w-3.5 h-3.5 text-white/40" />
              Read time
            </FieldLabel>
            <input
              id="readTime"
              type="text"
              value={formData.readTime}
              onChange={(e) =>
                setFormData({ ...formData, readTime: e.target.value })
              }
              className={`${inputBase} border-white/10`}
              placeholder="5 min read"
            />
          </div>

          <div>
            <FieldLabel htmlFor="author">
              <User className="w-3.5 h-3.5 text-white/40" />
              Author
            </FieldLabel>
            <input
              id="author"
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className={`${inputBase} border-white/10`}
              placeholder="Owen Digitals"
            />
          </div>
        </div>
      </Section>

      {/* Content */}
      <Section
        label="Body"
        title="Content"
        description="The full article, written as HTML."
        icon={Code2}
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <FieldLabel htmlFor="content">
              <Code2 className="w-3.5 h-3.5 text-white/40" />
              Content (HTML)
            </FieldLabel>
            <span className="text-[11px] font-mono text-white/30">
              {formData.content.length.toLocaleString()} chars
            </span>
          </div>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            rows={18}
            spellCheck={false}
            aria-invalid={!!errors.content}
            className={`${inputBase} resize-y font-mono text-sm leading-relaxed ${
              errors.content ? "border-red-500/60" : "border-white/10"
            }`}
            placeholder="<p>Your HTML content here…</p>"
          />
          <FieldError>{errors.content}</FieldError>
        </div>
      </Section>

      {/* SEO */}
      <Section
        label="Discovery"
        title="SEO settings"
        description="How the post appears in search engines and shared links."
        icon={Search}
      >
        <div>
          <FieldLabel htmlFor="seoTitle" optional>
            SEO title
          </FieldLabel>
          <input
            id="seoTitle"
            type="text"
            value={formData.seoTitle}
            onChange={(e) =>
              setFormData({ ...formData, seoTitle: e.target.value })
            }
            className={`${inputBase} border-white/10`}
            placeholder="Defaults to the post title"
          />
          <p className="mt-1.5 text-xs text-white/30">
            {formData.seoTitle.length} / 60 recommended characters
          </p>
        </div>

        <div>
          <FieldLabel htmlFor="seoDescription" optional>
            SEO description
          </FieldLabel>
          <textarea
            id="seoDescription"
            value={formData.seoDescription}
            onChange={(e) =>
              setFormData({ ...formData, seoDescription: e.target.value })
            }
            rows={3}
            className={`${inputBase} border-white/10 resize-y leading-relaxed`}
            placeholder="A concise meta description for search engines."
          />
          <p className="mt-1.5 text-xs text-white/30">
            {formData.seoDescription.length} / 160 recommended characters
          </p>
        </div>
      </Section>

      {/* Publish Settings */}
      <Section
        label="Visibility"
        title="Publishing"
        description="Control whether this post is live and who hears about it."
        icon={Send}
      >
        <label
          htmlFor="published"
          className={`flex items-center justify-between gap-4 rounded-xl border p-4 cursor-pointer transition-colors ${
            formData.published
              ? "border-[#b02222]/40 bg-[#b02222]/5"
              : "border-white/10 bg-black/20 hover:border-white/20"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`flex h-2 w-2 rounded-full ${
                formData.published ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
            <div>
              <p className="text-sm font-medium text-white">
                {formData.published ? "Published" : "Draft"}
              </p>
              <p className="text-xs text-white/40">
                {formData.published
                  ? "This post is visible to everyone on the site."
                  : "Only you can see this post until you publish it."}
              </p>
            </div>
          </div>
          {/* Toggle */}
          <span className="relative inline-flex shrink-0">
            <input
              id="published"
              type="checkbox"
              checked={formData.published}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
              className="peer sr-only"
            />
            <span className="h-6 w-11 rounded-full bg-white/10 transition-colors peer-checked:bg-[#b02222] peer-focus-visible:ring-2 peer-focus-visible:ring-[#b02222]/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#121212]" />
            <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
          </span>
        </label>

        <AnimatePresence>
          {formData.published && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <label
                htmlFor="notifySubscribers"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4 cursor-pointer hover:border-white/20 transition-colors"
              >
                <input
                  id="notifySubscribers"
                  type="checkbox"
                  checked={formData.notifySubscribers}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notifySubscribers: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-white/20 bg-black/40 text-[#b02222] accent-[#b02222] focus:ring-2 focus:ring-[#b02222]/40"
                />
                <BellRing className="w-4 h-4 text-[#b02222]" />
                <div>
                  <p className="text-sm font-medium text-white">
                    Notify subscribers
                  </p>
                  <p className="text-xs text-white/40">
                    Send an email to your newsletter list when this post goes live.
                  </p>
                </div>
              </label>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/5 bg-[#0a0a0a]/85 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            {hasErrors ? (
              <span className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Please fix the highlighted fields.
              </span>
            ) : (
              <span className="hidden sm:flex items-center gap-2 text-sm text-white/40">
                <CheckCircle2 className="w-4 h-4 text-white/30 shrink-0" />
                {post ? "Editing existing post" : "Drafting a new post"}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
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
              className="shadow-[0_0_20px_rgba(176,34,34,0.3)] hover:shadow-[0_0_30px_rgba(176,34,34,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving…
                </span>
              ) : post ? (
                "Update post"
              ) : (
                "Create post"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
