import { type FC } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@ebloc/theme';

import { type EblocAsset } from '@/lib/ebloc/rest';
import { formatDate } from '@/lib/utils';

export const AssetPreview: FC<Props> = ({ source, asset, isOpen, setIsOpen }) => {
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
        {/* <DialogFooter>
          Footer
          <DialogClose>Close</DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  source: string;
  asset?: Pick<EblocAsset, 'source' | 'id' | 'name' | 'createdAt'>;
};
