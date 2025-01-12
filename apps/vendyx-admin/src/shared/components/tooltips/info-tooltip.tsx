import { type FC, type PropsWithChildren } from 'react';

import { InfoIcon } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export const InfoTooltip: FC<Props> = ({ message, size = 16, children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children ?? <InfoIcon size={size} />}</TooltipTrigger>
        <TooltipContent>{message}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

type Props = PropsWithChildren & {
  message: string;
  /**
   * @default 16
   */
  size?: number;
};
