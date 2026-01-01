"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BlogPostForm from "../../../components/admin/BlogPostForm";

export default function NewPostPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white font-['Manrope'] mb-2">
          Create New Post
        </h1>
        <p className="text-gray-400">Add a new blog post to your site</p>
      </div>
      <BlogPostForm onSuccess={handleSuccess} />
    </div>
  );
}

