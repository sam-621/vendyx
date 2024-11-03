import { type FC } from 'react';

import { XIcon } from 'lucide-react';

export const VariantImage: FC<Props> = ({ image, size, onRemove }) => {
  return (
    <div className="relative group">
      <button
        className="opacity-0 absolute top-0 right-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1 rounded-full bg-muted"
        onClick={onRemove}
      >
        <XIcon size={12} className="" />
      </button>
      <img {...getSize(size)} src={image} alt="Uploaded" />
    </div>
  );
};

const getSize = (size: Size) => {
  if (size === 'sm') {
    return { width: 48, height: 48 };
  }

  if (size === 'md') {
    return { width: 60, height: 60 };
  }
};

type Props = {
  image: string;
  size: Size;
  onRemove: () => void;
};

type Size = 'sm' | 'md';
