import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Separator
} from '@vendyx/theme';
import { MoreHorizontalIcon, MoveLeftIcon, PlusIcon, Trash2Icon } from 'lucide-react';

import { FormInput, FormTextarea, SwitchContainer } from '@/components/forms';

export const CreateProductPage = () => {
  return (
    <div className="flex flex-col gap-8 w-[775px] mx-auto py-8">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <MoveLeftIcon />
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold">Add product</h1>
            <p className="text-muted-foreground text-sm font-normal">
              Create a product, add prices, content and more
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">Cancel</Button>
          <Button>Save</Button>
        </div>
      </header>
      <main className="flex flex-col gap-8">
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

        <Card>
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>Variants</CardTitle>
            <Button
              variant="ghost"
              className="text-distinct flex gap-2 hover:bg-distinct/10 hover:text-distinct"
            >
              <PlusIcon size={16} /> Add options
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Stateless */}
            {/* <div className='flex gap-4'>
              <FormInput label='Price' placeholder='$ 0.00' />
              <FormInput label='SKU' placeholder='SKU - 000' />
              <FormInput label='Quantity' placeholder='0' />
            </div> */}

            {/* Filled */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {/* Filling */}
                {/* <div className='flex items-end gap-4'>
                  <FormInput label='Options' placeholder='Size' />
                  <Button variant='ghost' size='icon'>
                    <Trash2Icon size={16} />
                  </Button>
                </div>
                <div className='flex flex-col gap-2'>
                  <Label>Values</Label>
                  <Input />
                  <Input />
                </div>
                <div>
                  <Button variant='outline'>Done</Button>
                </div> */}

                {/* Filled */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-4">
                    <Label>Size</Label>
                    <div className="flex gap-2">
                      <Badge variant="secondary">S</Badge>
                      <Badge variant="secondary">M</Badge>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost">
                    <MoreHorizontalIcon size={16} />
                  </Button>
                </div>
              </div>

              <div>
                <Separator />
                <Button variant="link" className="text-distinct hover:no-underline">
                  <PlusIcon size={16} /> Add option
                </Button>
                <Separator />
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span>S</span>
                  </div>
                  <div className="flex gap-2 items-end">
                    <FormInput label="Price" placeholder="$ 0.00" />
                    <FormInput label="SKU" placeholder="SKU - 000" />
                    <FormInput label="Quantity" placeholder="0" />
                    <Button variant="ghost" size="icon" className="p-2">
                      <Trash2Icon size={16} />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span>M</span>
                  </div>
                  <div className="flex gap-2 items-end">
                    <FormInput label="Price" placeholder="$ 0.00" />
                    <FormInput label="SKU" placeholder="SKU - 000" />
                    <FormInput label="Quantity" placeholder="0" />
                    <Button variant="ghost" size="icon" className="p-2">
                      <Trash2Icon size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
      </main>
    </div>
  );
};
