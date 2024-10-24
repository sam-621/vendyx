# Next 14 starter

A next 14 starter with my taste.

## Folder structure
The project contains mainly 2 folders

### App folder

App folders works as the `project specific code`, here is where all your project related code belongs to, contains all Next.js app directory and components that are only used in their routes.

### Lib folder

Lib folder works as the `internal library for the project`, here is where all my application modules belong to and also a `common` module

### Differences between app and lib folder
`App` folder contains the code that only works and make sense for your project.

And the `lib` folder contains the code that works for the category of your project, can be use it in another project with a similar focus.

For example imagine you are working on an E-Commerce project, E-Commerce have so many modules in common, cart, products, collections, checkout, wishlist, rating, etc. And that modules are going to be in your `lib folder`, actions, fetchers of data, components with functionality, hooks, utilities which together can create an E-Commerce and not necessary the E-Commerce that you are building.

In the `App folder` you will have your routes, layouts, specific markup components, and them will use your actions, fetchers of data, common components, hooks, utilities form lib folder to build the E-Commerce you are working for.

## Why?

### Keep it simple
Just 2 folders, 1 for your application code and other for your business related code, this divides your application in two slots the App and the lib that inject all business logic your project need

### Modular
With this approach, we get that app code can use lib code, but lib code cannot use app code, this is to maintain modularity and keep the two concepts separated. 

And with that if you are working on a new theme for your app you can be sure that you are not interfering with any business logic

And example of modularity could be a button that adds to cart a product `add-to-cart.tsx` this is a simple react component that looks like this

```tsx
export const AddToCart = ({ variantId, quantity }) => {
  // All add to cart business logic
}
```

so if your a building a new page for a product that needs a add to cart button, you don`t need to do more than just import the component and pass the props it needs