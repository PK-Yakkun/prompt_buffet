import React from 'react';
import CopyIcon from './icons/CopyIcon';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('クリップボードにコピーしました');
    } catch (error) {
      console.error('コピーに失敗しました: ', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center"
    >
      <CopyIcon className="w-5 h-5" />
    </button>
  );
};

export default CopyButton;
