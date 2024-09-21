'use client';

import React, { useState, useCallback } from 'react';
import TagList from '../components/TagList';
import TextArea from '../components/TextArea';
import CopyButton from '../components/CopyButton';

const words = [
  'sunset',
  'mountain',
  'river',
  'forest',
  'ocean',
  'city',
  'night',
  'day',
];

const Page: React.FC = () => {
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());

  const handleTagClick = useCallback((word: string) => {
    setSelectedWords((prev) => {
      const newSelectedWords = new Set(prev);
      if (newSelectedWords.has(word)) {
        newSelectedWords.delete(word);
      } else {
        newSelectedWords.add(word);
      }
      return newSelectedWords;
    });
  }, []);

  const textAreaValue = Array.from(selectedWords).join(', ');

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Prompt Buffet</h1>
      <TagList
        words={words}
        selectedWords={selectedWords}
        onTagClick={handleTagClick}
      />
      <div className="mt-4">
        <TextArea
          value={textAreaValue}
          readOnly
          className="w-full h-24 border rounded p-2"
        />
      </div>
      <div className="mt-2">
        <CopyButton textToCopy={textAreaValue} />
      </div>
    </div>
  );
};

export default Page;
