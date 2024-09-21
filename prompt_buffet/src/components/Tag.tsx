// components/Tag.tsx
import React from 'react';

type TagProps = {
  word: string;
  isSelected: boolean;
  onClick: (word: string) => void;
};

const Tag: React.FC<TagProps> = ({ word, isSelected, onClick }) => {
  return (
    <span
      onClick={() => onClick(word)}
      className={`cursor-pointer px-3 py-1 m-1 rounded-full ${
        isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }`}
    >
      {word}
    </span>
  );
};

export default Tag;
