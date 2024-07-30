import { Logo } from '@/lib/shared';

import { LoginForm } from '../components/login-form';

export const LoginPage = () => {
  return (
    <div className="h-screen grid grid-cols-2">
      <section className="flex flex-col justify-between bg-black p-10">
        <header>
          <Logo />
        </header>
        <footer>
          <blockquote className="flex flex-col gap-2">
            <p className="text-lg text-white">
              {`A functional and scalable minimal e-commerce admin that can be adjusted to any user's
            requirement. Providing a full featured solution but focused on simplicity at the same
            time.`}
            </p>
          </blockquote>
        </footer>
      </section>
      <section className="flex flex-col justify-center mx-auto w-[335px] gap-6">
        <div className="mx-auto">
          <h1 className="text-center h3">Login into ebloc</h1>
          <p className="text-center muted">Enter your username and password</p>
        </div>
        <LoginForm />
      </section>
    </div>
  );
};
