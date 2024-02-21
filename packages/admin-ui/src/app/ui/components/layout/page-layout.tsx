import { type FC, type PropsWithChildren, type ReactElement } from 'react';

import { cn } from '@vendyx/theme';

export const PageLayout: FC<Props> = ({ title, subtitle, icon, actions, className, children }) => {
  return (
    <div className={cn('flex flex-col gap-8 mx-8 py-8', className?.container)}>
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {icon && icon}
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
  icon?: ReactElement;
  className?: {
    container?: string;
    main?: string;
  };
  actions?: ReactElement;
};
