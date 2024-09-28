import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ orientation = 'horizontal', className = '' }) => {
  const baseStyle = 'bg-gray-200';
  const orientationStyle = orientation === 'vertical' 
    ? 'h-full w-px' 
    : 'h-px w-full';

  return (
    <div className={`${baseStyle} ${orientationStyle} ${className}`} />
  );
};

export default Divider;