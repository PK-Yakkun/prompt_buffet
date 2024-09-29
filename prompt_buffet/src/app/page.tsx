'use client';

import React, { useState, useCallback, useEffect } from 'react';
import TagList from '../components/TagList';
import TextArea from '../components/TextArea';
import CopyButton from '../components/CopyButton';
import Select from '../components/Select';
import Toggle from '@/components/Toggle';
import Divider from '@/components/Divider';
import DeleteIcon from '@/components/icons/DeleteIcon';
import PlusIcon from '@/components/icons/PlusIcon';
import SaveIcon from '@/components/icons/SaveIcon';
import LoadIcon from '@/components/icons/LoadIcon';
import SaveButton from '@/components/SaveButton';
import LoadButton from '@/components/LoadButton';
import AdjustmentsIcon from '@/components/icons/AdjustmentsIcon';

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


  const textAreaValue = selectedWords
    .map((word) => {
      const weight = word.weight || 0;
      return '('.repeat(weight) + word.value + ')'.repeat(weight);
    })
    .join(', ');

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

  const handleWeightingToggle = () => {
    setWeighting(prev => !prev);
    if (deleteMode) setDeleteMode(false);
  };

  const handleDeleteModeToggle = () => {
    setDeleteMode(prev => !prev);
    if (weighting) setWeighting(false);
  };

  const handleSave = () => {
    console.log('save');
  };

  const handleLoad = () => {
    console.log('load');
  };

  return (
    <div className="h-screen bg-white flex items-center justify-center">
      <div className="w-[1000px] h-full flex flex-col p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Prompt Buffet</h1>
        <div className="flex-grow flex flex-col overflow-hidden">
          <div className="mb-2">
            <TextArea
              value={textAreaValue}
              readOnly
              tabIndex={-1}
              className="w-full h-[240px] border-2 border-gray-300 rounded-lg p-4 focus:outline-none overflow-y-auto custom-scrollbar resize-none"
            />
          </div>
          {/* <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <SaveButton onClick={handleSave} />
              <LoadButton onClick={handleLoad} />
            </div>
            <CopyButton textToCopy={textAreaValue} />
          </div> */}
          <div className="flex justify-end">
            <CopyButton textToCopy={textAreaValue} />
          </div>
          <Divider className='my-4' />
          <div className="flex justify-end items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <AdjustmentsIcon className="w-[22px] h-[22px]" />
              <Toggle
                label=""
                isOn={weighting}
                onToggle={handleWeightingToggle}
              />
            </div>
            <div className="flex items-center gap-1">
              <DeleteIcon className="w-5 h-5"/>
              <Toggle
                label=""
                isOn={deleteMode}
                onToggle={handleDeleteModeToggle}
              />
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto custom-scrollbar">
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
          </div>
          <Divider className="my-4" />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <span className="text-sm"><span className="text-red-500"> * </span>value</span>
                <input
                  type="text"
                  value={newWordValue}
                  onChange={(e) => setNewWordValue(e.target.value)}
                  placeholder="e.g. sunset"
                  className="flex-grow text-sm px-3 py-1 border border-gray-300 rounded-md focus:outline-none transition duration-300"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">label</span>
                <input
                  type="text"
                  value={newWordLabel}
                  onChange={(e) => setNewWordLabel(e.target.value)}
                  placeholder="e.g. 夕日"
                  className="flex-grow text-sm px-3 py-1 border border-gray-300 rounded-md focus:outline-none transition duration-300"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">category</span>
                <Select
                  options={defaultCategories}
                  value={newWordCategory}
                  onChange={(value) => setNewWordCategory(value as WordCategory)}
                  className="w-[160px]"
                />
              </div>
            </div>
            <button onClick={handleAddWord} className="bg-[var(--accent-blue)] text-white text-sm px-4 py-[6px] rounded-md hover:bg-[#2563eb] transition duration-300">
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
