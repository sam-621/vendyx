import { type FC } from 'react';

import { Button } from '@ebloc/theme';

import { useMarkOrderAsDeliveredForm } from './use-mark-order-as-delivered-form';

export const MarkOrderAsDeliveredButton: FC<Props> = ({ id }) => {
  const { onSubmit, isLoading } = useMarkOrderAsDeliveredForm();

  return (
    <Button type="button" onClick={async () => await onSubmit(id)} isLoading={isLoading}>
      Complete order
    </Button>
  );
};

type Props = {
  id: string;
};
