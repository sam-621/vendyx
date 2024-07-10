import { type FC, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn
} from '@ebloc/theme';
import { Edit2Icon } from 'lucide-react';

import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';

import { StatesForm } from './states-form/states-form';
import { StatesTable } from './states-table';

export const StatesDetails: FC<Props> = ({ states }) => {
  const [isEditing, setIsEditing] = useState(false);

  const hasNoStates = !states.length;

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center lg:pb-4">
        <div>
          <CardTitle>States</CardTitle>
          <CardDescription>States of your country</CardDescription>
        </div>
        <div className="flex gap-2 items-center">
          {!isEditing ? (
            <Button variant="secondary" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit2Icon className="mr-2" size={14} />
              Edit
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => setIsEditing(!isEditing)}>
              Cancel
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className={cn(hasNoStates && !isEditing && '!p-0')}>
        {!isEditing ? (
          <StatesTable states={states} />
        ) : (
          <StatesForm closeForm={() => setIsEditing(false)} states={states} />
        )}
      </CardContent>
    </Card>
  );
};

type Props = {
  states: CommonCountryFragment['states']['items'];
};
