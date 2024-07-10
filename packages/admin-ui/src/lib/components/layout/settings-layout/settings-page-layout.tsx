import { type FC, type PropsWithChildren } from 'react';

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
};
