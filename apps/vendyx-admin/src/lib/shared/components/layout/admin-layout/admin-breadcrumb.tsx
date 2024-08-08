'use client';

import { Fragment } from 'react';

import { BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

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
  const params = useParams();

  const shop = Array.isArray(params.shop) ? params.shop[0] : params.shop;

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    ...getBreadcrumbItems(pathname.replace(`/shops/${shop}`, ''))
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map(({ label, href }, i) =>
          isLast(i, breadcrumbItems) ? (
            <BreadcrumbItem key={label}>
              {isFirst(i) && <BarChart2 className="h-4 w-4 mr-1" />}
              <BreadcrumbPage>{label}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <Fragment key={label}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={href ?? ''} className="flex items-center">
                    {isFirst(i) && <BarChart2 className="h-4 w-4 mr-1" />}
                    {label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const BREADCRUMBS: Record<string, TBreadcrumbItem[]> = {
  '/': [],
  '/products': [{ href: '/products', label: 'Products' }, { label: 'All products' }],
  '/products/new': [{ href: '/products', label: 'Products' }, { label: 'Create product' }]
};

type TBreadcrumbItem = {
  href?: string;
  label: string;
};

const getBreadcrumbItems = (pathname: string) => {
  return BREADCRUMBS[pathname] ?? [];
};
