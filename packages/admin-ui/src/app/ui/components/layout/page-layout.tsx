import { type FC, type PropsWithChildren, type ReactElement } from 'react';

export const PageLayout: FC<Props> = ({ title, subtitle, actions, children }) => {
  return (
    <div className="flex flex-col gap-8 mx-8 py-8">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="text-muted-foreground text-sm font-normal">{subtitle}</p>
          </div>
        </div>
        <div className="flex gap-3">{actions}</div>
      </header>
      <main className="flex flex-col gap-8">{children}</main>
    </div>
  );
};

type Props = PropsWithChildren & {
  title: string;
  subtitle: string;
  actions?: ReactElement;
};
