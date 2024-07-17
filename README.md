# Ebloc

A functional and scalable minimal e-commerce admin that can be adjusted to any user's requirement.

## Why choose Ebloc?

We know there are so many other options for e-commerce platform, so why choose us?

🎨 **Admin ui focused on simplicity:** Ebloc offers a unique and simple administration interface, inspired by the elegance and functionality of Shopify.

🟢 **Production ready:** Ebloc offers production ready integrations for payments, storage and shipments to you just pick up the ones you want and start selling.

📦 **Your product:** Self host, fork, built on top of it, Ebloc is a open source solution for your next e-commerce platform

## Roadmap

> [!NOTE]
> **Ebloc is in development. Check marks indicate completed MVP sections; more features will be added.**

- [x] Products
- [x] Orders
- [x] Customers
- [x] Collections
- [x] Storefront API
- [x] Shipments
- [x] Payments
- [ ] Coupons 🚧
- [ ] Roles
- [ ] Internationalization
- [ ] Extensible by code

## Tech stack

- [Typeorm](https://typeorm.io/) and [Postgresql](https://postgresql.org/) for database management
- [Typescript](https://www.typescriptlang.org/) as the main language
- [NestJS](https://nestjs.com/) as backend framework
- [React](https://react.dev/) as frontend framework
- [Lerna](https://lerna.js.org/) for monorepo management

## Theme

- Components: [shadcn](https://ui.shadcn.com/)
- Icons: [lucide icons](https://lucide.dev/)
- Guide style: [TailwindCSS](https://tailwindcss.com/)

## Setup

> [!NOTE]
> **Before running anything, you should have a postgresql database instance available.**

1. Clone this repo
2. `yarn`
3. Add env variables in server package
4. `yarn build`
5. `yarn start`

## Conventions

- File naming: kebab-case
- Git commit message: Conventional commit
- Promises or async await: async await
