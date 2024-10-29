import { type FC } from 'react';

import { Button } from '@/lib/shared/components';

export const TablePrice: FC<Props> = ({ title, description, price }) => {
  return (
    <article className="bg-background p-8 flex flex-col justify-between gap-8 rounded-3xl border border-border">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <h4 className="font-medium text-4xl">
          {price ? (
            <>
              ${price}
              <span className="font-normal text-sm text-muted-foreground ml-1">/mo</span>
            </>
          ) : (
            <>
              Custom
              <span className="font-normal text-sm text-muted-foreground ml-1">/mo</span>
            </>
          )}
        </h4>
      </div>
      <Button>Choose plan</Button>
    </article>
  );
};

type Props = {
  title: string;
  description: string;
  price?: number;
};
