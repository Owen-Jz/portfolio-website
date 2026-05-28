# Blog Engagement (Views + Likes) & Newsletter CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add view counting, like functionality, and engagement stats to all blog surfaces, plus ensure a newsletter signup CTA is readily available below every blog post and on the blog listing page.

**Architecture:** MongoDB-backed counters on the BlogPost model (`views`, `likes` fields). Two new API endpoints handle incrementing views and toggling likes. A shared `BlogEngagement` React component renders stats across all blog cards and the post detail page. Likes use `localStorage` to track per-browser state (no user auth required). Views fire on every page load with lightweight `sessionStorage` dedup to prevent refresh-spam within the same tab.

**Tech Stack:** Next.js 15 App Router, MongoDB/Mongoose, React 19, Framer Motion, Lucide React icons, Tailwind CSS v4

**Note:** This project has no test framework (no Jest/Vitest in package.json). Verification steps use the dev server, browser checks, and API calls instead of unit tests.

---

## Dependency Graph

```
Task 1 (schema) ──→ Task 2 (view API)  ──┐
                ──→ Task 3 (like API)  ──┤
                ──→ Task 4 (list API)  ──┤
                                          ├──→ Task 6 (detail page integration)
Task 5 (engagement component) ───────────┤──→ Task 7 (listing page integration)
                                          └──→ Task 8 (landing page integration)

Task 9 (newsletter CTA on listing page) — fully independent
```

**Parallelizable groups:**
- After Task 1: Tasks 2, 3, 4 can run in parallel
- After Tasks 2-5: Tasks 6, 7, 8 can run in parallel
- Task 9 can run any time (independent)

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Modify | `app/models/BlogPost.js` | Add `views` and `likes` fields to schema |
| Create | `app/api/blog/[slug]/view/route.js` | POST endpoint — increment view count |
| Create | `app/api/blog/[slug]/like/route.js` | POST endpoint — like/unlike toggle |
| Modify | `app/api/blog/route.js` | Include views/likes in serialized list output |
| Create | `app/components/ui/BlogEngagement.jsx` | Reusable views + likes display component |
| Modify | `app/(pages)/blog/[slug]/page.jsx` | Record view on load, show engagement, enhance newsletter CTA |
| Modify | `app/(pages)/blog/page.jsx` | Show engagement on cards, add newsletter CTA section |
| Modify | `app/components/BlogSection.jsx` | Show engagement on landing page cards |

---

### Task 1: Add views and likes fields to BlogPost schema

**Files:**
- Modify: `app/models/BlogPost.js`

- [ ] **Step 1: Add views and likes fields to the schema**

Open `app/models/BlogPost.js`. Add these two fields inside the schema definition object, after the `seoDescription` field (line 63) and before the closing `}` of the schema fields:

```javascript
views: {
  type: Number,
  default: 0,
  min: 0,
},
likes: {
  type: Number,
  default: 0,
  min: 0,
},
```

The full schema fields object should now end with:

```javascript
    seoDescription: {
      type: String,
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
```

- [ ] **Step 2: Verify the model loads without errors**

Run the dev server:
```bash
npm run dev
```

Visit `http://localhost:3000/api/blog` in a browser. Confirm the response still returns `{ success: true, data: [...] }`. Existing posts will show `views: 0, likes: 0` (or the fields will be absent until we update the list API serialization in Task 4).

- [ ] **Step 3: Commit**

```bash
git add app/models/BlogPost.js
git commit -m "feat: add views and likes fields to BlogPost schema"
```

---

### Task 2: Create view tracking API endpoint

**Files:**
- Create: `app/api/blog/[slug]/view/route.js`

**Depends on:** Task 1

- [ ] **Step 1: Create the view API route**

Create file `app/api/blog/[slug]/view/route.js` with this content:

```javascript
import { NextResponse } from "next/server";
import connectDB from "../../../../libs/db";
import BlogPost from "../../../../models/BlogPost";

export async function POST(request, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    const post = await BlogPost.findOneAndUpdate(
      { slug, published: true },
      { $inc: { views: 1 } },
      { new: true, select: "views" }
    );

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, views: post.views },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error recording view:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record view" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Verify the endpoint works**

With the dev server running, open a terminal and test:

```bash
curl -X POST http://localhost:3000/api/blog/YOUR_SLUG_HERE/view
```

Replace `YOUR_SLUG_HERE` with an actual blog post slug from the database. Expected response:
```json
{ "success": true, "views": 1 }
```

Run it again — views should increment to 2.

- [ ] **Step 3: Commit**

```bash
git add app/api/blog/[slug]/view/route.js
git commit -m "feat: add POST /api/blog/[slug]/view endpoint for view tracking"
```

---

### Task 3: Create like/unlike API endpoint

**Files:**
- Create: `app/api/blog/[slug]/like/route.js`

**Depends on:** Task 1

- [ ] **Step 1: Create the like API route**

Create file `app/api/blog/[slug]/like/route.js` with this content:

```javascript
import { NextResponse } from "next/server";
import connectDB from "../../../../libs/db";
import BlogPost from "../../../../models/BlogPost";

export async function POST(request, { params }) {
  try {
    await connectDB();

    const { slug } = await params;
    const body = await request.json();
    const action = body.action;

    if (action !== "like" && action !== "unlike") {
      return NextResponse.json(
        { success: false, error: "Invalid action. Use 'like' or 'unlike'." },
        { status: 400 }
      );
    }

    const increment = action === "like" ? 1 : -1;

    const post = await BlogPost.findOneAndUpdate(
      {
        slug,
        published: true,
        ...(action === "unlike" ? { likes: { $gt: 0 } } : {}),
      },
      { $inc: { likes: increment } },
      { new: true, select: "likes" }
    );

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found or cannot unlike" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, likes: post.likes },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { success: false, error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Verify the endpoint works**

Test liking:
```bash
curl -X POST http://localhost:3000/api/blog/YOUR_SLUG_HERE/like -H "Content-Type: application/json" -d '{"action":"like"}'
```

Expected: `{ "success": true, "likes": 1 }`

Test unliking:
```bash
curl -X POST http://localhost:3000/api/blog/YOUR_SLUG_HERE/like -H "Content-Type: application/json" -d '{"action":"unlike"}'
```

Expected: `{ "success": true, "likes": 0 }`

Test invalid action:
```bash
curl -X POST http://localhost:3000/api/blog/YOUR_SLUG_HERE/like -H "Content-Type: application/json" -d '{"action":"invalid"}'
```

Expected: 400 with error message.

- [ ] **Step 3: Commit**

```bash
git add app/api/blog/[slug]/like/route.js
git commit -m "feat: add POST /api/blog/[slug]/like endpoint for like/unlike"
```

---

### Task 4: Update blog list API to include engagement data

**Files:**
- Modify: `app/api/blog/route.js:30-37`

**Depends on:** Task 1

- [ ] **Step 1: Add views and likes to the serialized output**

In `app/api/blog/route.js`, find the `serializedPosts` mapping (around line 32). Update it to include `views` and `likes` with fallback defaults for existing posts that don't have these fields yet:

Replace the existing `serializedPosts` block:

```javascript
    const serializedPosts = posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      isFeatured: post.isFeatured || false,
      order: post.order ?? 999,
    }));
```

With:

```javascript
    const serializedPosts = posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      isFeatured: post.isFeatured || false,
      order: post.order ?? 999,
      views: post.views ?? 0,
      likes: post.likes ?? 0,
    }));
```

- [ ] **Step 2: Verify the list API includes engagement data**

Visit `http://localhost:3000/api/blog` in a browser. Each post object in the `data` array should now include `"views": 0` and `"likes": 0` (or whatever the current counts are if you tested the view/like endpoints earlier).

- [ ] **Step 3: Commit**

```bash
git add app/api/blog/route.js
git commit -m "feat: include views and likes in blog list API response"
```

---

### Task 5: Create BlogEngagement UI component

**Files:**
- Create: `app/components/ui/BlogEngagement.jsx`

**No dependencies** (can run in parallel with Tasks 2-4)

- [ ] **Step 1: Create the BlogEngagement component**

Create file `app/components/ui/BlogEngagement.jsx` with this content:

```jsx
"use client";

import React from "react";
import { Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";

const formatCount = (count) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

const BlogEngagement = ({
  views = 0,
  likes = 0,
  isLiked = false,
  onLike,
  variant = "compact",
}) => {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3 text-xs text-white/40">
        <span className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          {formatCount(views)}
        </span>
        <span className="flex items-center gap-1">
          <Heart
            className={`w-3.5 h-3.5 ${isLiked ? "fill-[#b02222] text-[#b02222]" : ""}`}
          />
          {formatCount(likes)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-sm text-white/50">
        <Eye className="w-4 h-4" />
        <span>{formatCount(views)} views</span>
      </div>
      <motion.button
        onClick={onLike}
        whileTap={{ scale: 0.9 }}
        className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border transition-all ${
          isLiked
            ? "bg-[#b02222]/20 border-[#b02222]/40 text-[#b02222]"
            : "bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
        }`}
      >
        <motion.div
          animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Heart
            className={`w-4 h-4 ${isLiked ? "fill-[#b02222] text-[#b02222]" : ""}`}
          />
        </motion.div>
        <span>{formatCount(likes)}</span>
      </motion.button>
    </div>
  );
};

export default BlogEngagement;
```

This component has two variants:
- `"compact"` — small, read-only, used on blog cards (no click handler needed)
- `"full"` (default for non-compact) — larger, with a clickable animated like button, used on the blog post detail page

- [ ] **Step 2: Verify the component renders without errors**

You can quickly test by temporarily importing it in any page. But full verification happens in Tasks 6-8 when it's integrated into real pages.

- [ ] **Step 3: Commit**

```bash
git add app/components/ui/BlogEngagement.jsx
git commit -m "feat: create BlogEngagement component for views and likes display"
```

---

### Task 6: Integrate engagement into blog post detail page

**Files:**
- Modify: `app/(pages)/blog/[slug]/page.jsx`

**Depends on:** Tasks 2, 3, 5

This is the most involved task. We need to:
1. Record a view when the page loads
2. Show view count + like button in the hero meta area
3. Show a full engagement bar between the article content and the back button
4. Track liked state in localStorage

- [ ] **Step 1: Add engagement imports and state**

In `app/(pages)/blog/[slug]/page.jsx`, add `BlogEngagement` to the imports at the top of the file. Add it after the existing `cn` import (line 13):

```javascript
import BlogEngagement from "../../../components/ui/BlogEngagement";
```

Inside the `BlogPostPage` component, add these state variables after the existing `inlineMessage` state (after line 23):

```javascript
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
```

- [ ] **Step 2: Add view recording effect and like handler**

Add this `useEffect` after the existing `fetchPost` useEffect (after line 56). This records a view once per session per post and initializes the like state from localStorage:

```javascript
  useEffect(() => {
    if (!post) return;

    setViews(post.views ?? 0);
    setLikes(post.likes ?? 0);

    const likedPosts = JSON.parse(localStorage.getItem("owen_blog_likes") || "[]");
    setIsLiked(likedPosts.includes(post.slug));

    const viewKey = `owen_blog_viewed_${post.slug}`;
    if (!sessionStorage.getItem(viewKey)) {
      sessionStorage.setItem(viewKey, "true");
      fetch(`/api/blog/${post.slug}/view`, { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setViews(data.views);
        })
        .catch(() => {});
    }
  }, [post]);

  const handleLike = async () => {
    const likedPosts = JSON.parse(localStorage.getItem("owen_blog_likes") || "[]");
    const alreadyLiked = likedPosts.includes(post.slug);
    const action = alreadyLiked ? "unlike" : "like";

    setIsLiked(!alreadyLiked);
    setLikes((prev) => prev + (alreadyLiked ? -1 : 1));

    if (alreadyLiked) {
      localStorage.setItem(
        "owen_blog_likes",
        JSON.stringify(likedPosts.filter((s) => s !== post.slug))
      );
    } else {
      localStorage.setItem(
        "owen_blog_likes",
        JSON.stringify([...likedPosts, post.slug])
      );
    }

    try {
      const res = await fetch(`/api/blog/${post.slug}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.success) setLikes(data.likes);
    } catch {}
  };
```

- [ ] **Step 3: Add engagement stats to the hero meta area**

In the JSX, find the hero meta `<motion.div>` that shows date, readTime, and author (around line 232-243). Add engagement stats after the author span. Replace the entire meta div:

Find this block:

```jsx
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300"
              >
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>By {post.author}</span>
              </motion.div>
```

Replace with:

```jsx
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300"
              >
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>By {post.author}</span>
                <span>•</span>
                <BlogEngagement
                  views={views}
                  likes={likes}
                  isLiked={isLiked}
                  variant="compact"
                />
              </motion.div>
```

- [ ] **Step 4: Add full engagement bar between content and back button**

Find the `{/* Back to Blog Link */}` section (around line 261). Insert a full engagement bar BEFORE it. Add this block right after the closing `</motion.div>` of the `blog-content` div (after line 258) and before the `{/* Back to Blog Link */}` comment:

```jsx
            {/* Engagement Bar */}
            <motion.div
              className="mt-10 py-6 border-t border-b border-gray-600/50 flex flex-wrap items-center justify-between gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <BlogEngagement
                views={views}
                likes={likes}
                isLiked={isLiked}
                onLike={handleLike}
                variant="full"
              />
            </motion.div>
```

- [ ] **Step 5: Verify in browser**

1. Navigate to any blog post (e.g., `http://localhost:3000/blog/your-slug`)
2. Confirm the hero area shows view count and like count alongside date/readTime/author
3. Confirm the engagement bar appears between the article content and the "Back to Blog" button
4. Click the like heart button — it should turn red and increment the count
5. Click again — it should toggle off and decrement
6. Refresh the page — the like state should persist (from localStorage) and view count should not increment again in the same tab (sessionStorage dedup)
7. Open the same post in a new tab — view count should increment by 1

- [ ] **Step 6: Commit**

```bash
git add app/(pages)/blog/[slug]/page.jsx
git commit -m "feat: add view tracking and like button to blog post detail page"
```

---

### Task 7: Integrate engagement stats into blog listing page cards

**Files:**
- Modify: `app/(pages)/blog/page.jsx`

**Depends on:** Tasks 4, 5

- [ ] **Step 1: Add imports**

In `app/(pages)/blog/page.jsx`, add these imports at the top of the file, after the existing lucide-react imports (after line 18):

```javascript
import BlogEngagement from "../../components/ui/BlogEngagement";
```

- [ ] **Step 2: Add engagement stats to FeaturedHero component**

In the `FeaturedHero` component, find the meta area that shows the date, readTime, and "Read Article" button (around line 89-107). Add engagement stats between the readTime div and the "Read Article" button.

Find this block inside `FeaturedHero`:

```jsx
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                  <Clock className="w-4 h-4 text-white" />
                </span>
                <span>{post.readTime}</span>
              </div>

              <div className="ml-auto md:ml-0 flex items-center gap-2 text-white group/btn bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-[#b02222] hover:border-[#b02222] transition-all">
```

Replace with:

```jsx
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                  <Clock className="w-4 h-4 text-white" />
                </span>
                <span>{post.readTime}</span>
              </div>

              <BlogEngagement views={post.views ?? 0} likes={post.likes ?? 0} variant="compact" />

              <div className="ml-auto md:ml-0 flex items-center gap-2 text-white group/btn bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-[#b02222] hover:border-[#b02222] transition-all">
```

- [ ] **Step 3: Add engagement stats to ModernBlogCard component**

In the `ModernBlogCard` component, find the footer area with the date and "Read" link (around line 155-163). Add engagement stats between them.

Find this block inside `ModernBlogCard`:

```jsx
          <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="group-hover:text-white transition-colors flex items-center gap-1">
              Read <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
```

Replace with:

```jsx
          <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <BlogEngagement views={post.views ?? 0} likes={post.likes ?? 0} variant="compact" />
            <span className="group-hover:text-white transition-colors flex items-center gap-1">
              Read <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
```

- [ ] **Step 4: Verify in browser**

1. Navigate to `http://localhost:3000/blog`
2. Confirm the featured hero post shows view and like counts in the meta area
3. Confirm each blog card in the grid shows compact view/like counts in the footer between the date and "Read" link
4. Counts should match what's in the database

- [ ] **Step 5: Commit**

```bash
git add app/(pages)/blog/page.jsx
git commit -m "feat: show engagement stats on blog listing page cards"
```

---

### Task 8: Integrate engagement stats into landing page blog cards

**Files:**
- Modify: `app/components/BlogSection.jsx`

**Depends on:** Tasks 4, 5

- [ ] **Step 1: Add import**

In `app/components/BlogSection.jsx`, add the BlogEngagement import after the existing lucide-react imports (after line 7):

```javascript
import BlogEngagement from "./ui/BlogEngagement";
```

- [ ] **Step 2: Add engagement stats to FeaturedPostHero**

In the `FeaturedPostHero` component, find the meta area that shows category, date, and readTime (around line 54-64). Add engagement stats after the readTime div.

Find this block:

```jsx
              <div className="flex items-center gap-4 text-xs font-mono text-white/50 mb-6">
                <span className="px-2 py-1 rounded bg-white/5 text-white/70 uppercase tracking-wider">{post.category}</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
```

Replace with:

```jsx
              <div className="flex items-center gap-4 text-xs font-mono text-white/50 mb-6">
                <span className="px-2 py-1 rounded bg-white/5 text-white/70 uppercase tracking-wider">{post.category}</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
                <BlogEngagement views={post.views ?? 0} likes={post.likes ?? 0} variant="compact" />
              </div>
```

- [ ] **Step 3: Add engagement stats to BlogCard**

In the `BlogCard` component, find the meta area with date and readTime (around line 114-117). Add engagement stats after the readTime span.

Find this block:

```jsx
              <div className="flex items-center gap-3 text-xs font-mono text-white/40 mb-3">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
```

Replace with:

```jsx
              <div className="flex items-center gap-3 text-xs font-mono text-white/40 mb-3">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <BlogEngagement views={post.views ?? 0} likes={post.likes ?? 0} variant="compact" />
              </div>
```

- [ ] **Step 4: Verify in browser**

1. Navigate to `http://localhost:3000` (homepage)
2. Scroll to the "Latest from the Blog" section
3. Confirm the featured post hero shows view/like counts in the meta bar
4. Confirm the two grid blog cards show compact view/like counts next to the readTime
5. Counts should match the actual database values

- [ ] **Step 5: Commit**

```bash
git add app/components/BlogSection.jsx
git commit -m "feat: show engagement stats on landing page blog cards"
```

---

### Task 9: Add newsletter CTA section to blog listing page

**Files:**
- Modify: `app/(pages)/blog/page.jsx`

**No dependencies** (fully independent — can run in parallel with any other task)

The individual blog post detail page already has a newsletter CTA at the bottom (`[slug]/page.jsx:327-356`). This task adds a similar CTA section to the blog listing page so users browsing articles can subscribe without opening a specific post.

- [ ] **Step 1: Add newsletter state and handler to BlogPage**

In `app/(pages)/blog/page.jsx`, inside the `BlogPage` component, add these state variables after the existing `loading` state (after line 178):

```javascript
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaSubmitting, setCtaSubmitting] = useState(false);
  const [ctaMessage, setCtaMessage] = useState(null);

  const handleCtaSubscribe = async (e) => {
    e.preventDefault();
    setCtaSubmitting(true);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: ctaEmail }),
      });
      const result = await res.json();
      setCtaMessage({
        success: result.success,
        text: result.success
          ? "You're in! You'll get notified when new posts drop."
          : result.error || "Failed to subscribe",
      });
      if (result.success) setCtaEmail("");
    } catch {
      setCtaMessage({ success: false, text: "Failed to subscribe" });
    } finally {
      setCtaSubmitting(false);
    }
  };
```

- [ ] **Step 2: Add the newsletter CTA section to the page**

Find the closing `</main>` tag (around line 380). Insert the newsletter CTA section right before `</main>`:

```jsx
          {/* Newsletter CTA */}
          {!loading && blogPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-20 mb-8 max-w-2xl mx-auto"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-8 md:p-10 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#b02222]/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b02222]/10 border border-[#b02222]/20 text-[#b02222] text-xs font-bold uppercase tracking-widest mb-4">
                    <Sparkles className="w-3 h-3" />
                    Newsletter
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Never miss a post
                  </h3>
                  <p className="text-white/50 text-sm md:text-base mb-6 max-w-md mx-auto">
                    Get notified whenever I publish new insights on design, business, and creative living.
                  </p>
                  <form onSubmit={handleCtaSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      value={ctaEmail}
                      onChange={(e) => setCtaEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#b02222]/50 transition-all text-sm"
                    />
                    <button
                      type="submit"
                      disabled={ctaSubmitting}
                      className="px-6 py-3 bg-[#b02222] text-white rounded-xl font-bold text-sm transition-all hover:bg-[#901a1a] disabled:opacity-50 shadow-lg shadow-[#b02222]/20"
                    >
                      {ctaSubmitting ? "..." : "Subscribe"}
                    </button>
                  </form>
                  {ctaMessage && (
                    <p className={`mt-4 text-sm ${ctaMessage.success ? "text-green-400" : "text-red-400"}`}>
                      {ctaMessage.text}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
```

This should go inside the `<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">` container, right before its closing `</div>`, and before `</main>`.

- [ ] **Step 3: Verify in browser**

1. Navigate to `http://localhost:3000/blog`
2. Scroll to the bottom of the page (below all blog cards)
3. Confirm a newsletter CTA card appears with "Never miss a post" heading
4. Enter an email and submit — should show success message
5. Enter an already-subscribed email — should show error message
6. Confirm the CTA does NOT appear when there are no blog posts (empty state)

- [ ] **Step 4: Commit**

```bash
git add app/(pages)/blog/page.jsx
git commit -m "feat: add newsletter subscription CTA to blog listing page"
```

---

## Final Verification Checklist

After all tasks are complete, verify the full integration end-to-end:

- [ ] **Blog post detail page** (`/blog/[slug]`):
  - Views increment on first visit (check via API or MongoDB)
  - Views do NOT increment on refresh in same tab
  - Like button toggles red/outline on click
  - Like count updates immediately (optimistic)
  - Like state persists across page refreshes (localStorage)
  - Compact engagement stats visible in hero meta area
  - Full engagement bar visible between content and back button
  - Newsletter CTA visible at the bottom (already existed — still works)

- [ ] **Blog listing page** (`/blog`):
  - Featured hero shows compact view/like counts
  - Each grid card shows compact view/like counts
  - Newsletter CTA section appears below the grid
  - Newsletter subscribe form works (success + error states)

- [ ] **Landing page** (`/`):
  - Featured post hero in BlogSection shows compact view/like counts
  - Grid blog cards show compact view/like counts

- [ ] **Data consistency**:
  - View counts on cards match what the detail page shows
  - Like counts update after liking from the detail page and returning to the listing
