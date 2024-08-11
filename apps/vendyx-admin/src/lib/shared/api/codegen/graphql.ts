/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateOptionInput = {
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  values: Array<CreateOptionValueInput>;
};

export type CreateOptionValueInput = {
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

export type CreateProductInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type CreateShopInput = {
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateVariantInput = {
  comparisonPrice?: InputMaybe<Scalars['Int']['input']>;
  costPerUnit?: InputMaybe<Scalars['Int']['input']>;
  optionValues?: InputMaybe<Array<Scalars['ID']['input']>>;
  requiresShipping?: InputMaybe<Scalars['Boolean']['input']>;
  salePrice: Scalars['Int']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
};

export type GenerateUserAccessTokenInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** A list of items with count, each result that expose a array of items should implement this interface */
export type List = {
  count: Scalars['Int']['output'];
  items: Array<Node>;
  pageInfo: PageInfo;
};

export type ListInput = {
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOption: Option;
  createProduct: Product;
  createShop: Shop;
  createUser: UserResult;
  createVariant: Variant;
  generateUserAccessToken: UserAccessTokenResult;
  softRemoveOption: Option;
  softRemoveOptionValues: Scalars['Boolean']['output'];
  softRemoveProduct: Product;
  softRemoveVariant: Variant;
  updateOption: Option;
  updateProduct: Product;
  updateUser: UserResult;
  updateVariant: Variant;
};

export type MutationCreateOptionArgs = {
  input: CreateOptionInput;
  productId: Scalars['ID']['input'];
};

export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type MutationCreateShopArgs = {
  input: CreateShopInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationCreateVariantArgs = {
  input: CreateVariantInput;
  productId: Scalars['ID']['input'];
};

export type MutationGenerateUserAccessTokenArgs = {
  input: GenerateUserAccessTokenInput;
};

export type MutationSoftRemoveOptionArgs = {
  id: Scalars['ID']['input'];
};

export type MutationSoftRemoveOptionValuesArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type MutationSoftRemoveProductArgs = {
  id: Scalars['ID']['input'];
};

export type MutationSoftRemoveVariantArgs = {
  id: Scalars['ID']['input'];
};

export type MutationUpdateOptionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateOptionInput;
};

export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type MutationUpdateVariantArgs = {
  id: Scalars['ID']['input'];
  input: UpdateVariantInput;
};

/** A node, each type that represents a entity should implement this interface */
export type Node = {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Option = Node & {
  __typename?: 'Option';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
  values: Array<OptionValue>;
};

export type OptionList = List & {
  __typename?: 'OptionList';
  count: Scalars['Int']['output'];
  items: Array<Option>;
  pageInfo: PageInfo;
};

export type OptionValue = Node & {
  __typename?: 'OptionValue';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  option: Option;
  order: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  total: Scalars['Int']['output'];
};

export type Product = Node & {
  __typename?: 'Product';
  /**
   * Whether the product is archived or not.
   * Archived products are not exposed to the storefront API and are not visible in the admin ui by default.
   * Useful for products that are not available anymore but you don't want to lose their data.
   */
  archived: Scalars['Boolean']['output'];
  createdAt: Scalars['Date']['output'];
  /** The product's description */
  description?: Maybe<Scalars['String']['output']>;
  /**
   * Whether the products is enabled or not.
   * Not enabled products are not exposed to the storefront API but are visible in the admin ui.
   * Useful for products that are not published by now but they planned to be published in the future.
   */
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** The product's name */
  name: Scalars['String']['output'];
  options: Array<Option>;
  /** A human-friendly unique string for the Product automatically generated from its name */
  slug: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  variants: VariantList;
};

export type ProductVariantsArgs = {
  input?: InputMaybe<ListInput>;
};

export type ProductFilters = {
  achived?: InputMaybe<BooleanFilter>;
  enabled?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
};

export type ProductList = List & {
  __typename?: 'ProductList';
  count: Scalars['Int']['output'];
  items: Array<Product>;
  pageInfo: PageInfo;
};

export type ProductListInput = {
  /** Filters to apply */
  filters?: InputMaybe<ProductFilters>;
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  product?: Maybe<Product>;
  products: ProductList;
  shop?: Maybe<Shop>;
  shops: ShopList;
  user?: Maybe<User>;
  validateAccessToken?: Maybe<Scalars['Boolean']['output']>;
  variant?: Maybe<Variant>;
  variants: VariantList;
};

export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryProductsArgs = {
  input?: InputMaybe<ProductListInput>;
};

export type QueryShopArgs = {
  slug: Scalars['String']['input'];
};

export type QueryShopsArgs = {
  input?: InputMaybe<ListInput>;
};

export type QueryUserArgs = {
  accessToken: Scalars['String']['input'];
};

export type QueryVariantArgs = {
  id: Scalars['ID']['input'];
};

export type QueryVariantsArgs = {
  input?: InputMaybe<ListInput>;
};

export type Shop = Node & {
  __typename?: 'Shop';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The shop's name */
  name: Scalars['String']['output'];
  /** The shop's owner */
  owner: User;
  /** The shop's slug */
  slug: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type ShopList = List & {
  __typename?: 'ShopList';
  count: Scalars['Int']['output'];
  items: Array<Shop>;
  pageInfo: PageInfo;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOptionInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  values?: InputMaybe<Array<UpdateOptionValueInput>>;
};

export type UpdateOptionValueInput = {
  /**
   * If pressent, the value will be updated.
   * If not, the value will be created and add it to the option
   */
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateShopInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVariantInput = {
  comparisonPrice?: InputMaybe<Scalars['Int']['input']>;
  costPerUnit?: InputMaybe<Scalars['Int']['input']>;
  optionValues?: InputMaybe<Array<Scalars['ID']['input']>>;
  requiresShipping?: InputMaybe<Scalars['Boolean']['input']>;
  salePrice?: InputMaybe<Scalars['Int']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
};

export type User = Node & {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  /** The user's email (unique) */
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The user's shops */
  shops: ShopList;
  updatedAt: Scalars['Date']['output'];
};

export type UserAccessTokenResult = {
  __typename?: 'UserAccessTokenResult';
  accessToken?: Maybe<Scalars['String']['output']>;
  apiErrors: Array<UserErrorResult>;
};

export enum UserErrorCode {
  EmailAlreadyExists = 'EMAIL_ALREADY_EXISTS',
  InvalidCredentials = 'INVALID_CREDENTIALS'
}

export type UserErrorResult = {
  __typename?: 'UserErrorResult';
  code: UserErrorCode;
  message: Scalars['String']['output'];
};

export type UserList = List & {
  __typename?: 'UserList';
  count: Scalars['Int']['output'];
  items: Array<User>;
  pageInfo: PageInfo;
};

export type UserResult = {
  __typename?: 'UserResult';
  apiErrors: Array<UserErrorResult>;
  user?: Maybe<User>;
};

/**
 * A variant is a specific version of a product.
 * For example, a product can have a variant with a specific color, size, or material.
 */
export type Variant = Node & {
  __typename?: 'Variant';
  /**
   * The variant's comparison price.
   * Useful when you want to mark a variant as on sale. Comparison price should be higher than the sale price.
   */
  comparisonPrice?: Maybe<Scalars['Int']['output']>;
  /**
   * The variant's cost per unit.
   * Useful when you want to calculate the profit of a variant.
   */
  costPerUnit?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  optionValues: Array<OptionValue>;
  product: Product;
  /**
   * The variant's weight
   * Useful when you want to indicate that the variant needs shipping.
   */
  requiresShipping: Scalars['Boolean']['output'];
  /** The variant's sale price */
  salePrice: Scalars['Int']['output'];
  /** The variant's SKU */
  sku?: Maybe<Scalars['String']['output']>;
  /** The variant's stock */
  stock: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type VariantList = List & {
  __typename?: 'VariantList';
  count: Scalars['Int']['output'];
  items: Array<Variant>;
  pageInfo: PageInfo;
};

export type CreateOptionMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  input: CreateOptionInput;
}>;

export type CreateOptionMutation = {
  __typename?: 'Mutation';
  createOption: {
    __typename?: 'Option';
    id: string;
    name: string;
    values: Array<{ __typename?: 'OptionValue'; id: string; name: string }>;
  };
};

export type UpdateOptionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateOptionInput;
}>;

export type UpdateOptionMutation = {
  __typename?: 'Mutation';
  updateOption: {
    __typename?: 'Option';
    id: string;
    name: string;
    values: Array<{ __typename?: 'OptionValue'; id: string; name: string }>;
  };
};

export type RemoveOptionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RemoveOptionMutation = {
  __typename?: 'Mutation';
  softRemoveOption: { __typename?: 'Option'; id: string };
};

export type CommonProductFragment = {
  __typename?: 'Product';
  id: string;
  createdAt: any;
  name: string;
  slug: string;
  description?: string | null;
  enabled: boolean;
  variants: {
    __typename?: 'VariantList';
    items: Array<{
      __typename?: 'Variant';
      id: string;
      salePrice: number;
      sku?: string | null;
      stock: number;
      comparisonPrice?: number | null;
      costPerUnit?: number | null;
      requiresShipping: boolean;
      optionValues: Array<{ __typename?: 'OptionValue'; id: string; name: string }>;
    }>;
  };
  options: Array<{
    __typename?: 'Option';
    id: string;
    name: string;
    values: Array<{ __typename?: 'OptionValue'; id: string; name: string }>;
  }>;
} & { ' $fragmentName'?: 'CommonProductFragment' };

export type GetProductsQueryVariables = Exact<{
  input?: InputMaybe<ProductListInput>;
}>;

export type GetProductsQuery = {
  __typename?: 'Query';
  products: {
    __typename?: 'ProductList';
    count: number;
    pageInfo: { __typename?: 'PageInfo'; total: number };
    items: Array<{
      __typename?: 'Product';
      id: string;
      createdAt: any;
      name: string;
      slug: string;
      enabled: boolean;
      variants: {
        __typename?: 'VariantList';
        items: Array<{
          __typename?: 'Variant';
          id: string;
          sku?: string | null;
          stock: number;
          salePrice: number;
        }>;
      };
    }>;
  };
};

export type GetProductQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type GetProductQuery = {
  __typename?: 'Query';
  product?:
    | ({ __typename?: 'Product' } & {
        ' $fragmentRefs'?: { CommonProductFragment: CommonProductFragment };
      })
    | null;
};

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;

export type CreateProductMutation = {
  __typename?: 'Mutation';
  createProduct: { __typename?: 'Product'; id: string };
};

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
}>;

export type UpdateProductMutation = {
  __typename?: 'Mutation';
  updateProduct: { __typename?: 'Product'; id: string };
};

export type RemoveProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RemoveProductMutation = {
  __typename?: 'Mutation';
  softRemoveProduct: { __typename?: 'Product'; id: string };
};

export type GetShopsQueryVariables = Exact<{ [key: string]: never }>;

export type GetShopsQuery = {
  __typename?: 'Query';
  shops: {
    __typename?: 'ShopList';
    count: number;
    items: Array<{ __typename?: 'Shop'; id: string; slug: string }>;
  };
};

export type ShopQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type ShopQuery = {
  __typename?: 'Query';
  shop?: { __typename?: 'Shop'; id: string; name: string; slug: string } | null;
};

export type CreateShopMutationVariables = Exact<{
  input: CreateShopInput;
}>;

export type CreateShopMutation = {
  __typename?: 'Mutation';
  createShop: { __typename?: 'Shop'; id: string; name: string; slug: string };
};

export type GetUserQueryVariables = Exact<{
  accessToken: Scalars['String']['input'];
}>;

export type GetUserQuery = {
  __typename?: 'Query';
  user?: { __typename?: 'User'; id: string } | null;
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'UserResult';
    apiErrors: Array<{ __typename?: 'UserErrorResult'; code: UserErrorCode; message: string }>;
    user?: { __typename?: 'User'; id: string } | null;
  };
};

export type GenerateAccessTokenMutationVariables = Exact<{
  input: GenerateUserAccessTokenInput;
}>;

export type GenerateAccessTokenMutation = {
  __typename?: 'Mutation';
  generateUserAccessToken: {
    __typename?: 'UserAccessTokenResult';
    accessToken?: string | null;
    apiErrors: Array<{ __typename?: 'UserErrorResult'; code: UserErrorCode; message: string }>;
  };
};

export type ValidateAccessTokenQueryVariables = Exact<{ [key: string]: never }>;

export type ValidateAccessTokenQuery = {
  __typename?: 'Query';
  validateAccessToken?: boolean | null;
};

export type CreateVariantMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  input: CreateVariantInput;
}>;

export type CreateVariantMutation = {
  __typename?: 'Mutation';
  createVariant: { __typename?: 'Variant'; id: string };
};

export type UpdateVariantMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateVariantInput;
}>;

export type UpdateVariantMutation = {
  __typename?: 'Mutation';
  updateVariant: { __typename?: 'Variant'; id: string };
};

export type SoftRemoveVariantMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type SoftRemoveVariantMutation = {
  __typename?: 'Mutation';
  softRemoveVariant: { __typename?: 'Variant'; id: string };
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(
    private value: string,
    public __meta__?: Record<string, any>
  ) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const CommonProductFragmentDoc = new TypedDocumentString(
  `
    fragment CommonProduct on Product {
  id
  createdAt
  name
  slug
  description
  enabled
  variants {
    items {
      id
      salePrice
      sku
      stock
      comparisonPrice
      costPerUnit
      requiresShipping
      optionValues {
        id
        name
      }
    }
  }
  options {
    id
    name
    values {
      id
      name
    }
  }
}
    `,
  { fragmentName: 'CommonProduct' }
) as unknown as TypedDocumentString<CommonProductFragment, unknown>;
export const CreateOptionDocument = new TypedDocumentString(`
    mutation CreateOption($productId: ID!, $input: CreateOptionInput!) {
  createOption(productId: $productId, input: $input) {
    id
    name
    values {
      id
      name
    }
  }
}
    `) as unknown as TypedDocumentString<CreateOptionMutation, CreateOptionMutationVariables>;
export const UpdateOptionDocument = new TypedDocumentString(`
    mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {
  updateOption(id: $id, input: $input) {
    id
    name
    values {
      id
      name
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOptionMutation, UpdateOptionMutationVariables>;
export const RemoveOptionDocument = new TypedDocumentString(`
    mutation RemoveOption($id: ID!) {
  softRemoveOption(id: $id) {
    id
  }
}
    `) as unknown as TypedDocumentString<RemoveOptionMutation, RemoveOptionMutationVariables>;
export const GetProductsDocument = new TypedDocumentString(`
    query GetProducts($input: ProductListInput) {
  products(input: $input) {
    count
    pageInfo {
      total
    }
    items {
      id
      createdAt
      name
      slug
      enabled
      variants {
        items {
          id
          sku
          stock
          salePrice
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductDocument = new TypedDocumentString(`
    query GetProduct($id: ID) {
  product(id: $id) {
    ...CommonProduct
  }
}
    fragment CommonProduct on Product {
  id
  createdAt
  name
  slug
  description
  enabled
  variants {
    items {
      id
      salePrice
      sku
      stock
      comparisonPrice
      costPerUnit
      requiresShipping
      optionValues {
        id
        name
      }
    }
  }
  options {
    id
    name
    values {
      id
      name
    }
  }
}`) as unknown as TypedDocumentString<GetProductQuery, GetProductQueryVariables>;
export const CreateProductDocument = new TypedDocumentString(`
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = new TypedDocumentString(`
    mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
  updateProduct(id: $id, input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<UpdateProductMutation, UpdateProductMutationVariables>;
export const RemoveProductDocument = new TypedDocumentString(`
    mutation RemoveProduct($id: ID!) {
  softRemoveProduct(id: $id) {
    id
  }
}
    `) as unknown as TypedDocumentString<RemoveProductMutation, RemoveProductMutationVariables>;
export const GetShopsDocument = new TypedDocumentString(`
    query getShops {
  shops {
    count
    items {
      id
      slug
    }
  }
}
    `) as unknown as TypedDocumentString<GetShopsQuery, GetShopsQueryVariables>;
export const ShopDocument = new TypedDocumentString(`
    query Shop($slug: String!) {
  shop(slug: $slug) {
    id
    name
    slug
  }
}
    `) as unknown as TypedDocumentString<ShopQuery, ShopQueryVariables>;
export const CreateShopDocument = new TypedDocumentString(`
    mutation CreateShop($input: CreateShopInput!) {
  createShop(input: $input) {
    id
    name
    slug
  }
}
    `) as unknown as TypedDocumentString<CreateShopMutation, CreateShopMutationVariables>;
export const GetUserDocument = new TypedDocumentString(`
    query GetUser($accessToken: String!) {
  user(accessToken: $accessToken) {
    id
  }
}
    `) as unknown as TypedDocumentString<GetUserQuery, GetUserQueryVariables>;
export const CreateUserDocument = new TypedDocumentString(`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    apiErrors {
      code
      message
    }
    user {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateUserMutation, CreateUserMutationVariables>;
export const GenerateAccessTokenDocument = new TypedDocumentString(`
    mutation GenerateAccessToken($input: GenerateUserAccessTokenInput!) {
  generateUserAccessToken(input: $input) {
    apiErrors {
      code
      message
    }
    accessToken
  }
}
    `) as unknown as TypedDocumentString<
  GenerateAccessTokenMutation,
  GenerateAccessTokenMutationVariables
>;
export const ValidateAccessTokenDocument = new TypedDocumentString(`
    query ValidateAccessToken {
  validateAccessToken
}
    `) as unknown as TypedDocumentString<
  ValidateAccessTokenQuery,
  ValidateAccessTokenQueryVariables
>;
export const CreateVariantDocument = new TypedDocumentString(`
    mutation CreateVariant($productId: ID!, $input: CreateVariantInput!) {
  createVariant(productId: $productId, input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreateVariantMutation, CreateVariantMutationVariables>;
export const UpdateVariantDocument = new TypedDocumentString(`
    mutation UpdateVariant($id: ID!, $input: UpdateVariantInput!) {
  updateVariant(id: $id, input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<UpdateVariantMutation, UpdateVariantMutationVariables>;
export const SoftRemoveVariantDocument = new TypedDocumentString(`
    mutation SoftRemoveVariant($id: ID!) {
  softRemoveVariant(id: $id) {
    id
  }
}
    `) as unknown as TypedDocumentString<
  SoftRemoveVariantMutation,
  SoftRemoveVariantMutationVariables
>;
