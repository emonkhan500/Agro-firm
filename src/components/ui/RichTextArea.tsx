'use client';

import dynamic from 'next/dynamic';
import { CSSProperties, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
});

interface Props {
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: CSSProperties;
  height?: number;
  handleBlur?: () => void;
}

const RichTextArea = ({
  defaultValue = '',
  onChange,
  className,
  style,
  height = 180,
  handleBlur,
}: Props) => {
  const [value, setValue] = useState(defaultValue);

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ header: [1, 2, 3, false] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['clean'],
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={(content) => {
        setValue(content);
        onChange?.(content);
      }}
      onBlur={handleBlur}
      modules={{ toolbar: toolbarOptions }}
      className={className}
      style={{
        height: `${height}px`,
        ...style,
      }}
    />
  );
};

export default RichTextArea;
