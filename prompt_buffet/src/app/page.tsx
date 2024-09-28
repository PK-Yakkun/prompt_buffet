'use client';

import React, { useState, useCallback, useEffect } from 'react';
import TagList from '../components/TagList';
import TextArea from '../components/TextArea';
import CopyButton from '../components/CopyButton';
import Select from '../components/Select';
import Toggle from '@/components/Toggle';
import DeleteIcon from '@/components/icons/DeleteIcon';
import ArrowsUpDown from '@/components/icons/ArrowsUpDownIcon';

export type WordCategory = '背景' | 'カメラ・アングル' | '画質' | '表情' | 'ポーズ' | '服装' | 'その他';

export interface Word {
  value: string;
  label: string;
  category: WordCategory;
  weight?: number;
}

const defaultWords: Word[] = [
  { value: 'sunset', label: '夕日', category: '背景' },
  { value: 'mountain', label: '山', category: '背景' },
  { value: 'river', label: '川', category: '背景' },
  { value: 'closeup', label: 'クローズアップ', category: 'カメラ・アングル' },
  { value: 'wideangle', label: '広角', category: 'カメラ・アングル' },
  { value: 'highres', label: '高解像度', category: '画質' },
  { value: 'smile', label: '笑顔', category: '表情' },
  { value: 'standing', label: '立ち姿', category: 'ポーズ' },
  { value: 'casual', label: 'カジュアル', category: '服装' },
  { value: 'formal', label: 'フォーマル', category: '服装' },
  { value: 'colorful', label: 'カラフル', category: 'その他' },
];

const defaultCategories: WordCategory[] = ['背景', 'カメラ・アングル', '画質', '表情', 'ポーズ', '服装', 'その他'];

const Page: React.FC = () => {
  const [words, setWords] = useState<Word[]>(defaultWords);
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [newWordValue, setNewWordValue] = useState<string>('');
  const [newWordLabel, setNewWordLabel] = useState<string>('');
  const [newWordCategory, setNewWordCategory] = useState<WordCategory>('背景');
  const [weighting, setWeighting] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);

  useEffect(() => {
    const savedWords = localStorage.getItem('customWords');
    if (savedWords) {
      setWords(JSON.parse(savedWords));
    }
  }, []);

  const handleTagClick = useCallback((word: Word) => {
    setSelectedWords((prev) => {
      const index = prev.findIndex((item) => item.value === word.value);
      if (index !== -1) {
        return prev.filter((_, i) => i !== index);
      } else {
        return [...prev, word];
      }
    });
  }, []);

  const handleAddWord = () => {
    if (newWordValue.trim() !== '' && newWordLabel.trim() !== '') {
      const newWord: Word = { value: newWordValue.trim(), label: newWordLabel.trim(), category: newWordCategory };
      const updatedWords = [...words, newWord];
      setWords(updatedWords);
      localStorage.setItem('customWords', JSON.stringify(updatedWords));
      setNewWordValue('');
      setNewWordLabel('');
      setNewWordCategory('背景');
    }
  };

  const handleToggle = () => {
    setIsFeatureEnabled(prev => !prev);
    // ここで他の必要な処理を行うことができます
  };

  const handleRemoveWord = (wordToRemove: string) => {
    const updatedWords = words.filter(word => word.value !== wordToRemove);
    setWords(updatedWords);
    localStorage.setItem('customWords', JSON.stringify(updatedWords));
    setSelectedWords(prev => prev.filter(word => word.value !== wordToRemove));
  };

  const handleWeightIncrease = (value: string) => {
    setSelectedWords((prev) => {
      return prev.map((word) => {
        if (word.value === value) {
          const newWeight = (word.weight || 0) + 1;
          return { ...word, weight: Math.min(newWeight, 5) };
        }
        return word;
      });
    });
  };

  const handleWeightDecrease = (value: string) => {
    setSelectedWords((prev) => {
      return prev.map((word) => {
        if (word.value === value) {
          const newWeight = (word.weight || 0) - 1;
          return { ...word, weight: Math.max(newWeight, 0) };
        }
        return word;
      });
    });
  };

  const textAreaValue = selectedWords
    .map((word) => {
      const weight = word.weight || 0;
      return '('.repeat(weight) + word.value + ')'.repeat(weight);
    })
    .join(', ');

  const handleWeightingToggle = () => {
    setWeighting(prev => !prev);
    if (deleteMode) setDeleteMode(false);
  };

  const handleDeleteModeToggle = () => {
    setDeleteMode(prev => !prev);
    if (weighting) setWeighting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Prompt Buffet</h1>
        <div className="mb-6">
          <TextArea
            value={textAreaValue}
            readOnly
            className="w-full h-32 border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
        <div className="flex justify-end mb-6">
          <CopyButton textToCopy={textAreaValue} />
        </div>
        <div className="flex justify-end mb-6">
          <ArrowsUpDown className="w-5 h-5"/>
          <Toggle
            label="重み付けモード"
            isOn={weighting}
            onToggle={handleWeightingToggle}
          />
          <Toggle
            label="削除モード"
            isOn={deleteMode}
            onToggle={handleDeleteModeToggle}
          />
        </div>
        
        <TagList
          words={words}
          selectedWords={new Set(selectedWords.map(word => word.value))}
          onWordSelect={handleTagClick}
          onWordRemove={handleRemoveWord}
          deleteMode={deleteMode}
          weighting={weighting}
          onWeightIncrease={handleWeightIncrease}
          onWeightDecrease={handleWeightDecrease}
        />
        <div className="mt-8">
          <input
            type="text"
            value={newWordValue}
            onChange={(e) => setNewWordValue(e.target.value)}
            placeholder="新しい単語の値"
            className="mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          <input
            type="text"
            value={newWordLabel}
            onChange={(e) => setNewWordLabel(e.target.value)}
            placeholder="新しい単語のラベル"
            className="mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          <Select
            options={defaultCategories}
            value={newWordCategory}
            onChange={(value) => setNewWordCategory(value as WordCategory)}
          />
          <button onClick={handleAddWord} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
            追加
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
