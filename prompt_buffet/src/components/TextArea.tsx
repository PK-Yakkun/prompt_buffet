// components/TextArea.tsx
import React from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: React.FC<TextAreaProps> = (props) => {
  return <textarea {...props} />;
};

export default TextArea;
