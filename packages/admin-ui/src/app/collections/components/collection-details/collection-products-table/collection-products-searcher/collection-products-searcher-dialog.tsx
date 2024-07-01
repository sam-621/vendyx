import { type FC, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@ebloc/theme';

import { useGetProducts } from '@/app/products';
import { type CommonCollectionFragment } from '@/lib/ebloc/codegen/graphql';

import { ProductsListInCollection } from './products-list-in-collection';
import { useSetProductsInCollectionForm } from './use-set-products-in-collection-form';

export const CollectionProductsSearcherDialog: FC<Props> = ({ collection }) => {
  const productsInCollection = collection.products.items.map(p => p.id) ?? [];

  const { onDone } = useSetProductsInCollectionForm(collection);
  const { products } = useGetProducts();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>(productsInCollection);

  return (
    <Dialog open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button type="button" variant="secondary">
          Add products
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <DialogHeader className="px-6">
          <DialogTitle>Add products</DialogTitle>
          <DialogDescription>Update the products in the collection </DialogDescription>
        </DialogHeader>
        {!products?.length ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4 mx-6">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-xl font-medium tracking-tight">You have no products</h3>
              <p className="text-base text-muted-foreground">
                You can add products by clicking the button below
              </p>
              <Link to="/products/new">
                <Button className="mt-4">Add Product</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ProductsListInCollection
              productsInCollection={productsInCollection}
              allProducts={products}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
            <DialogFooter className="px-6">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={async () => {
                  setIsLoading(true);
                  await onDone(selectedIds, () => setIsOpen(false));
                  setIsLoading(false);
                }}
                isLoading={isLoading}
              >
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  collection: CommonCollectionFragment;
};
