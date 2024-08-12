import * as React from 'react';

import { cn } from '@/lib/shared/utils';

// eslint-disable-next-line @typescript-eslint/ban-types
export type InputProps = {
  isPrice?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isPrice, ...props }, ref) => {
    return (
      <input
        type={isPrice ? 'text' : type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        onFocus={e => {
          if (isPrice) {
            e.target.select();
          }
        }}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
