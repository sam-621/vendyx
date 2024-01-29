import { FormInput } from '@/components/forms'
import { Logo } from '@/components/items'
import { useAuthenticate } from '@/core/admin'

import { Button } from '@vendyx/theme'
import { useState } from 'react'

export const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { authenticate, isPending } = useAuthenticate()

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
        <form
          onSubmit={(e) => {
            e.preventDefault()
            authenticate({ password, username })
          }}
          className='flex flex-col gap-6'
        >
          <FormInput
            onChange={(e) => setUsername(e.target.value)}
            label='Username'
            placeholder='admin'
          />
          <FormInput
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            placeholder='******'
          />
          <Button isLoading={isPending}>Login</Button>
        </form>
      </section>
    </div>
  )
}
