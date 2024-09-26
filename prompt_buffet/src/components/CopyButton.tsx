import React from 'react';
import Button from './Button';

type CopyButtonProps = {
  textToCopy: string;
};

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('クリップボードにコピーしました');
    } catch (error) {
      console.error('コピーに失敗しました: ', error);
    }
  };

  return <Button onClick={handleCopy} className="bg-purple-600 hover:bg-purple-700 transition duration-300">コピー</Button>;
};

export default CopyButton;
