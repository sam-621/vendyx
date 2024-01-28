import { FormInput } from '@/components/forms'
import { Logo } from '@/components/items'
import { AuthenticateMutation } from '@/lib/vendyx/mutations/admin.mutation'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@vendyx/theme'
import request from 'graphql-request'

export const LoginPage = () => {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { products } = await request('http://localhost:3000/admin-api', AuthenticateMutation)
      return products
    },
  })

  console.log({
    data,
  })

  return (
    <div className='h-screen grid grid-cols-2'>
      <section className='flex flex-col justify-between bg-black p-10'>
        <header>
          <Logo />
        </header>
        <footer>
          <blockquote className='flex flex-col gap-2'>
            <p className='text-lg text-white'>
              A functional and scalable minimal e-commerce admin that can be adjusted to any
              user&apos;s requirement. Providing a full featured solution but focused on simplicity
              at the same time
            </p>
          </blockquote>
        </footer>
      </section>
      <section className='flex flex-col justify-center mx-auto w-[335px] gap-6'>
        <div className='mx-auto'>
          <h1 className='text-center text-2xl font-semibold tracking-tight'>Login into Vendyx</h1>
          <p className='text-center text-sm text-muted-foreground'>
            Enter your username and password
          </p>
        </div>
        <div className='flex flex-col gap-6'>
          <FormInput label='Username' placeholder='admin' />
          <FormInput label='Password' placeholder='******' />
          <Button>Login</Button>
        </div>
      </section>
    </div>
  )
}
