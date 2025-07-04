'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PostForm from "@/components/PostForm";
import Image from "next/image";

type Post = {
  _id: string;
  title: string;
  content: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function EditPage() {
  const { slug } = useParams() as { slug?: string };
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    fetch(`/api/posts/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then(setPost)
      .catch(() => setError("Post not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleSubmit({ title, content }: { title: string; content: string }) {
    setError(null);
    const res = await fetch(`/api/posts/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (!res.ok) {
      setError("Failed to update post.");
      return;
    }
    const data = await res.json();
    router.push(`/blog/${data.slug}`);
  }

  async function handleDelete(slugToDelete: string) {
    setError(null);
    const res = await fetch(`/api/posts/${slugToDelete}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      setError("Failed to delete post.");
      return;
    }
    router.push("/");
  }

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <Image src="/hourglass.gif" alt="Loading..." className="w-12 h-12 animate-pulse" />
    </div>
  );
  if (error) return <div className="text-red-500">{error}</div>;
  if (!post) return null;

  return (
    <PostForm
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      initialData={post}
    />
  );
}
