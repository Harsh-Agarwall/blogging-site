'use client';

import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

export default function MarkdownEditor({ content, onChange }: any) {
  const [value, setValue] = useState(content || '');

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <MdEditor
      value={value}
      style={{ height: '400px' }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={({ text }) => setValue(text)}
    />
  );
}
