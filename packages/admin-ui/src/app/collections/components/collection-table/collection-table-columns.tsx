import { Link } from 'react-router-dom';

import { Badge, Checkbox } from '@ebloc/theme';
import { type ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/lib/components/data-table';

import { type TableCollection } from './collection-table';

export const CollectionTableColumns: ColumnDef<TableCollection>[] = [
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
      return <DataTableColumnHeader column={column} title="Collection" />;
    },
    cell: ({ row }) => {
      return (
        <Link
          to={`/collections/${row.original.id ?? ''}`}
          className="flex items-center gap-2 w-full"
        >
          {row.original.image && (
            <img
              src={row.original.image}
              alt={row.original.name}
              className="h-12 w-12 object-cover rounded-md"
            />
          )}
          <span>{row.original.name}</span>
        </Link>
      );
    }
  },
  {
    accessorKey: 'totalProducts',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Products" />;
    },
    cell: ({ row }) => {
      return (
        <span>
          {row.original.totalProducts} {row.original.totalProducts === 1 ? 'Product' : 'Products'}{' '}
        </span>
      );
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
          {row.original.enabled ? 'Active' : 'Disabled'}
        </Badge>
      );
    },
    enableSorting: false
  }
];
