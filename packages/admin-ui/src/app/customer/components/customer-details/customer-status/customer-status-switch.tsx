import { type FC } from 'react';

import { Card, CardContent, Label, Switch } from '@ebloc/theme';

export const CustomerStatusSwitch: FC<Props> = ({ enabled }) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 mt-6">
        <Label className="text-base">Customer status</Label>
        <div className="flex items-center space-x-2">
          <Switch id="customer-status" defaultChecked={enabled} />
          <Label htmlFor="customer-status" className="cursor-pointer">
            Active
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

type Props = {
  enabled: boolean;
};
