import { Logo } from '@/app/components';
import { t } from '@/lib/locales';

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
            <p className="text-lg text-white">{t('login.testimony.text')}</p>
          </blockquote>
        </footer>
      </section>
      <section className="flex flex-col justify-center mx-auto w-[335px] gap-6">
        <div className="mx-auto">
          <h1 className="text-center text-2xl font-semibold tracking-tight">
            {t('login.form.title')}
          </h1>
          <p className="text-center text-sm text-muted-foreground">{t('login.form.subtitle')}</p>
        </div>
        <LoginForm />
      </section>
    </div>
  );
};
