import React from 'react';

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
}

const Toggle: React.FC<ToggleProps> = ({ isOn, onToggle, label }) => {
  return (
    <div className="flex items-center">
      {label && <span className="mr-2">{label}</span>}
      <button
        onClick={onToggle}
        className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none transition-colors ease-in-out duration-200 ${
          isOn ? 'bg-purple-600' : 'bg-gray-200'
        }`}
      >
        <span className="sr-only">トグルスイッチ</span>
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition ease-in-out duration-200 ${
            isOn ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;