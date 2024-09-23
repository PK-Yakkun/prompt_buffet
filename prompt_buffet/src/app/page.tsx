'use client';

import React, { useState, useCallback, useEffect } from 'react';
import TagList from '../components/TagList';
import TextArea from '../components/TextArea';
import CopyButton from '../components/CopyButton';

const defaultWords = [
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
  const [words, setWords] = useState<string[]>(defaultWords);
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [newWord, setNewWord] = useState<string>('');

  useEffect(() => {
    const savedWords = localStorage.getItem('customWords');
    if (savedWords) {
      setWords(JSON.parse(savedWords));
    }
  }, []);

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

  const handleAddWord = () => {
    if (newWord && !words.includes(newWord)) {
      const updatedWords = [...words, newWord];
      setWords(updatedWords);
      localStorage.setItem('customWords', JSON.stringify(updatedWords));
      setNewWord('');
    }
  };

  const handleRemoveWord = (wordToRemove: string) => {
    const updatedWords = words.filter(word => word !== wordToRemove);
    setWords(updatedWords);
    localStorage.setItem('customWords', JSON.stringify(updatedWords));
    setSelectedWords(prev => {
      const newSelectedWords = new Set(prev);
      newSelectedWords.delete(wordToRemove);
      return newSelectedWords;
    });
  };

  const textAreaValue = Array.from(selectedWords).join(', ');

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Prompt Buffet</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          className="border rounded p-2 mr-2"
          placeholder="新しい単語を入力"
        />
        <button onClick={handleAddWord} className="bg-green-500 text-white px-4 py-2 rounded">
          追加
        </button>
      </div>
      <TagList
        words={words}
        selectedWords={selectedWords}
        onTagClick={handleTagClick}
        onRemoveWord={handleRemoveWord}
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
