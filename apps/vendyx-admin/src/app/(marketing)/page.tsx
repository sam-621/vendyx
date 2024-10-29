import { MoveRightIcon } from 'lucide-react';
import Link from 'next/link';

import { Button, LightLogo } from '@/lib/shared/components';

import { PricingButton } from './components/pricing-button';
import { TablePrice } from './components/table-price';
import { GithubIcon } from './components';

// THIS IS A PROVISIONAL PAGE
export default function Home() {
  return (
    <div className="flex flex-col my-14">
      <div className="flex flex-col gap-28">
        <header className="flex items-center justify-between fade-in-up">
          <div className="flex items-center gap-2">
            <LightLogo />
            <h2 className="font-medium text-3xl">Vendyx</h2>
          </div>
          <div className="flex items-center gap-3">
            <PricingButton />
            <Link href="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
            <Link href="https://github.com/sam-621/vendyx" target="_blank">
              <GithubIcon />
            </Link>
          </div>
        </header>
        <section className="flex flex-col gap-8 fade-in-up h-[calc(100vh-(40px+56px+112px))]">
          <Link
            href="https://github.com/sam-621/vendyx?tab=readme-ov-file#roadmap"
            target="_blank"
            className="py-2 px-4 bg-distinct/20 flex items-center gap-2 text-distinct rounded-full w-fit mx-auto text-sm"
          >
            <div className="w-[10px] h-[10px] bg-distinct rounded-full"></div> View roadmap
          </Link>
          <h1 className="font-medium text-7xl text-center fade-in-up">
            A functional and scalable minimal <br /> E-Commerce admin
          </h1>
          <p className="text-xl text-muted-foreground text-center w-2/3 mx-auto fade-in-up">
            Vendyx is created to provide a open source solution to e-commerce administration, and
            also to simplify the way you manage a e-commerce.
          </p>
          <div className="text-center fade-in-up">
            <Link href="/signup">
              <Button size="lg" className="rounded-full">
                Get started <MoveRightIcon size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <section className="flex flex-col gap-20">
        <div>
          <h2 className="text-[40px] font-medium text-center">Pricing</h2>
          <p className="text-center text-xl text-muted-foreground">
            Simple. Transparent. And Accessible
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <TablePrice title="Basic" description="For small business." price={19} />
          <TablePrice
            title="Essential"
            description="For business with growing demand."
            price={59}
          />
          <TablePrice
            title="Enterprise"
            description="Dedicated support and infrastructure for your business."
          />
        </div>
      </section>
    </div>
  );
}
