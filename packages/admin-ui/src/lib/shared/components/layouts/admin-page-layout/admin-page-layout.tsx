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

export const AdminPageLayout: FC<Props> = ({ breadcrumbs, children }) => {
  return (
    <>
      <header className="flex justify-between items-center h-16 px-6 border-b">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs?.map(({ label, to }, i) =>
                isLast(i, breadcrumbs) ? (
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
      <section className="p-6">{children}</section>
    </>
  );
};

type Props = PropsWithChildren & {
  breadcrumbs: { label: string; to?: string }[];
};
