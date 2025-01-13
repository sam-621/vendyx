import { ChevronsDownIcon } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/shared/components/ui/badge';
import { buttonVariants } from '@/shared/components/ui/button';

import { Feature } from './components/feature';
import { GithubIcon } from './components/github-icon';
import { Pricing } from './components/pricing';

// THIS IS A PROVISIONAL PAGE
export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden py-32 h-screen">
        <div className="container">
          <div className="magicpattern absolute inset-x-0 top-0 -z-10 flex h-full w-full items-center justify-center opacity-100" />
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="z-10 flex flex-col items-center gap-6 text-center">
              <svg
                width="91"
                height="64"
                viewBox="0 0 91 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M65.6914 24.3502L45.3947 44.3906V64L65.6914 44.3906V24.3502Z"
                  fill="black"
                />
                <path
                  d="M45.3947 44.3906L25.098 24.3502V44.3906L35.2464 54.1953L45.3947 64V44.3906Z"
                  fill="#222222"
                />
                <path d="M45.3947 44.3906L25.098 24.3502H65.6914L45.3947 44.3906Z" fill="#101010" />
                <path
                  d="M70.4928 19.6094V39.6498L90.3529 20.0404V0L80.4229 9.80471L70.4928 19.6094Z"
                  fill="black"
                />
                <path
                  d="M70.4928 19.6094H20.2967L0 0H90.3529L80.4229 9.80471L70.4928 19.6094Z"
                  fill="#101010"
                />
                <path
                  d="M20.2967 19.6094V39.6498L10.1483 29.8451L0 20.0404V0L20.2967 19.6094Z"
                  fill="#222222"
                />
              </svg>

              <Badge variant="outline">Vendyx</Badge>
              <div>
                <h1 className="mb-6 text-pretty text-2xl font-bold lg:text-5xl">
                  E-Commerce Platform
                </h1>
                <p className="text-muted-foreground lg:text-xl">
                  Vendyx is created to provide a open source solution to E-Commerce administration,
                  and also to simplify the way you manage a online store.
                </p>
              </div>
              <div className="mt-4 flex justify-center gap-2 items-center">
                <Link href="/login" className={buttonVariants()}>
                  Get Started
                </Link>
                <Link href="/#features" className={buttonVariants({ variant: 'outline' })}>
                  Learn more <ChevronsDownIcon className="ml-2 h-4" />
                </Link>
                <a href="https://github.com/sam-621/vendyx" target="_blank" rel="noreferrer">
                  <GithubIcon />
                </a>
              </div>

              <img src="/expo-3.png" alt="Vendyx" className="rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      <Feature />

      <Pricing />
    </>
  );
}
