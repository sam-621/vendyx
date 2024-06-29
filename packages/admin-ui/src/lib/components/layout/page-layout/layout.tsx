import { type FC, type PropsWithChildren, type ReactElement, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Button, cn } from '@ebloc/theme';
import { ChevronLeftIcon } from 'lucide-react';

import { useIsVisible } from '@/lib/hooks';

export const PageLayout: FC<Props> = ({
  title,
  subtitle,
  backUrl,
  actions,
  className,
  stickyHeader = false,
  children
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref, { canExecute: stickyHeader, threshold: 0.8 });

  return (
    <div className={cn('flex flex-col gap-8 mx-8 py-8', className?.container)}>
      {title && stickyHeader && (
        <header
          className={cn(
            'opacity-0 fixed top-0 justify-between items-center h-16 bg-body',
            !isVisible && 'transition ease-in duration-150 opacity-100 flex z-10 sticky top-0'
          )}
        >
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
      {title && (
        <header ref={ref} className={cn('flex justify-between items-center h-16 bg-body')}>
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
  stickyHeader?: boolean;
  actions?: ReactElement;
};
