import { type FC } from 'react';

import { InfoIcon } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui';

export const InfoTooltip: FC<Props> = ({ message, size = 16 }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoIcon size={size} />
        </TooltipTrigger>
        <TooltipContent>{message}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

type Props = {
  message: string;
  /**
   * @default 16
   */
  size?: number;
};
