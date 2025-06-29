'use client';

import PostForm from "@/components/PostForm";
import { useRouter } from "next/navigation";

type PostInput = {
  title: string;
  content: string;
};

export default function CreatePage() {
  const router = useRouter();

  async function handleSubmit({ title, content }: PostInput) {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    router.push(`/blog/${data.slug}`);
  }

  return <PostForm onSubmit={handleSubmit} />;
}
