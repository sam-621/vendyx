import { type FC } from 'react';

import { CheckIcon } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/shared/components/ui/badge';
import { buttonVariants } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';
import { cn } from '@/shared/utils/theme';

export const PricingTable: FC<Props> = ({
  title,
  price,
  recurrence,
  features,
  buttonText,
  isFeatured
}) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col rounded-lg border p-6 text-left',
        isFeatured && 'bg-muted'
      )}
    >
      <Badge className="mb-8 block w-fit">{title}</Badge>
      <span className="text-4xl font-medium">{price}</span>
      <p className="text-muted-foreground">{recurrence}</p>
      <Separator className="my-6" />
      <div className="flex h-full flex-col justify-between gap-20">
        <ul className="space-y-4 text-muted-foreground">
          {features.map(f => (
            <li key={f} className="flex items-center gap-2">
              <CheckIcon className="size-4" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <Link className={cn(buttonVariants(), 'w-full')} href="/choose-plan">
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

type Props = {
  title: string;
  recurrence: string;
  price: string;
  features: string[];
  buttonText: string;
  isFeatured?: boolean;
};
