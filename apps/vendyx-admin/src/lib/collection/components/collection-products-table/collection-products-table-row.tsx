import { type FC } from 'react';

import Link from 'next/link';

import { type CommonCollectionProductFragment } from '@/api/types';
import { Badge, TableCell, TableRow } from '@/lib/shared/components';

export const CollectionProductsTableRow: FC<Props> = ({ product, base }) => {
  return (
    <TableRow key={product.id}>
      <TableCell>
        <Link href={`${base}/orders/${product.id}`} className="w-full hover:underline">
          {product.name}
        </Link>
      </TableCell>
      <TableCell className="text-nowrap">
        <Badge variant={product.enabled ? 'default' : 'secondary'}>
          {product.enabled ? 'Enabled' : 'Disabled'}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

type Props = {
  product: CommonCollectionProductFragment;
  base: string;
};
