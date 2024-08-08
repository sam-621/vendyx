/* eslint-disable */
import * as types from './graphql';

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
  '\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    slug\n    description\n    enabled\n    variants {\n      items {\n        id\n        salePrice\n        sku\n        stock\n        comparisonPrice\n        costPerUnit\n        requiresShipping\n        # optionValues {\n        #   id\n        #   value\n        # }\n      }\n    }\n    # assets {\n    #   items {\n    #     id\n    #     createdAt\n    #     name\n    #     source\n    #     order\n    #   }\n    # }\n  }\n':
    types.CommonProductFragmentDoc,
  '\n  query GetProducts($input: ListInput) {\n    products(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        id\n        createdAt\n        name\n        slug\n        enabled\n        variants {\n          items {\n            id\n            sku\n            stock\n            salePrice\n          }\n        }\n        # assets(input: { take: 1 }) {\n        #   items {\n        #     id\n        #     source\n        #   }\n        # }\n      }\n    }\n  }\n':
    types.GetProductsDocument,
  '\n  query GetProduct($id: ID) {\n    product(id: $id) {\n      ...CommonProduct\n    }\n  }\n':
    types.GetProductDocument,
  '\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n    }\n  }\n':
    types.CreateProductDocument,
  '\n  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n    }\n  }\n':
    types.UpdateProductDocument,
  '\n  mutation RemoveProduct($id: ID!) {\n    softRemoveProduct(id: $id) {\n      id\n    }\n  }\n':
    types.RemoveProductDocument,
  '\n  query getShops {\n    shops {\n      count\n      items {\n        id\n        slug\n      }\n    }\n  }\n':
    types.GetShopsDocument,
  '\n  query Shop($slug: String!) {\n    shop(slug: $slug) {\n      id\n      name\n      slug\n    }\n  }\n':
    types.ShopDocument,
  '\n  mutation CreateShop($input: CreateShopInput!) {\n    createShop(input: $input) {\n      id\n      name\n      slug\n    }\n  }\n':
    types.CreateShopDocument,
  '\n  query GetUser($accessToken: String!) {\n    user(accessToken: $accessToken) {\n      id\n    }\n  }\n':
    types.GetUserDocument,
  '\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      user {\n        id\n      }\n    }\n  }\n':
    types.CreateUserDocument,
  '\n  mutation GenerateAccessToken($input: GenerateUserAccessTokenInput!) {\n    generateUserAccessToken(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      accessToken\n    }\n  }\n':
    types.GenerateAccessTokenDocument,
  '\n  query ValidateAccessToken {\n    validateAccessToken\n  }\n':
    types.ValidateAccessTokenDocument,
  '\n  mutation CreateVariant($productId: ID!, $input: CreateVariantInput!) {\n    createVariant(productId: $productId, input: $input) {\n      id\n    }\n  }\n':
    types.CreateVariantDocument,
  '\n  mutation UpdateVariant($id: ID!, $input: UpdateVariantInput!) {\n    updateVariant(id: $id, input: $input) {\n      id\n    }\n  }\n':
    types.UpdateVariantDocument,
  '\n  mutation SoftRemoveVariant($id: ID!) {\n    softRemoveVariant(id: $id) {\n      id\n    }\n  }\n':
    types.SoftRemoveVariantDocument
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    slug\n    description\n    enabled\n    variants {\n      items {\n        id\n        salePrice\n        sku\n        stock\n        comparisonPrice\n        costPerUnit\n        requiresShipping\n        # optionValues {\n        #   id\n        #   value\n        # }\n      }\n    }\n    # assets {\n    #   items {\n    #     id\n    #     createdAt\n    #     name\n    #     source\n    #     order\n    #   }\n    # }\n  }\n'
): typeof import('./graphql').CommonProductFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetProducts($input: ListInput) {\n    products(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        id\n        createdAt\n        name\n        slug\n        enabled\n        variants {\n          items {\n            id\n            sku\n            stock\n            salePrice\n          }\n        }\n        # assets(input: { take: 1 }) {\n        #   items {\n        #     id\n        #     source\n        #   }\n        # }\n      }\n    }\n  }\n'
): typeof import('./graphql').GetProductsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetProduct($id: ID) {\n    product(id: $id) {\n      ...CommonProduct\n    }\n  }\n'
): typeof import('./graphql').GetProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n    }\n  }\n'
): typeof import('./graphql').CreateProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n    }\n  }\n'
): typeof import('./graphql').UpdateProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RemoveProduct($id: ID!) {\n    softRemoveProduct(id: $id) {\n      id\n    }\n  }\n'
): typeof import('./graphql').RemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getShops {\n    shops {\n      count\n      items {\n        id\n        slug\n      }\n    }\n  }\n'
): typeof import('./graphql').GetShopsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Shop($slug: String!) {\n    shop(slug: $slug) {\n      id\n      name\n      slug\n    }\n  }\n'
): typeof import('./graphql').ShopDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateShop($input: CreateShopInput!) {\n    createShop(input: $input) {\n      id\n      name\n      slug\n    }\n  }\n'
): typeof import('./graphql').CreateShopDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetUser($accessToken: String!) {\n    user(accessToken: $accessToken) {\n      id\n    }\n  }\n'
): typeof import('./graphql').GetUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      user {\n        id\n      }\n    }\n  }\n'
): typeof import('./graphql').CreateUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation GenerateAccessToken($input: GenerateUserAccessTokenInput!) {\n    generateUserAccessToken(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      accessToken\n    }\n  }\n'
): typeof import('./graphql').GenerateAccessTokenDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ValidateAccessToken {\n    validateAccessToken\n  }\n'
): typeof import('./graphql').ValidateAccessTokenDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateVariant($productId: ID!, $input: CreateVariantInput!) {\n    createVariant(productId: $productId, input: $input) {\n      id\n    }\n  }\n'
): typeof import('./graphql').CreateVariantDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateVariant($id: ID!, $input: UpdateVariantInput!) {\n    updateVariant(id: $id, input: $input) {\n      id\n    }\n  }\n'
): typeof import('./graphql').UpdateVariantDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SoftRemoveVariant($id: ID!) {\n    softRemoveVariant(id: $id) {\n      id\n    }\n  }\n'
): typeof import('./graphql').SoftRemoveVariantDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
