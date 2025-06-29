'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

type Post = {
  _id?: string;
  slug: string;
  title: string;
  content?: string;
  createdAt?: string;
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(setPosts);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      
      {/* Hero Container */}
   <section className="relative h-[40vh] w-full bg-[#3b302b] flex items-center justify-center px-4">
  {/* Inner Hero Card */}
  <div className="bg-gradient-to-br from-[#f3e8e3] to-[#fef9f4] shadow-2xl rounded-xl px-8 py-10 max-w-2xl text-center z-10">
    <h1 className="text-5xl font-bold text-[#3b2f2f] tracking-tight">Blog Dashboard</h1>
    <p className="mt-4 text-[#5c4438] text-lg">
      Create, manage, and explore all your blog posts with a warm and elegant touch.
    </p>
    <Link href="/create">
      <button className="mt-6 bg-[#a16207] hover:bg-[#854d0e] transition text-white px-6 py-2.5 rounded-lg shadow">
        + New Post
      </button>
    </Link>
  </div>
</section>






{loading ? (
  <div className="flex justify-center items-center py-20">
    <Image
      src="/hourglass.gif"
      alt="Loading..."
      className="w-12 h-12 animate-pulse"
    />
  </div>
) : (
<>
      {/* Blog List Container */}
      <main className="bg-[#fefcf9] w-full py-12 px-6">
  <div className="max-w-5xl mx-auto">
  <motion.ul
  className="grid grid-cols-1 md:grid-cols-2 gap-6"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }}
>
  {posts.map((post) => (
    <motion.li
      key={post.slug}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.02, boxShadow: "0 6px 24px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
      className="bg-white border border-[#e6ddd3] rounded-3xl px-6 py-5 shadow-sm transition-all flex flex-col justify-between"
    >
      <div className="h-1 w-12 rounded-full bg-[#a16207] mb-4"></div>
      <h2 className="text-xl font-semibold text-[#3b2f2f] mb-2">{post.title}</h2>
      <div className="flex justify-between items-center mt-6 text-sm">
        <span className="text-[#7b5e4e]">
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : ""}
        </span>
        <div className="flex gap-4">
          <Link href={`/blog/${post.slug}`} className="text-[#a16207] hover:underline font-medium">
            View
          </Link>
          <Link href={`/edit/${post.slug}`} className="text-[#d97706] hover:underline font-medium">
            Edit
          </Link>
        </div>
      </div>
    </motion.li>
  ))}
</motion.ul>

</div>
</main>
</>

)}
</div>

  );
}
