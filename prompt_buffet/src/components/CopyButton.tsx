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

  return <Button onClick={handleCopy}>コピー</Button>;
};

export default CopyButton;
