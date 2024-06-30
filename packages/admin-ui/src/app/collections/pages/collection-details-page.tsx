import { useParams } from 'react-router-dom';

import { Button, Card, CardContent, CardHeader, CardTitle, Label, Switch } from '@ebloc/theme';

import { FormInput, FormTextarea, LogoLoader, PageLayout } from '@/lib/components';
import { formatDate } from '@/lib/utils';

import { useGetCollectionDetails } from '../hooks';

export const CollectionDetailsPage = () => {
  const { id } = useParams();

  const { collection, isLoading } = useGetCollectionDetails(id ?? '');

  if (isLoading) {
    return <LogoLoader />;
  }

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <PageLayout
      title={collection.name}
      subtitle={`Added at ${formatDate(new Date(collection.createdAt as string))}`}
      actions={<Button>Save</Button>}
      backUrl="/collections"
    >
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <div className="flex gap-4 w-full">
                <FormInput label="Name" placeholder="Electronics" />
                <FormInput label="Slug" placeholder="electronics" />
              </div>
              <FormTextarea label="Description" />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          <Card>
            <CardContent className="flex flex-col gap-4 mt-6">
              <Label className="text-base">Visibility</Label>
              <div className="flex items-center space-x-2">
                <Switch id="collection-status" />
                <Label htmlFor="collection-status" className="cursor-pointer">
                  Online store
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};
