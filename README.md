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

- [x] Inventory management
- [x] Order management
- [x] Storefront API
- [x] Customers
- [ ] Collections 🚧
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

### Local development
1. Add your database url in `default.config.ts` in core package
```ts
//...
db: {
  url: 'YOUR_POSTGRESQL_URL_CONNECTION'
},
//...
```

2. To populate your database (if needed), you should add your database url in `populate-db.ts` in the core package
```ts
const dataSource = await new DataSource({
  type: 'postgres',
  url: 'YOUR_POSTGRESQL_URL_CONNECTION',
  synchronize: false
}).initialize();
```

2. Run the following command
```bash
yarn db:populate
```

3. Run the api locally in the port 3000
```bash
yarn dev
```

4. Config urls in `constants.ts` file in admin-ui package adding the url for each environment
```ts
// This urls are just examples, you should add yours
const URLS: THashMap = {
  localhost: 'http://localhost:3000',
  development: 'https://ebloc-api-dev.com',
  production: ''
};
```

- If you are working with api and admin-ui packages, you should fill localhost url to test your api changes with frontend
- If you are working only with admin-ui, you should fill development url to not to have to run the api and instead of that use your api dev server

5. Run the admin-ui in the mode you need

Run in local mode (pointing to localhost url)
```bash
yarn local
```

Run in development mode (pointing to development url)
```bash
yarn dev
```

## Conventions
- File naming: kebab-case
- Git commit message: Conventional commit
- Promises or async await: async await
