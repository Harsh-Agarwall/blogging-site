'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';




type Post = {
  _id: string;
  title: string;
  content: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function BlogPost() {
  const params = useParams() as { slug?: string };
  const slug = params.slug ?? "";
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("No post slug provided.");
      return;
    }
    setError(null);
    setPost(null);
    fetch(`/api/posts/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then(setPost)
      .catch(() => setError("Post not found"));
  }, [slug]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
     <div className="custom-richtext ">
       <ReactMarkdown>{post.content}</ReactMarkdown>
     </div>
    </div>
  );
}
