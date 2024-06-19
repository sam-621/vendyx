import { type FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { buttonVariants, Card, CardContent, CardHeader, CardTitle } from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { Dropzone } from '@/lib/components/forms';
import { t } from '@/lib/locales';
import { getFileListIntoArray } from '@/lib/utils';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { type ProductDetailsFormInput } from '../use-product-details-form';

export const AssetDetails: FC<Props> = ({ assets: defaultAssets }) => {
  const defaultPreviews = defaultAssets?.items.map(a => a.source ?? '');

  const { setValue } = useFormContext<ProductDetailsFormInput>();
  const [assets, setAssets] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(defaultPreviews ?? []);

  useEffect(() => {
    if (!assets.length) return;

    setPreviews([...(defaultPreviews ?? []), ...assets.map(file => URL.createObjectURL(file))]);
    setValue('assets', assets);
  }, [assets]);

  useEffect(() => {
    setValue('prevAssets', defaultAssets?.items.map(a => a.id) ?? []);
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('product-details.assets.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Empty state */}
        {!previews.length && <Dropzone setAssets={setAssets} className="h-40" />}

        {/* Filled state */}
        {previews.length > 0 && (
          <div className="flex gap-4">
            <img src={previews[0]} width={154} height={154} className="rounded-md" />
            <div className="flex flex-col justify-between">
              <div className="flex gap-2">
                {previews.slice(1, previews.length).map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    className="rounded-md h-[50px] w-[50px] object-cover"
                  />
                ))}
              </div>
              <div>
                <label
                  htmlFor="asset_id"
                  className={buttonVariants({
                    variant: 'outline',
                    class: 'flex gap-2 cursor-pointer'
                  })}
                >
                  <PlusIcon size={16} /> Add asset
                  <input
                    onChange={e => setAssets([...assets, ...getFileListIntoArray(e.target.files)])}
                    type="file"
                    multiple
                    name=""
                    id="asset_id"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

type Props = {
  assets?: CommonProductFragment['assets'];
};
