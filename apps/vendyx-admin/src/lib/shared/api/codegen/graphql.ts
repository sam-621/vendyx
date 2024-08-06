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

export type CreateShopInput = {
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type GenerateUserAccessTokenInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** A list of items with count, each result that expose a array of items should implement this interface */
export type List = {
  count: Scalars['Int']['output'];
  items: Array<Node>;
};

export type ListInput = {
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createShop: Shop;
  createUser: UserResult;
  generateUserAccessToken: UserAccessTokenResult;
  updateUser: UserResult;
};

export type MutationCreateShopArgs = {
  input: CreateShopInput;
  ownerId: Scalars['ID']['input'];
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationGenerateUserAccessTokenArgs = {
  input: GenerateUserAccessTokenInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

/** A node, each type that represents a entity should implement this interface */
export type Node = {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Query = {
  __typename?: 'Query';
  shop?: Maybe<Shop>;
  shops: ShopList;
  user?: Maybe<User>;
  validateAccessToken?: Maybe<Scalars['Boolean']['output']>;
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
};

export type UpdateShopInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
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
};

export type UserResult = {
  __typename?: 'UserResult';
  apiErrors: Array<UserErrorResult>;
  user?: Maybe<User>;
};

export type GetShopsQueryVariables = Exact<{ [key: string]: never }>;

export type GetShopsQuery = {
  __typename?: 'Query';
  shops: {
    __typename?: 'ShopList';
    count: number;
    items: Array<{
      __typename?: 'Shop';
      id: string;
      name: string;
      slug: string;
      owner: { __typename?: 'User'; id: string; email: string };
    }>;
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
  ownerId: Scalars['ID']['input'];
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

export const GetShopsDocument = new TypedDocumentString(`
    query getShops {
  shops {
    count
    items {
      id
      name
      slug
      owner {
        id
        email
      }
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
    mutation CreateShop($ownerId: ID!, $input: CreateShopInput!) {
  createShop(ownerId: $ownerId, input: $input) {
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
