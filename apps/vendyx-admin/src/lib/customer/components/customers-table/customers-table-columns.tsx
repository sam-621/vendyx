'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';

import { Badge, Checkbox, DataTableColumnHeader } from '@/lib/shared/components';
import { formatPrice } from '@/lib/shared/utils';

import { type CustomersTableRow } from './customers-table';

export const CustomersTableColumns: ColumnDef<CustomersTableRow>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(Boolean(value))}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(Boolean(value))}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Customer" />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`customers/${row.original.id}`}
          className="flex items-center gap-2 w-full text-nowrap"
        >
          <UserIcon className="flex-shrink-0" size={24} />
          <span>{row.original.name}</span>
        </Link>
      );
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
    cell: ({ row }) => {
      return <span>{row.original.email}</span>;
    }
  },
  {
    accessorKey: 'orders',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Order" />;
    },
    cell: ({ row }) => {
      return (
        <span>
          {row.original.orders} {row.original.orders === 1 ? 'order' : 'orders'}
        </span>
      );
    }
  },
  {
    accessorKey: 'totalSpent',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Total spent" />;
    },
    cell: ({ row }) => {
      return <span>{formatPrice(row.original.totalSpent)}</span>;
    }
  },
  {
    accessorKey: 'enabled',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.enabled ? 'default' : 'secondary'}>
          {row.original.enabled ? 'Enabled' : 'Disabled'}
        </Badge>
      );
    },
    enableSorting: false
  }
];
