'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';

import { Checkbox, DataTableColumnHeader, OrderStatusBadge } from '@/lib/shared/components';
import { formatDate, formatPrice } from '@/lib/shared/utils';

import { type OrdersTableRow } from './orders-table';

export const OrdersTableColumns: ColumnDef<OrdersTableRow>[] = [
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
    accessorKey: 'code',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Code" />;
    },
    cell: ({ row }) => {
      return <span className="w-20">{row.original.code}</span>;
    },
    enableSorting: false
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Client" />;
    },
    cell: ({ row }) => {
      const customer = row.original.customer;

      return (
        <Link href={`orders/${row.original.id ?? ''}`} className="flex items-center gap-2 w-full">
          <UserIcon className="h-6 w-6 flex-shrink-0" />
          <span className="text-nowrap">{customer}</span>
        </Link>
      );
    }
  },
  {
    accessorKey: 'total',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Total" />;
    },
    cell: ({ row }) => {
      const formattedPride = formatPrice(row.original.total);

      return <div className="font-medium">{formattedPride}</div>;
    }
  },
  {
    accessorKey: 'items',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Products" />;
    }
  },
  {
    accessorKey: 'state',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="State" />;
    },
    cell: ({ row }) => {
      return <OrderStatusBadge status={row.original.state} />;
    }
  },
  {
    accessorKey: 'shipment',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Shipment" />;
    },
    enableSorting: false
  },
  {
    accessorKey: 'placedAt',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Placed at" />;
    },
    cell: ({ row }) => {
      return <div className="font-medium">{formatDate(new Date(row.original.placedAt))}</div>;
    }
  }
];
