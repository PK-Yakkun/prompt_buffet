import React from 'react';

type TipsProps = {
  label: string;
};

const Tips: React.FC<TipsProps> = ({ label }) => {
  return (
    <div className="absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-lg top-0 right-0 transform translate-x-full -translate-y-1/2 opacity-0 transition-opacity duration-300 ease-in-out opacity-100">
      {label}
    </div>
  );
};

export default Tips;
