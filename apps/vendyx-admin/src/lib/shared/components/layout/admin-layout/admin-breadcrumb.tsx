'use client';

import { BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { isFirst, isLast } from '@/lib/shared/utils';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../../ui';

export const AdminBreadcrumb = () => {
  const pathname = usePathname();

  const breadcrumbItems = [{ label: 'Dashboard', href: '/' }, ...getBreadcrumbItems(pathname)];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map(({ label, href }, i) =>
          isLast(i, breadcrumbItems) ? (
            <BreadcrumbItem key={href}>
              {isFirst(i) && <BarChart2 className="h-4 w-4 mr-1" />}
              <BreadcrumbPage>{label}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <>
              <BreadcrumbItem key={href}>
                <BreadcrumbLink asChild>
                  <Link href={href ?? ''} className="flex items-center">
                    {isFirst(i) && <BarChart2 className="h-4 w-4 mr-1" />}
                    {label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const BRADCRUMBS: Record<string, TBreadcrumbItem[]> = {
  '/': [],
  '/products': [{ href: '/products', label: 'Products' }, { label: 'All products' }],
  '/products/new': [{ href: '/products', label: 'Products' }, { label: 'Create product' }]
};

type TBreadcrumbItem = {
  href?: string;
  label: string;
};

const getBreadcrumbItems = (pathname: string) => {
  return BRADCRUMBS[pathname] ?? [];
};
