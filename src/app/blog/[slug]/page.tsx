'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { motion } from "framer-motion";
import Image from "next/image";

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

  if (error) return <div className="text-red-500 text-center py-12">{error}</div>;
  if (!post) return (
    <div className="flex justify-center items-center py-20">
      <Image src="/hourglass.gif" alt="Loading..." className="w-12 h-12 animate-pulse" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fefcf9]">
   <section className="relative h-[40vh] w-full bg-[#3b302b] flex items-center justify-center px-4">
  <motion.div
    className="bg-gradient-to-br from-[#f3e8e3] to-[#fef9f4] shadow-2xl rounded-xl px-8 py-10 max-w-2xl text-center z-10"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h1 className="text-4xl font-bold text-[#3b2f2f] tracking-tight">
      {post.title}
    </h1>

    {/* Created At */}
    {post.createdAt && (
      <p className="mt-2 text-sm text-[#7b5e4e]">
        Published on{" "}
        {new Date(post.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    )}

    {/* Optional Subtitle */}
    <p className="mt-4 text-[#5c4438] text-base">
      Written with passion, published for you.
    </p>
  </motion.div>
</section>



      {/* Blog Content */}
      <motion.div
        className=" custom-richtext max-w-4xl break-all  mx-auto py-12 px-6 prose prose-lg text-[#3b2f2f] prose-headings:text-[#3b2f2f] prose-a:text-[#a16207]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </motion.div>
    </div>
  );
}
