'use client';

import { type FC, useEffect, useState } from 'react';

import { type VariantProps } from 'class-variance-authority';
import { CheckIcon, ClipboardIcon } from 'lucide-react';

import { Button, type buttonVariants } from '../ui/button';

export const CopyToClipboardButton: FC<Props> = ({ size = 'icon', variant = 'default', value }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value);
    setHasCopied(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button type="button" size={size} variant={variant} onClick={copyToClipboard}>
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon size={16} /> : <ClipboardIcon size={16} />}
    </Button>
  );
};

type Props = VariantProps<typeof buttonVariants> & {
  value: string;
};
