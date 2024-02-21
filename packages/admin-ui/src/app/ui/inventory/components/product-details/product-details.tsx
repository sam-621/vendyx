import { Button, Card, CardContent, CardHeader, CardTitle } from '@vendyx/theme';
import { PlusIcon } from 'lucide-react';

import { FormInput, FormTextarea, SwitchContainer } from '@/components/forms';

import { VariantDetails } from './variant-details';

export const ProductDetails = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-4 w-full">
            <FormInput label="Name" placeholder="Black T-shirt" />
            <FormInput label="Slug" placeholder="black-t-shirt" />
          </div>
          <FormTextarea label="Description" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assets</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Empty state */}
          {/* <Dropzone className='h-40' /> */}

          {/* Filled state */}
          <div className="flex gap-4">
            <img
              src="https://res-console.cloudinary.com/dnvp4s8pe/media_explorer_thumbnails/523a8b864942714d4d9a8659907733f6/detailed"
              width={154}
              height={154}
              className="rounded-md"
            />
            <div className="flex flex-col justify-between">
              <div className="flex gap-2">
                <img
                  src="https://res-console.cloudinary.com/dnvp4s8pe/media_explorer_thumbnails/523a8b864942714d4d9a8659907733f6/detailed"
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <img
                  src="https://res-console.cloudinary.com/dnvp4s8pe/media_explorer_thumbnails/523a8b864942714d4d9a8659907733f6/detailed"
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <img
                  src="https://res-console.cloudinary.com/dnvp4s8pe/media_explorer_thumbnails/523a8b864942714d4d9a8659907733f6/detailed"
                  width={50}
                  height={50}
                  className="rounded-md"
                />
              </div>
              <div>
                <Button variant="outline" className="flex gap-2">
                  <PlusIcon size={16} /> Add asset
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <VariantDetails />

      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SwitchContainer
            title="Display on storefront"
            description="Decide if the product shows in your storefront or not"
          />
          <SwitchContainer
            title="Online product"
            description="Check if this is a online product and does not need to be shipped"
          />
        </CardContent>
      </Card>
    </>
  );
};
