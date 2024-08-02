import { Trash2Icon } from 'lucide-react'
import { Button } from '../src'

function App() {
  return (
    <div className='flex flex-col gap-8'>
      <h1>Preview mode</h1>

      <section className='flex flex-col gap-6'>
        <h2>Buttons</h2>
        <div className='flex gap-4 items-center'>
          <Button>Default</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='link'>Link</Button>
          <Button className='bg-distinct'>Link</Button>

          <Button size='sm'>Small</Button>
          <Button size='icon'>
            <Trash2Icon size={16} />
          </Button>
          <Button size='lg'>Large</Button>

          <Button disabled>Disabled</Button>
        </div>
      </section>
    </div>
  )
}

export default App
