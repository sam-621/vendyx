import { TimerIcon, ZapIcon, ZoomInIcon } from 'lucide-react';

export const Feature = () => {
  return (
    <section className="py-32" id="features">
      <div className="container">
        <p className="mb-4 text-sm text-muted-foreground lg:text-base">OUR FEATURES</p>
        <h2 className="text-pretty text-4xl font-bold lg:text-6xl">Why Choose Us?</h2>
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <TimerIcon className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Admin ui focused on simplicity</h3>
            <p className="leading-7 text-muted-foreground">
              Vendyx offers a unique and simple administration interface, inspired by the elegance
              and functionality of other popular e-commerce platforms.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <ZoomInIcon className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium"> Production ready</h3>
            <p className="leading-7 text-muted-foreground">
              Production ready integrations for popular payment gateways and shipping providers to
              you just pick up the ones you want and start selling.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <ZapIcon className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Your product</h3>
            <p className="leading-7 text-muted-foreground">
              Self host, fork, built on top of it, Vendyx is a open source solution for your next
              e-commerce platform
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
