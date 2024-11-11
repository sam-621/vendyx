import { type FC } from 'react';

export const ImagePlaceholder: FC<Props> = ({ initial }) => {
  return (
    <div className="h-12 w-12 bg-muted/50 rounded-md flex justify-center items-center">
      <span>{initial.charAt(0).toUpperCase()}</span>
    </div>
  );
};

type Props = {
  initial: string;
};
