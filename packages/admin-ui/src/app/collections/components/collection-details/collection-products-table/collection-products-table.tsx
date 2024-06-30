import { type FC } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
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
import { Trash2Icon } from 'lucide-react';

import { type CommonCollectionFragment } from '@/lib/ebloc/codegen/graphql';

export const CollectionProductsTable: FC<Props> = ({ products }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Products</CardTitle>
          <CardDescription>This collection contains 214 products</CardDescription>
        </div>
        <Button variant="secondary">Add products</Button>
      </CardHeader>

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
                    {product.assets.items.length && (
                      <img
                        src={product.assets.items[0].source}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded-md"
                      />
                    )}
                    <span>{product.name}</span>
                  </Link>
                </TableCell>
                <TableCell>{product.variants.items.reduce((acc, v) => acc + v.stock, 0)}</TableCell>
                <TableCell>{product.published}</TableCell>
                <TableCell>
                  <Trash2Icon className="cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

type Props = {
  products: CommonCollectionFragment['products']['items'];
};
