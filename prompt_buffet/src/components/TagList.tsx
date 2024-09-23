import React from 'react';
import Tag from './Tag';

type TagListProps = {
  words: string[];
  selectedWords: Set<string>;
  onTagClick: (word: string) => void;
  onRemoveWord: (word: string) => void;
};

const TagList: React.FC<TagListProps> = ({
  words,
  selectedWords,
  onTagClick,
  onRemoveWord,
}) => {
  return (
    <div>
      {words.map((word) => (
        <Tag
          key={word}
          word={word}
          isSelected={selectedWords.has(word)}
          onClick={onTagClick}
          onRemove={onRemoveWord}
        />
      ))}
    </div>
  );
};

export default TagList;
