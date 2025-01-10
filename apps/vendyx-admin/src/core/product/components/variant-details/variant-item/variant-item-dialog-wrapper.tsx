import { type FC, useEffect, useState } from 'react';

import { useVariantContext, type VariantContext } from '@/core/product/contexts/variant.context';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

export const VariantItemDialogWrapper: FC<Props> = ({ variant, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { variants, updateVariants } = useVariantContext();

  const [price, setPrice] = useState(variant.price);
  const [comparisonPrice, setComparisonPrice] = useState(variant.comparisonPrice);
  const [stock, setStock] = useState(variant.stock);
  const [sku, setSku] = useState(variant.sku);
  const [requiresShipping, setRequiresShipping] = useState(variant.requiresShipping);

  useEffect(() => {
    setPrice(variant.price);
    setComparisonPrice(variant.comparisonPrice);
    setStock(variant.stock);
    setSku(variant.sku);
    setRequiresShipping(variant.requiresShipping);
  }, [variant]);

  const onSave = () => {
    updateVariants(
      variants.map(v =>
        v.id === variant.id ? { ...v, price, comparisonPrice, stock, sku, requiresShipping } : v
      )
    );
    setIsOpen(false);
  };

  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{variant.values.map(v => v.name).join(' / ')}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Sale price</Label>
              <Input
                isPrice
                value={price}
                onChange={e => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Comparison price</Label>
              <Input
                value={comparisonPrice}
                onChange={e => {
                  setComparisonPrice(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                value={stock}
                onChange={e => {
                  setStock(Number(e.target.value));
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>SKU</Label>
              <Input
                value={sku}
                onChange={e => {
                  setSku(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 w-full">
            <Checkbox
              id="requires_shipping_checkbox"
              checked={requiresShipping}
              onCheckedChange={checked => setRequiresShipping(Boolean(checked))}
            />
            <Label htmlFor="requires_shipping_checkbox">This product requires shipping</Label>
          </div>
          <div className="text-right">
            <Button type="button" onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  variant: VariantContext['variants'][0];
  children: React.ReactNode;
};
