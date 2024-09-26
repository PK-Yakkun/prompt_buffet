import React from 'react';
import { WordCategory } from '@/app/page';

type SelectProps = {
  options: WordCategory[];
  value: string;
  onChange: (value: string) => void;
};

const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;