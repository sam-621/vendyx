'use client';

import { type FC, useEffect, useState } from 'react';

import { type VariantProps } from 'class-variance-authority';
import { CheckIcon, ClipboardIcon } from 'lucide-react';

import { InfoTooltip } from '../tooltips/info-tooltip';
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
    <InfoTooltip message="Copy to clipboard">
      <Button type="button" size={size} variant={variant} onClick={copyToClipboard}>
        <span className="sr-only">Copy</span>
        {hasCopied ? <CheckIcon size={16} /> : <ClipboardIcon size={16} />}
      </Button>
    </InfoTooltip>
  );
};

type Props = VariantProps<typeof buttonVariants> & {
  value: string;
};
