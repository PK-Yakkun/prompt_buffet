import React from 'react';
import Tag from './Tag';
import { Word } from '../app/page';

type TagListProps = {
  words: Word[];
  selectedWords: Set<string>;
  onWordSelect: (word: Word) => void;
  onWordRemove: (wordToRemove: string) => void;
};

const TagList: React.FC<TagListProps> = ({
  words,
  selectedWords,
  onWordSelect,
  onWordRemove,
}) => {
  return (
    <div>
      {words.map((word) => (
        <Tag
          key={word.value}
          value={word.value}
          label={word.label}
          category={word.category}
          isSelected={selectedWords.has(word.value)}
          onClick={() => onWordSelect(word)}
          onRemove={() => onWordRemove(word.value)}
        />
      ))}
    </div>
  );
};

export default TagList;
