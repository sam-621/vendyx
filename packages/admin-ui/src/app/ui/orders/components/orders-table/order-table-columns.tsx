import { Link } from 'react-router-dom';

import { type ColumnDef } from '@tanstack/react-table';
import { getFormattedPrice } from '@vendyx/common';
import { Checkbox } from '@vendyx/theme';
import { User } from 'lucide-react';

import { DataTableColumnHeader } from '@/components/data-table';
import { OrderStatusBadge } from '@/components/items';

import { type TableOrder } from './order-table';

export const OrderTableColumns: ColumnDef<TableOrder>[] = [
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
      return <DataTableColumnHeader column={column} title="Customer" />;
    },
    cell: ({ row }) => {
      const customer = row.original.customer;

      return (
        <Link to={`/orders/${row.original.id ?? ''}`} className="flex items-center gap-2 w-full">
          <User className="h-6 w-6" />
          <span>{customer}</span>
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
      const formattedPride = getFormattedPrice(row.original.total);

      return <div className="font-medium">{formattedPride}</div>;
    }
  },
  {
    accessorKey: 'items',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Items" />;
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
      return <DataTableColumnHeader column={column} title="PLaced at" />;
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.placedAt}</div>;
    }
  }
];
