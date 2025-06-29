'use client';

import { useState } from 'react';
import MarkdownEditor from './MarkDownEditor';
import { useRouter } from 'next/navigation';

export default function PostForm({ onSubmit, initialData = {} }: any) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
async function onDelete(slug:string) {
      if(!window.confirm("Are you sure you want to delete this post?")) return;
      await fetch(`/api/posts/${slug}`,{method:"DELETE"});
      alert("Post deleted successfully");
   router.push ('/');
}
  return (
    <div className="space-y-4 max-w-2xl mx-auto p-4">
      <input
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <MarkdownEditor content={content} onChange={setContent} />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => onSubmit({ title, content })}
      >
        {initialData._id ? 'Update Post' : 'Create Post'}
      </button>
        {initialData._id &&(
<button
            type="button"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => onDelete && onDelete(initialData.slug)}
          >
            Delete
          </button>
        )}
    </div>
  );
}
