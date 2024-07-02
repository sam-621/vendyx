import { type FC, useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@ebloc/theme';

import { formatDate } from '@/lib/utils';

import { type DropzoneAsset } from '../forms';

export const AssetPreview: FC<Props> = ({ source, asset, onActionClick, isOpen, setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{asset ? asset.name : 'Asset preview'}</DialogTitle>
          <DialogDescription>
            Created at {formatDate(new Date(asset ? asset.createdAt : Date.now()))}
          </DialogDescription>
        </DialogHeader>
        <div>
          <img src={source} alt="Asset Preview" />
        </div>
        {asset && (
          <DialogFooter>
            <Button
              className="w-full"
              isLoading={isLoading}
              onClick={async () => {
                setIsLoading(true);

                await onActionClick(asset);

                setIsLoading(false);
                setIsOpen(false);
              }}
            >
              Mark as default
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onActionClick: (asset: DropzoneAsset) => Promise<void>;
  source: string;
  asset?: DropzoneAsset;
};
