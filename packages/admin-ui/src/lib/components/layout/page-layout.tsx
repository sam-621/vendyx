import { type FC, type PropsWithChildren, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, cn } from '@ebloc/theme';
import { ChevronLeftIcon } from 'lucide-react';

export const PageLayout: FC<Props> = ({ title, subtitle, back, actions, className, children }) => {
  const navigate = useNavigate();

  return (
    <div className={cn('flex flex-col gap-8 mx-8 py-8', className?.container)}>
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {back && (
            <Button type="button" onClick={() => navigate(-1)} variant="outline" size="icon">
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          )}
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="text-muted-foreground text-sm font-normal">{subtitle}</p>
          </div>
        </div>
        <div className="flex gap-3">{actions}</div>
      </header>
      <main className={cn(className?.main)}>{children}</main>
    </div>
  );
};

type Props = PropsWithChildren & {
  title: string;
  subtitle: string;
  back?: boolean;
  className?: {
    container?: string;
    main?: string;
  };
  actions?: ReactElement;
};
