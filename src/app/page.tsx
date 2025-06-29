'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(setPosts);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-5xl font-bold tracking-tight">All Posts</h1>
        <Link href="/create">
          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded shadow">
            + New Post
          </button>
        </Link>
      </div>
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 py-16">No posts yet. Click "New Post" to create your first blog post!</div>
      ) : (
        <ul className="space-y-6">
          {posts.map((post: any) => (
            <li key={post.slug} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <span className="text-xs text-gray-400">
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ""}
                </span>
              </div>
              <div className="flex gap-4 mt-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  View
                </Link>
                <Link
                  href={`/edit/${post.slug}`}
                  className="text-yellow-600 hover:underline font-medium"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
