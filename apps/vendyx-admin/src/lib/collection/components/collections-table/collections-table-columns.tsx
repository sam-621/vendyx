'use client';

import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Badge, Checkbox, DataTableColumnHeader, ImagePlaceholder } from '@/lib/shared/components';

import { type CollectionsTableRow } from './collections-table';

export const CollectionsTableColumns: ColumnDef<CollectionsTableRow>[] = [
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
      return <DataTableColumnHeader column={column} title="Collections" />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`collections/${row.original.id ?? ''}`}
          className="flex items-center gap-2 w-max"
        >
          {row.original.image ? (
            <img
              src={row.original.image}
              alt={row.getValue('name')}
              className="h-12 w-12 object-cover rounded-md flex-shrink-0"
            />
          ) : (
            <ImagePlaceholder initial={row.original.name} />
          )}
          <span className="text-nowrap">{row.original.name}</span>
        </Link>
      );
    }
  },
  {
    accessorKey: 'totalProducts',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Products" />,
    cell: ({ row }) => <p className="text-nowrap">{row.original.totalProducts}</p>
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.status ? 'default' : 'secondary'}>
          {row.original.status ? 'Enabled' : 'Disabled'}
        </Badge>
      );
    },
    enableSorting: false
  }
];
