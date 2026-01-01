"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import BlogPostForm from "../../../components/admin/BlogPostForm";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/posts/${params.id}`);
        const result = await response.json();

        if (result.success) {
          setPost(result.data);
        } else {
          alert("Post not found");
          router.push("/admin");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load post");
        router.push("/admin");
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
      <div className="text-center py-12 text-gray-400">Loading post...</div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white font-['Manrope'] mb-2">
          Edit Post
        </h1>
        <p className="text-gray-400">Update your blog post</p>
      </div>
      <BlogPostForm post={post} onSuccess={handleSuccess} />
    </div>
  );
}

