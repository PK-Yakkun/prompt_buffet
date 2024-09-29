import React from 'react';
import SaveIcon from './icons/SaveIcon';

interface SaveButtonProps {
  onClick: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-4 py-2 border border-blue-500 text-blue-500 bg-white rounded-md hover:bg-blue-50 transition-colors duration-300"
    >
        <SaveIcon className="w-5 h-5 text-blue-500"/>
    </button>
  );
};

export default SaveButton;