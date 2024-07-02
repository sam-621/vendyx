import { type FC } from 'react';
import { Link } from 'react-router-dom';

import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@ebloc/theme';
import { XIcon } from 'lucide-react';

import { CollectionKeys } from '@/app/collections/hooks';
import { useSetProductsInCollection } from '@/app/collections/hooks/use-set-products-in-collection';
import { type CommonCollectionFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { CollectionProductsSearcherDialog } from './collection-products-searcher/collection-products-searcher-dialog';

export const CollectionProductsTable: FC<Props> = ({ collection }) => {
  const { setProductsInCollection } = useSetProductsInCollection();
  const products = collection.products.items;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center space-y-0">
        <div>
          <CardTitle>Products</CardTitle>
          <CardDescription className="hidden lg:block">
            This collection contains {products.length}{' '}
            {products.length === 1 ? 'Product' : 'products'}
          </CardDescription>
        </div>
        <CollectionProductsSearcherDialog collection={collection} />
      </CardHeader>

      {Boolean(products.length) && (
        <CardContent className="flex flex-col gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Enabled</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Link
                      to={`/products/${product.slug ?? ''}`}
                      className="flex items-center gap-2 w-full"
                    >
                      {Boolean(product.assets.items.length) && (
                        <img
                          src={product.assets.items[0].source}
                          alt={product.name}
                          className="h-12 w-12 object-cover rounded-md"
                        />
                      )}
                      <span>{product.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    {product.variants.items.reduce((acc, v) => acc + v.stock, 0)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.published ? 'default' : 'secondary'}>
                      {product.published ? 'Published' : 'Disabled'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <XIcon
                      onClick={async () => {
                        const id = notification.loading(`Removing ${product.name} from collection`);

                        await setProductsInCollection(
                          collection.id,
                          products.filter(p => p.id !== product.id).map(p => p.id)
                        );
                        await queryClient.invalidateQueries({
                          queryKey: CollectionKeys.single(collection.id)
                        });

                        notification.dismiss(id);
                        notification.success(`"${product.name}" removed from collection`);
                      }}
                      size={16}
                      className="cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

type Props = {
  collection: CommonCollectionFragment;
};
