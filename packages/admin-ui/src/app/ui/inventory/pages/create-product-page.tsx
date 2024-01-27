import { FormInput } from '@/components/forms'
import { FormTextarea } from '@/components/forms/form-textarea'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@vendyx/theme'
import { ArrowLeftIcon } from 'lucide-react'

export const CreateProductPage = () => {
  return (
    <div className='flex flex-col gap-8 w-[775px] mx-auto py-8'>
      <header className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <ArrowLeftIcon />
          <div className='flex flex-col gap-1'>
            <h1 className='text-xl font-semibold'>Add product</h1>
            <p className='text-muted-foreground text-sm font-normal'>
              Create a product, add prices, content and more
            </p>
          </div>
        </div>
        <div className='flex gap-3'>
          <Button variant='secondary'>Cancel</Button>
          <Button>Save</Button>
        </div>
      </header>
      <main>
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
          </CardHeader>

          <CardContent className='flex flex-col gap-4'>
            <div className='flex gap-4 w-full'>
              <FormInput label='Name' />
              <FormInput label='Slug' />
            </div>
            <FormTextarea label='Description' />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
