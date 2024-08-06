import { type FC, type PropsWithChildren, type ReactElement } from 'react';

export const AdminPageLayout: FC<Props> = ({ title, actions, children }) => {
  return (
    <section className="p-6 flex-1 flex flex-col gap-6 max-w-6xl w-full mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="h3">{title}</h1>
        <div className="flex gap-2">{actions}</div>
      </div>
      {children}
    </section>
  );
};

type Props = PropsWithChildren & {
  title: string;
  actions?: ReactElement;
};
