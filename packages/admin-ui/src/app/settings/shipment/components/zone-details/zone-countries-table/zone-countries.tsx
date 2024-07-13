import { Button, Card, CardHeader, CardTitle } from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

export const ZoneCountries = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>Countries</CardTitle>
        <Button className="text-distinct" variant="link" type="button">
          <PlusIcon size={16} />
          Add countries
        </Button>
      </CardHeader>
    </Card>
  );
};
