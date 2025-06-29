'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <motion.div
      className="space-y-6 max-w-2xl mx-auto p-6 bg-[#fefcf9] border border-[#eaded4] rounded-3xl shadow-lg mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.input
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-3 border border-[#e0d4c4] rounded-xl text-[#3b2f2f] bg-white focus:outline-none focus:ring-2 focus:ring-[#a16207]"
        whileFocus={{ scale: 1.02 }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <MarkdownEditor content={content} onChange={setContent} />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="px-6 py-3 bg-[#a16207] text-white font-semibold rounded-xl hover:bg-[#854d0e] transition"
        onClick={() => onSubmit({ title, content })}
      >
        {initialData._id ? 'Update Post' : 'Create Post'}
      </motion.button>

      {initialData._id && initialData.slug && onDelete && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
          onClick={() => onDelete(initialData.slug!)}
        >
          Delete
        </motion.button>
      )}
    </motion.div>
  );
}
