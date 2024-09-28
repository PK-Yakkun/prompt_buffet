// components/TextArea.tsx
import React from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => {
  return <textarea className={`resize-none ${className || ''}`} {...props} />;
};

export default TextArea;
