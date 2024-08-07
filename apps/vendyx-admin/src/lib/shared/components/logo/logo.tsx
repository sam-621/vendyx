import { type FC } from 'react';

import { cn } from '@/lib/shared/utils';

export const Logo: FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex items-center text-lg font-medium', className)}>
      <svg
        width="34"
        height="25"
        viewBox="0 0 34 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M24.3232 9.13131L16.8081 16.6465V24L24.3232 16.6465V9.13131Z" fill="black" />
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
    </div>
  );
};

type Props = {
  className?: string;
};
