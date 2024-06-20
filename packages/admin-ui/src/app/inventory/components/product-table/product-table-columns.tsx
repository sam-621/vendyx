import { Link } from 'react-router-dom';

import { getFormattedPrice } from '@ebloc/common';
import { Badge, Checkbox } from '@ebloc/theme';
import { type ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/lib/components/data-table';
import { t } from '@/lib/locales';

import { type TableProduct } from './product-table';
import { InventoryTableActions } from './product-table-actions';

export const ProductTableColumns: ColumnDef<TableProduct>[] = [
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
      return <DataTableColumnHeader column={column} title={t('inventory.table.header.product')} />;
    },
    cell: ({ row }) => {
      return (
        <Link
          to={`/inventory/${row.original.slug ?? ''}`}
          className="flex items-center gap-2 w-full"
        >
          {row.original.image && (
            <img
              src={row.original.image}
              alt={row.getValue('name')}
              className="h-12 w-12 object-cover rounded-md"
            />
          )}
          <span>{row.original.name}</span>
        </Link>
      );
    }
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={t('inventory.table.header.price')} />;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.original.price.toString());
      const formatted = getFormattedPrice(amount);

      return <div className="font-medium">{formatted}</div>;
    }
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={t('inventory.table.header.stock')} />;
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={t('inventory.table.header.status')} />;
    },
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.status === 'enabled' ? 'default' : 'secondary'}>
          {row.original.status === 'enabled' ? t('general.enabled') : t('general.disabled')}
        </Badge>
      );
    },
    enableSorting: false
  },
  {
    id: 'actions',
    header: () => <div></div>,
    cell: ({ row }) => <InventoryTableActions row={row} />
  }
];
