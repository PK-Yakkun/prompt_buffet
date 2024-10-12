import React from 'react';
import Tag from './Tag';
import { Word } from '../app/page';

interface TagListProps {
  words: Word[];
  selectedWords: Set<string>;
  viewLabelMode: boolean;
  deleteMode: boolean;
  weightingMode: boolean;
  onWordSelect: (word: Word) => void;
  onWordRemove: (value: string) => void;
  onWeightIncrease: (value: string) => void;
  onWeightDecrease: (value: string) => void;
}

const TagList: React.FC<TagListProps> = ({
  words,
  selectedWords,
  viewLabelMode,
  deleteMode,
  weightingMode,
  onWordSelect,
  onWordRemove,
  onWeightIncrease,
  onWeightDecrease
}) => {
  return (
    <div className="flex flex-wrap gap-1">
      {words.map((word) => (
        <Tag
          key={word.value}
          word={word}
          isSelected={selectedWords.has(word.value)}
          onSelect={() => onWordSelect(word)}
          onRemove={() => onWordRemove(word.value)}
          viewLabelMode={viewLabelMode}
          deleteMode={deleteMode}
          weightingMode={weightingMode}
          onWeightIncrease={() => onWeightIncrease(word.value)}
          onWeightDecrease={() => onWeightDecrease(word.value)}
        />
      ))}
    </div>
  );
};

export default TagList;
