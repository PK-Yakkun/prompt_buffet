import React from 'react';
import CopyIcon from './icons/CopyIcon';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, className }) => {
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
      className={`bg-[var(--accent-blue)] text-white px-4 py-2 rounded-lg hover:bg-[#2563eb] transition duration-300 flex items-center ${className || ''}`}
    >
      <CopyIcon className="w-5 h-5" />
    </button>
  );
};

export default CopyButton;
