import { type FC, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input
} from '@ebloc/theme';

import { useGetProducts } from '@/app/products';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';
import { type CommonCollectionFragment } from '@/lib/ebloc/codegen/graphql';

import { useSetProductsInCollectionForm } from './use-set-products-in-collection-form';

export const CollectionProductsSearcherDialog: FC<Props> = ({ collection }) => {
  const productsInCollection = collection.products.items.map(p => p.id) ?? [];

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>(productsInCollection);

  const { onDone } = useSetProductsInCollectionForm(collection);
  const { products } = useGetProducts();

  const handleCheck = (id: string) => (checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(p => p !== id));
    }
  };

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
        <div className="flex flex-col gap-6">
          <div className="px-6">
            <Input placeholder="Search products" />
          </div>
          <div>
            {products?.length === 0 ? (
              <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-xl font-medium tracking-tight">You have no products</h3>
                  <p className="text-base text-muted-foreground">
                    You can start selling as soon as you add a product.
                  </p>
                  <Link to="/products/new">
                    <Button className="mt-4">Add Product</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="divide-y border-y">
                {products?.map(p => (
                  <label
                    key={p.id}
                    htmlFor={`product-${p.id}`}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-muted cursor-pointer"
                  >
                    <Checkbox
                      id={`product-${p.id}`}
                      defaultChecked={productsInCollection.includes(p.id)}
                      onCheckedChange={handleCheck(p.id)}
                    />
                    <div className="flex items-center gap-2 w-full">
                      <img
                        src={
                          p.assets.items.length ? p.assets.items[0].source : DEFAULT_PRODUCT_IMAGE
                        }
                        alt={p.name}
                        className="h-12 w-12 object-cover rounded-md"
                      />
                      <span>{p.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
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
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  collection: CommonCollectionFragment;
};
