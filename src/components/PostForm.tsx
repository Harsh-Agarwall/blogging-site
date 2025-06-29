'use client';

import { useState } from 'react';
import MarkdownEditor from './MarkDownEditor';


type PostData = {
  _id?: string;
  slug?: string;
  title?: string;
  content?: string;
};

type PostFormProps = {
  onSubmit: (data: { title: string; content: string }) => void;
  onDelete?: (slug: string) => void;
  initialData?: PostData;
};

export default function PostForm({ onSubmit, onDelete, initialData = {} }: PostFormProps) {

  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');

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
      {initialData._id && initialData.slug && onDelete && (
        <button
          type="button"
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => onDelete(initialData.slug!)}
        >
          Delete
        </button>
      )}
    </div>
  );
}
