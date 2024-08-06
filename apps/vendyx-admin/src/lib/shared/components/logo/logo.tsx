'use client';

import { type FC } from 'react';

import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

export const Logo: FC<Props> = ({ className }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={cn('flex items-center text-lg font-medium', className)}>
      {isDark ? (
        <svg
          width="34"
          height="24"
          viewBox="0 0 34 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M24.3232 9.13131L16.8081 16.6465V24L24.3232 16.6465V9.13131Z" fill="white" />
          <path
            d="M16.8081 16.6465L9.29293 9.13131V16.6465L13.0505 20.3232L16.8081 24V16.6465Z"
            fill="#DDDDDD"
          />
          <path d="M16.8081 16.6465L9.29293 9.13131H24.3232L16.8081 16.6465Z" fill="#EFEFEF" />
          <path
            d="M26.101 7.35354V14.8687L33.4545 7.51515V0L29.7778 3.67677L26.101 7.35354Z"
            fill="white"
          />
          <path
            d="M26.101 7.35354H7.51515L0 0H33.4545L29.7778 3.67677L26.101 7.35354Z"
            fill="#EFEFEF"
          />
          <path
            d="M7.51515 7.35354V14.8687L3.75758 11.1919L0 7.51515V0L7.51515 7.35354Z"
            fill="#DDDDDD"
          />
        </svg>
      ) : (
        <svg
          width="34"
          height="25"
          viewBox="0 0 34 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M24.8232 9.63131L17.3081 17.1465V24.5L24.8232 17.1465V9.63131Z" fill="black" />
          <path
            d="M17.3081 17.1465L9.79293 9.63131V17.1465L13.5505 20.8232L17.3081 24.5V17.1465Z"
            fill="#222222"
          />
          <path d="M17.3081 17.1465L9.79293 9.63131H24.8232L17.3081 17.1465Z" fill="#101010" />
          <path
            d="M26.601 7.85354V15.3687L33.9545 8.01515V0.5L30.2778 4.17677L26.601 7.85354Z"
            fill="black"
          />
          <path
            d="M26.601 7.85354H8.01515L0.5 0.5H33.9545L30.2778 4.17677L26.601 7.85354Z"
            fill="#101010"
          />
          <path
            d="M8.01515 7.85354V15.3687L4.25758 11.6919L0.5 8.01515V0.5L8.01515 7.85354Z"
            fill="#222222"
          />
        </svg>
      )}
    </div>
  );
};

type Props = {
  className?: string;
};
