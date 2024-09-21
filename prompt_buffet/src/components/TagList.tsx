// components/TagList.tsx
import React from 'react';
import Tag from './Tag';

type TagListProps = {
  words: string[];
  selectedWords: Set<string>;
  onTagClick: (word: string) => void;
};

const TagList: React.FC<TagListProps> = ({
  words,
  selectedWords,
  onTagClick,
}) => {
  return (
    <div>
      {words.map((word) => (
        <Tag
          key={word}
          word={word}
          isSelected={selectedWords.has(word)}
          onClick={onTagClick}
        />
      ))}
    </div>
  );
};

export default TagList;
