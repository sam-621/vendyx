/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetProducts($input: ListInput) {\n    products(input: $input) {\n      count\n      items {\n        id\n        createdAt\n        updatedAt\n        name\n        slug\n        description\n        onlineOnly\n        published\n        variants(input: { take: 0 }) {\n          count\n          items {\n            id\n            sku\n            stock\n            price\n            optionValues {\n              id\n              value\n            }\n          }\n        }\n        assets(input: { take: 1 }) {\n          count\n          items {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.GetProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProducts($input: ListInput) {\n    products(input: $input) {\n      count\n      items {\n        id\n        createdAt\n        updatedAt\n        name\n        slug\n        description\n        onlineOnly\n        published\n        variants(input: { take: 0 }) {\n          count\n          items {\n            id\n            sku\n            stock\n            price\n            optionValues {\n              id\n              value\n            }\n          }\n        }\n        assets(input: { take: 1 }) {\n          count\n          items {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProducts($input: ListInput) {\n    products(input: $input) {\n      count\n      items {\n        id\n        createdAt\n        updatedAt\n        name\n        slug\n        description\n        onlineOnly\n        published\n        variants(input: { take: 0 }) {\n          count\n          items {\n            id\n            sku\n            stock\n            price\n            optionValues {\n              id\n              value\n            }\n          }\n        }\n        assets(input: { take: 1 }) {\n          count\n          items {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;