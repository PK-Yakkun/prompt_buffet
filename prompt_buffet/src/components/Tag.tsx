import React from 'react';
import { Word } from '../app/page';

type TagProps = Word & {
  isSelected: boolean;
  onClick: () => void;
  onRemove: () => void;
};

const Tag: React.FC<TagProps> = ({ value, label, category, isSelected, onClick, onRemove }) => {
  return (
    <span 
      className={`inline-block rounded-full px-4 py-2 text-sm font-semibold mr-2 mb-2 cursor-pointer transition duration-300 ${
        isSelected ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      onClick={onClick}
    >
      {label}
      <button 
        className="ml-2 text-red-500 hover:text-red-700 transition duration-300"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        ×
      </button>
    </span>
  );
};

export default Tag;
