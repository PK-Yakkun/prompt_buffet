import React from 'react';
import { Word } from '../app/page';
import ChevronUpIcon from './icons/ChevronUpIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import CrossIcon from './icons/CrossIcon';

interface TagProps {
  word: Word;
  isSelected: boolean;
  viewLabelMode: boolean;
  deleteMode: boolean;
  weightingMode: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onWeightIncrease: () => void;
  onWeightDecrease: () => void;
}

const Tag: React.FC<TagProps> = ({
  word,
  isSelected,
  viewLabelMode,
  deleteMode,
  weightingMode,
  onSelect,
  onRemove,
  onWeightIncrease,
  onWeightDecrease
}) => {
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm mr-2 mb-2 cursor-pointer ${
        isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
      }`}
      onClick={onSelect}
    >
      {weightingMode && isSelected && (
        <ChevronUpIcon
          className="w-3 h-3 mr-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onWeightIncrease();
          }}
        />
      )}
      { viewLabelMode ? word.label : word.value}
      {deleteMode && (
        <CrossIcon
          className="w-3 h-3 ml-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        />
      )}
      {weightingMode && isSelected && (
        <ChevronDownIcon
          className="w-3 h-3 ml-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onWeightDecrease();
          }}
        />
      )}
    </div>
  );
};

export default Tag;
