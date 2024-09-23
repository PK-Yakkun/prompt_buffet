import React from 'react';

type TagProps = {
  word: string;
  isSelected: boolean;
  onClick: (word: string) => void;
  onRemove: (word: string) => void;
};

const Tag: React.FC<TagProps> = ({ word, isSelected, onClick, onRemove }) => {
  return (
    <span
      className={`cursor-pointer px-3 py-1 m-1 rounded-full inline-flex items-center ${
        isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }`}
    >
      <span onClick={() => onClick(word)}>{word}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(word);
        }}
        className="ml-2 text-sm"
      >
        ×
      </button>
    </span>
  );
};

export default Tag;
