import { type FC, type PropsWithChildren } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@ebloc/theme';

import { isLast } from '@/lib/shared/utils';

import { UserAvatar } from '../../user-avatar';

export const AdminPageLayout: FC<Props> = ({ title, breadcrumbs, children }) => {
  const breadcrumbItems = [{ label: 'Dashboard', to: '/' }, ...breadcrumbs];

  return (
    <>
      <header className="flex justify-between items-center h-16 px-6 border-b">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map(({ label, to }, i) =>
                isLast(i, breadcrumbItems) ? (
                  <BreadcrumbItem key={to}>
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <>
                    <BreadcrumbItem key={to}>
                      <BreadcrumbLink href={to}>{label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <UserAvatar />
        </div>
      </header>
      <section className="p-6 flex-1 flex flex-col gap-6">
        <h1 className="h3">{title}</h1>
        {children}
      </section>
    </>
  );
};

type Props = PropsWithChildren & {
  title: string;
  breadcrumbs: { label: string; to?: string }[];
};
