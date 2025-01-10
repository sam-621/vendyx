import { type FC, type PropsWithChildren, type ReactElement } from 'react';

import { cn } from '@/shared/utils/theme';

import { UserAvatar } from '../../user-avatar/user-avatar';
import { AdminBreadcrumb } from '../admin-layout/admin-breadcrumb';

export const AdminPageLayout: FC<Props> = ({ title, actions, maxWidth, children }) => {
  return (
    <>
      <header className="flex justify-between items-center h-16 px-6">
        <div>
          <AdminBreadcrumb />
        </div>
        <div>
          <UserAvatar />
        </div>
      </header>
      <section
        className={cn(
          'p-6 pt-0 flex-1 flex flex-col gap-4 sticky top-16',
          maxWidth && 'max-w-6xl w-full mx-auto'
        )}
      >
        <div className="flex justify-between items-center">
          <h1 className="h3">{title}</h1>
          <div className="flex gap-2">{actions}</div>
        </div>
        {children}
      </section>
    </>
  );
};

type Props = PropsWithChildren & {
  title: string;
  actions?: ReactElement;
  maxWidth?: boolean;
};
