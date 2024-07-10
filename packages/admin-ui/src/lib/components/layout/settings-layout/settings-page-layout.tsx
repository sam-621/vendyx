import { type FC, type PropsWithChildren, type ReactElement } from 'react';

export const SettingsPageLayout: FC<Props> = ({ title, subtitle, children }) => {
  return (
    <div className="flex flex-col gap-6 max-w-3xl px-6 pb-6">
      <header>
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-muted-foreground text-sm font-light">{subtitle}</p>
      </header>
      <hr />
      <main>{children}</main>
    </div>
  );
};

type Props = PropsWithChildren & {
  title?: string;
  subtitle?: string;
  backUrl?: string;
  status?: ReactElement;
  className?: {
    container?: string;
    main?: string;
  };
  stickyHeader?: boolean;
  actions?: ReactElement;
};
