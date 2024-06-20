import { type FC, type PropsWithChildren, type ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { Button, cn } from '@ebloc/theme';
import { ChevronLeftIcon } from 'lucide-react';

export const PageLayout: FC<Props> = ({
  title,
  subtitle,
  backUrl,
  actions,
  className,
  children
}) => {
  return (
    <div className={cn('flex flex-col gap-8 mx-8 py-8', className?.container)}>
      {title && (
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {backUrl && (
              <Link to={backUrl}>
                <Button type="button" variant="outline" size="icon">
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <div className="flex flex-col gap-1">
              {title && <h1 className="text-xl font-medium">{title}</h1>}
              {subtitle && <p className="text-muted-foreground text-sm font-normal">{subtitle}</p>}
            </div>
          </div>
          <div className="flex gap-3">{actions}</div>
        </header>
      )}
      <main className={cn(className?.main)}>{children}</main>
    </div>
  );
};

type Props = PropsWithChildren & {
  title?: string;
  subtitle?: string;
  backUrl?: string;
  className?: {
    container?: string;
    main?: string;
  };
  actions?: ReactElement;
};
