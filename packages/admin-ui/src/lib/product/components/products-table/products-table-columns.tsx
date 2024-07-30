import { Link } from 'react-router-dom';

import { Badge, Checkbox, cn } from '@ebloc/theme';
import { type ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/lib/shared';

import { type ProductTableRow } from './products-table';

export const ProductTableColumns: ColumnDef<ProductTableRow>[] = [
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
      return <DataTableColumnHeader column={column} title="Product" />;
    },
    cell: ({ row }) => {
      return (
        <Link to={`/products/${row.original.slug ?? ''}`} className="flex items-center gap-2 w-max">
          {row.original.image && (
            <img
              src={row.original.image}
              alt={row.getValue('name')}
              className="h-12 w-12 object-cover rounded-md flex-shrink-0"
            />
          )}
          <span className="text-nowrap">{row.original.name}</span>
        </Link>
      );
    }
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Stock" />;
    },
    cell: ({ row }) => {
      return (
        <p className="text-nowrap">
          <span className={cn(row.original.stock < 10 && 'text-destructive')}>
            {row.original.stock} in stock
          </span>{' '}
          {row.original.totalVariants > 1 ? `for ${row.original.totalVariants} variants` : ''}
        </p>
      );
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.status === 'enabled' ? 'default' : 'secondary'}>
          {row.original.status === 'enabled' ? 'Enabled' : 'Disabled'}
        </Badge>
      );
    },
    enableSorting: false
  }
];
