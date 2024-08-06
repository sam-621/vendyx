import { useState } from 'react';

import { PlusIcon } from 'lucide-react';

import { Button, Card, CardContent, CardHeader } from '@/lib/shared/components';

import { OptionDetails } from '../option-details';

export const VariantDetails = () => {
  const [isOptionFormOpen, setIsOptionFormOpen] = useState(false);
  return (
    <Card>
      <CardHeader>Variant</CardHeader>
      <CardContent>
        {!isOptionFormOpen ? (
          <Button
            onClick={() => setIsOptionFormOpen(true)}
            className="text-distinct p-0"
            variant="link"
            type="button"
          >
            <PlusIcon size={16} />
            Add options
          </Button>
        ) : (
          <OptionDetails />
        )}
      </CardContent>
    </Card>
  );
};
