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
    "\n  mutation Authenticate($input: AuthenticateInput!) {\n    authenticate(input: $input) {\n      authToken\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n": types.AuthenticateDocument,
    "\n  mutation RemoveAssets($ids: [ID!]!) {\n    removeAssets(ids: $ids) {\n      success\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n": types.RemoveAssetsDocument,
    "\n  mutation CreateCollection($input: CreateCollectionInput!) {\n    createCollection(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      collection {\n        id\n      }\n    }\n  }\n": types.CreateCollectionDocument,
    "\n  mutation UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {\n    updateCollection(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      collection {\n        id\n      }\n    }\n  }\n": types.UpdateCollectionDocument,
    "\n  mutation RemoveCollection($id: ID!) {\n    removeCollection(id: $id) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n": types.RemoveCollectionDocument,
    "\n  mutation SetProductsInCollection($id: ID!, $productIds: [ID!]!) {\n    setProductsInCollection(id: $id, productIds: $productIds) {\n      apiErrors {\n        code\n        message\n      }\n      collection {\n        id\n      }\n    }\n  }\n": types.SetProductsInCollectionDocument,
    "\n  mutation CreateCountry($input: CreateCountryInput!) {\n    createCountry(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      country {\n        id\n      }\n    }\n  }\n": types.CreateCountryDocument,
    "\n  mutation UpdateCountry($id: ID!, $input: UpdateCountryInput!) {\n    updateCountry(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      country {\n        id\n      }\n    }\n  }\n": types.UpdateCountryDocument,
    "\n  mutation RemoveCountry($id: ID!) {\n    removeCountry(id: $id) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n": types.RemoveCountryDocument,
    "\n  mutation UpdateCustomer($id: ID!, $input: UpdateCustomerInput!) {\n    updateCustomer(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      customer {\n        id\n      }\n    }\n  }\n": types.UpdateCustomerDocument,
    "\n  mutation CreateOption($createOptionInput: CreateOptionInput!) {\n    createOption(input: $createOptionInput) {\n      apiErrors {\n        code\n        message\n      }\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n": types.CreateOptionDocument,
    "\n  mutation RemoveOption($id: ID!) {\n    removeOption(id: $id) {\n      success\n    }\n  }\n": types.RemoveOptionDocument,
    "\n  mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {\n    updateOption(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n": types.UpdateOptionDocument,
    "\n  mutation AddOptionValues($optionId: ID!, $values: [String!]!) {\n    addOptionValues(optionId: $optionId, values: $values) {\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n": types.AddOptionValuesDocument,
    "\n  mutation RemoveOptionValues($ids: [ID!]!) {\n    removeOptionValues(ids: $ids) {\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n": types.RemoveOptionValuesDocument,
    "\n  mutation UpdateOptionValues($input: [UpdateOptionValueInput!]!) {\n    updateOptionValues(input: $input) {\n      success\n    }\n  }\n": types.UpdateOptionValuesDocument,
    "\n  mutation MarkOrderAsShipped($id: ID!, $input: MarkOrderAsShippedInput!) {\n    markOrderAsShipped(id: $id, input: $input) {\n      order {\n        ...CommonOrder\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n": types.MarkOrderAsShippedDocument,
    "\n  mutation MarkOrderAsDelivered($id: ID!) {\n    markOrderAsDelivered(id: $id) {\n      order {\n        ...CommonOrder\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n": types.MarkOrderAsDeliveredDocument,
    "\n  mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {\n    createPaymentMethod(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      paymentMethod {\n        id\n      }\n    }\n  }\n": types.CreatePaymentMethodDocument,
    "\n  mutation UpdatePaymentMethod($id: ID!, $input: UpdatePaymentMethodInput!) {\n    updatePaymentMethod(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      paymentMethod {\n        id\n      }\n    }\n  }\n": types.UpdatePaymentMethodDocument,
    "\n  mutation RemovePaymentMethod($id: ID!) {\n    removePaymentMethod(id: $id) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n": types.RemovePaymentMethodDocument,
    "\n  mutation CreateProduct($createProductInput: CreateProductInput!) {\n    createProduct(input: $createProductInput) {\n      apiErrors {\n        message\n        code\n      }\n      product {\n        id\n      }\n    }\n  }\n": types.CreateProductDocument,
    "\n  mutation RemoveProduct($productId: ID!) {\n    removeProduct(id: $productId) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n": types.RemoveProductDocument,
    "\n  mutation UpdateProduct($productId: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $productId, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      product {\n        id\n      }\n    }\n  }\n": types.UpdateProductDocument,
    "\n  mutation CreateShippingMethod($zoneId: ID!, $input: CreateShippingMethodInput!) {\n    createShippingMethod(zoneId: $zoneId, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      shippingMethod {\n        id\n      }\n    }\n  }\n": types.CreateShippingMethodDocument,
    "\n  mutation UpdateShippingMethod($id: ID!, $input: UpdateShippingMethodInput!) {\n    updateShippingMethod(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      shippingMethod {\n        id\n      }\n    }\n  }\n": types.UpdateShippingMethodDocument,
    "\n  mutation RemoveShippingMethod($id: ID!) {\n    removeShippingMethod(id: $id) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n": types.RemoveShippingMethodDocument,
    "\n  mutation CreateVariant($createVariantProductId: ID!, $createVariantInput: CreateVariantInput!) {\n    createVariant(productId: $createVariantProductId, input: $createVariantInput) {\n      apiErrors {\n        message\n        code\n      }\n      variant {\n        id\n      }\n    }\n  }\n": types.CreateVariantDocument,
    "\n  mutation RemoveVariant($removeVariantId: ID!) {\n    removeVariant(id: $removeVariantId) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n": types.RemoveVariantDocument,
    "\n  mutation UpdateVariant($updateVariantId: ID!, $updateVariantInput: UpdateVariantInput!) {\n    updateVariant(id: $updateVariantId, input: $updateVariantInput) {\n      apiErrors {\n        message\n        code\n      }\n      variant {\n        id\n        price\n        stock\n        sku\n      }\n    }\n  }\n": types.UpdateVariantDocument,
    "\n  mutation CreateZone($input: CreateZoneInput!) {\n    createZone(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      zone {\n        id\n      }\n    }\n  }\n": types.CreateZoneDocument,
    "\n  mutation UpdateZone($id: ID!, $input: UpdateZoneInput!) {\n    updateZone(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      zone {\n        id\n      }\n    }\n  }\n": types.UpdateZoneDocument,
    "\n  mutation RemoveZone($id: ID!) {\n    removeZone(id: $id) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n": types.RemoveZoneDocument,
    "\n  mutation SetCountriesInZone($id: ID!, $countriesIds: [ID!]!) {\n    setCountriesToZone(id: $id, countriesIds: $countriesIds) {\n      apiErrors {\n        code\n        message\n      }\n      zone {\n        id\n      }\n    }\n  }\n": types.SetCountriesInZoneDocument,
    "\n  query GetAdminUiConfig {\n    adminUiConfig {\n      branding {\n        name\n        description\n      }\n      extraUiModules {\n        id\n        label\n        slug\n        icon\n      }\n      priceCalculators {\n        name\n        code\n        args {\n          key\n          type\n          required\n          label\n          placeholder\n          defaultValue\n          conditions {\n            min\n            max\n          }\n          options {\n            label\n            value\n          }\n        }\n      }\n    }\n  }\n": types.GetAdminUiConfigDocument,
    "\n  query ValidateToken {\n    validateToken\n  }\n": types.ValidateTokenDocument,
    "\n  fragment CommonCollection on Collection {\n    id\n    createdAt\n    name\n    slug\n    description\n    published\n    products {\n      count\n      items {\n        id\n        name\n        slug\n        published\n        assets(input: { take: 1 }) {\n          items {\n            id\n            source\n          }\n        }\n        variants {\n          items {\n            stock\n          }\n        }\n      }\n    }\n  }\n": types.CommonCollectionFragmentDoc,
    "\n  query GetCollections {\n    collections {\n      items {\n        id\n        createdAt\n        name\n        slug\n        published\n        products {\n          count\n        }\n      }\n    }\n  }\n": types.GetCollectionsDocument,
    "\n  query GetCollection($id: ID!) {\n    collection(id: $id) {\n      ...CommonCollection\n    }\n  }\n": types.GetCollectionDocument,
    "\n  fragment CommonCountry on Country {\n    id\n    createdAt\n    name\n    enabled\n  }\n": types.CommonCountryFragmentDoc,
    "\n  query GetCountries {\n    countries {\n      count\n      items {\n        ...CommonCountry\n      }\n    }\n  }\n": types.GetCountriesDocument,
    "\n  query GetCountry($id: ID!) {\n    country(id: $id) {\n      ...CommonCountry\n    }\n  }\n": types.GetCountryDocument,
    "\n  fragment CommonCustomer on Customer {\n    id\n    createdAt\n    firstName\n    lastName\n    email\n    phoneNumber\n    enabled\n    orders {\n      count\n      items {\n        id\n        code\n        placedAt\n        state\n        total\n        shipment {\n          method\n        }\n      }\n    }\n  }\n": types.CommonCustomerFragmentDoc,
    "\n  query GetCustomers {\n    customers {\n      count\n      items {\n        id\n        firstName\n        lastName\n        email\n        enabled\n        orders {\n          count\n          items {\n            total\n          }\n        }\n      }\n    }\n  }\n": types.GetCustomersDocument,
    "\n  query GetCustomerDetails($id: ID!) {\n    customer(id: $id) {\n      ...CommonCustomer\n    }\n  }\n": types.GetCustomerDetailsDocument,
    "\n  fragment CommonOrder on Order {\n    id\n    code\n    createdAt\n    subtotal\n    total\n    totalQuantity\n    state\n    lines {\n      items {\n        id\n        linePrice\n        quantity\n        unitPrice\n        productVariant {\n          id\n          sku\n          optionValues(withDeleted: true) {\n            id\n            value\n          }\n          product {\n            name\n            slug\n            assets {\n              items {\n                id\n                source\n              }\n            }\n          }\n        }\n      }\n    }\n    customer {\n      id\n      firstName\n      lastName\n      email\n      phoneNumber\n    }\n    shippingAddress {\n      country\n      streetLine1\n      streetLine2\n      province\n      city\n      postalCode\n    }\n    payment {\n      id\n      amount\n      transactionId\n      method\n    }\n    shipment {\n      id\n      amount\n      trackingCode\n      carrier\n      method\n    }\n  }\n": types.CommonOrderFragmentDoc,
    "\n  query GetOrdersQuery {\n    orders {\n      count\n      items {\n        id\n        code\n        state\n        total\n        totalQuantity\n        placedAt\n        customer {\n          id\n          firstName\n          lastName\n        }\n        shipment {\n          id\n          amount\n          trackingCode\n          method\n        }\n      }\n    }\n  }\n": types.GetOrdersQueryDocument,
    "\n  query GetOrderDetails($orderId: ID) {\n    order(id: $orderId) {\n      ...CommonOrder\n    }\n  }\n": types.GetOrderDetailsDocument,
    "\n  fragment CommonPaymentMethod on PaymentMethod {\n    id\n    name\n    description\n    enabled\n    handler {\n      code\n    }\n  }\n": types.CommonPaymentMethodFragmentDoc,
    "\n  query GetAllPaymentMethods {\n    paymentMethods {\n      items {\n        id\n        name\n        description\n        enabled\n        handler {\n          code\n        }\n      }\n    }\n  }\n": types.GetAllPaymentMethodsDocument,
    "\n  query GetPaymentMethod($paymentMethodId: ID!) {\n    paymentMethod(id: $paymentMethodId) {\n      ...CommonPaymentMethod\n    }\n  }\n": types.GetPaymentMethodDocument,
    "\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    slug\n    description\n    onlineOnly\n    published\n    options {\n      id\n      name\n      values {\n        id\n        value\n      }\n    }\n    variants {\n      items {\n        id\n        price\n        sku\n        stock\n        published\n        optionValues {\n          id\n          value\n        }\n      }\n    }\n    assets {\n      items {\n        id\n        createdAt\n        name\n        source\n        order\n      }\n    }\n  }\n": types.CommonProductFragmentDoc,
    "\n  query GetProducts($input: ListInput) {\n    products(input: $input) {\n      count\n      items {\n        id\n        createdAt\n        name\n        slug\n        onlineOnly\n        published\n        variants {\n          items {\n            id\n            sku\n            stock\n            price\n          }\n        }\n        assets(input: { take: 1 }) {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n  }\n": types.GetProductsDocument,
    "\n  query GetProductDetails($slug: String!) {\n    product(slug: $slug) {\n      ...CommonProduct\n    }\n  }\n": types.GetProductDetailsDocument,
    "\n  fragment CommonZone on Zone {\n    id\n    createdAt\n    name\n    countries {\n      items {\n        id\n        name\n      }\n    }\n    shippingMethods {\n      items {\n        id\n        name\n        description\n        pricePreview\n        priceCalculator {\n          code\n          args {\n            key\n            value\n          }\n        }\n      }\n    }\n  }\n": types.CommonZoneFragmentDoc,
    "\n  query GetZones {\n    zones {\n      items {\n        id\n        name\n        shippingMethods {\n          count\n        }\n      }\n    }\n  }\n": types.GetZonesDocument,
    "\n  query GetZone($id: ID!) {\n    zone(id: $id) {\n      ...CommonZone\n    }\n  }\n": types.GetZoneDocument,
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
export function graphql(source: "\n  mutation Authenticate($input: AuthenticateInput!) {\n    authenticate(input: $input) {\n      authToken\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Authenticate($input: AuthenticateInput!) {\n    authenticate(input: $input) {\n      authToken\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveAssets($ids: [ID!]!) {\n    removeAssets(ids: $ids) {\n      success\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveAssets($ids: [ID!]!) {\n    removeAssets(ids: $ids) {\n      success\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCollection($input: CreateCollectionInput!) {\n    createCollection(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      collection {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCollection($input: CreateCollectionInput!) {\n    createCollection(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      collection {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {\n    updateCollection(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      collection {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {\n    updateCollection(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      collection {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCollection($id: ID!) {\n    removeCollection(id: $id) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveCollection($id: ID!) {\n    removeCollection(id: $id) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SetProductsInCollection($id: ID!, $productIds: [ID!]!) {\n    setProductsInCollection(id: $id, productIds: $productIds) {\n      apiErrors {\n        code\n        message\n      }\n      collection {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SetProductsInCollection($id: ID!, $productIds: [ID!]!) {\n    setProductsInCollection(id: $id, productIds: $productIds) {\n      apiErrors {\n        code\n        message\n      }\n      collection {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCountry($input: CreateCountryInput!) {\n    createCountry(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      country {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCountry($input: CreateCountryInput!) {\n    createCountry(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      country {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCountry($id: ID!, $input: UpdateCountryInput!) {\n    updateCountry(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      country {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCountry($id: ID!, $input: UpdateCountryInput!) {\n    updateCountry(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      country {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCountry($id: ID!) {\n    removeCountry(id: $id) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveCountry($id: ID!) {\n    removeCountry(id: $id) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCustomer($id: ID!, $input: UpdateCustomerInput!) {\n    updateCustomer(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      customer {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCustomer($id: ID!, $input: UpdateCustomerInput!) {\n    updateCustomer(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      customer {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOption($createOptionInput: CreateOptionInput!) {\n    createOption(input: $createOptionInput) {\n      apiErrors {\n        code\n        message\n      }\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOption($createOptionInput: CreateOptionInput!) {\n    createOption(input: $createOptionInput) {\n      apiErrors {\n        code\n        message\n      }\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveOption($id: ID!) {\n    removeOption(id: $id) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveOption($id: ID!) {\n    removeOption(id: $id) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {\n    updateOption(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {\n    updateOption(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddOptionValues($optionId: ID!, $values: [String!]!) {\n    addOptionValues(optionId: $optionId, values: $values) {\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddOptionValues($optionId: ID!, $values: [String!]!) {\n    addOptionValues(optionId: $optionId, values: $values) {\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveOptionValues($ids: [ID!]!) {\n    removeOptionValues(ids: $ids) {\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveOptionValues($ids: [ID!]!) {\n    removeOptionValues(ids: $ids) {\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOptionValues($input: [UpdateOptionValueInput!]!) {\n    updateOptionValues(input: $input) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOptionValues($input: [UpdateOptionValueInput!]!) {\n    updateOptionValues(input: $input) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MarkOrderAsShipped($id: ID!, $input: MarkOrderAsShippedInput!) {\n    markOrderAsShipped(id: $id, input: $input) {\n      order {\n        ...CommonOrder\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation MarkOrderAsShipped($id: ID!, $input: MarkOrderAsShippedInput!) {\n    markOrderAsShipped(id: $id, input: $input) {\n      order {\n        ...CommonOrder\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MarkOrderAsDelivered($id: ID!) {\n    markOrderAsDelivered(id: $id) {\n      order {\n        ...CommonOrder\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation MarkOrderAsDelivered($id: ID!) {\n    markOrderAsDelivered(id: $id) {\n      order {\n        ...CommonOrder\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {\n    createPaymentMethod(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      paymentMethod {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {\n    createPaymentMethod(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      paymentMethod {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePaymentMethod($id: ID!, $input: UpdatePaymentMethodInput!) {\n    updatePaymentMethod(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      paymentMethod {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePaymentMethod($id: ID!, $input: UpdatePaymentMethodInput!) {\n    updatePaymentMethod(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      paymentMethod {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemovePaymentMethod($id: ID!) {\n    removePaymentMethod(id: $id) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation RemovePaymentMethod($id: ID!) {\n    removePaymentMethod(id: $id) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProduct($createProductInput: CreateProductInput!) {\n    createProduct(input: $createProductInput) {\n      apiErrors {\n        message\n        code\n      }\n      product {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProduct($createProductInput: CreateProductInput!) {\n    createProduct(input: $createProductInput) {\n      apiErrors {\n        message\n        code\n      }\n      product {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveProduct($productId: ID!) {\n    removeProduct(id: $productId) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveProduct($productId: ID!) {\n    removeProduct(id: $productId) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProduct($productId: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $productId, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      product {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProduct($productId: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $productId, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      product {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateShippingMethod($zoneId: ID!, $input: CreateShippingMethodInput!) {\n    createShippingMethod(zoneId: $zoneId, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      shippingMethod {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateShippingMethod($zoneId: ID!, $input: CreateShippingMethodInput!) {\n    createShippingMethod(zoneId: $zoneId, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      shippingMethod {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateShippingMethod($id: ID!, $input: UpdateShippingMethodInput!) {\n    updateShippingMethod(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      shippingMethod {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateShippingMethod($id: ID!, $input: UpdateShippingMethodInput!) {\n    updateShippingMethod(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      shippingMethod {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveShippingMethod($id: ID!) {\n    removeShippingMethod(id: $id) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveShippingMethod($id: ID!) {\n    removeShippingMethod(id: $id) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateVariant($createVariantProductId: ID!, $createVariantInput: CreateVariantInput!) {\n    createVariant(productId: $createVariantProductId, input: $createVariantInput) {\n      apiErrors {\n        message\n        code\n      }\n      variant {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateVariant($createVariantProductId: ID!, $createVariantInput: CreateVariantInput!) {\n    createVariant(productId: $createVariantProductId, input: $createVariantInput) {\n      apiErrors {\n        message\n        code\n      }\n      variant {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveVariant($removeVariantId: ID!) {\n    removeVariant(id: $removeVariantId) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveVariant($removeVariantId: ID!) {\n    removeVariant(id: $removeVariantId) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateVariant($updateVariantId: ID!, $updateVariantInput: UpdateVariantInput!) {\n    updateVariant(id: $updateVariantId, input: $updateVariantInput) {\n      apiErrors {\n        message\n        code\n      }\n      variant {\n        id\n        price\n        stock\n        sku\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateVariant($updateVariantId: ID!, $updateVariantInput: UpdateVariantInput!) {\n    updateVariant(id: $updateVariantId, input: $updateVariantInput) {\n      apiErrors {\n        message\n        code\n      }\n      variant {\n        id\n        price\n        stock\n        sku\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateZone($input: CreateZoneInput!) {\n    createZone(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      zone {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateZone($input: CreateZoneInput!) {\n    createZone(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      zone {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateZone($id: ID!, $input: UpdateZoneInput!) {\n    updateZone(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      zone {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateZone($id: ID!, $input: UpdateZoneInput!) {\n    updateZone(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      zone {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveZone($id: ID!) {\n    removeZone(id: $id) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveZone($id: ID!) {\n    removeZone(id: $id) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SetCountriesInZone($id: ID!, $countriesIds: [ID!]!) {\n    setCountriesToZone(id: $id, countriesIds: $countriesIds) {\n      apiErrors {\n        code\n        message\n      }\n      zone {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SetCountriesInZone($id: ID!, $countriesIds: [ID!]!) {\n    setCountriesToZone(id: $id, countriesIds: $countriesIds) {\n      apiErrors {\n        code\n        message\n      }\n      zone {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAdminUiConfig {\n    adminUiConfig {\n      branding {\n        name\n        description\n      }\n      extraUiModules {\n        id\n        label\n        slug\n        icon\n      }\n      priceCalculators {\n        name\n        code\n        args {\n          key\n          type\n          required\n          label\n          placeholder\n          defaultValue\n          conditions {\n            min\n            max\n          }\n          options {\n            label\n            value\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAdminUiConfig {\n    adminUiConfig {\n      branding {\n        name\n        description\n      }\n      extraUiModules {\n        id\n        label\n        slug\n        icon\n      }\n      priceCalculators {\n        name\n        code\n        args {\n          key\n          type\n          required\n          label\n          placeholder\n          defaultValue\n          conditions {\n            min\n            max\n          }\n          options {\n            label\n            value\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ValidateToken {\n    validateToken\n  }\n"): (typeof documents)["\n  query ValidateToken {\n    validateToken\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommonCollection on Collection {\n    id\n    createdAt\n    name\n    slug\n    description\n    published\n    products {\n      count\n      items {\n        id\n        name\n        slug\n        published\n        assets(input: { take: 1 }) {\n          items {\n            id\n            source\n          }\n        }\n        variants {\n          items {\n            stock\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CommonCollection on Collection {\n    id\n    createdAt\n    name\n    slug\n    description\n    published\n    products {\n      count\n      items {\n        id\n        name\n        slug\n        published\n        assets(input: { take: 1 }) {\n          items {\n            id\n            source\n          }\n        }\n        variants {\n          items {\n            stock\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCollections {\n    collections {\n      items {\n        id\n        createdAt\n        name\n        slug\n        published\n        products {\n          count\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCollections {\n    collections {\n      items {\n        id\n        createdAt\n        name\n        slug\n        published\n        products {\n          count\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCollection($id: ID!) {\n    collection(id: $id) {\n      ...CommonCollection\n    }\n  }\n"): (typeof documents)["\n  query GetCollection($id: ID!) {\n    collection(id: $id) {\n      ...CommonCollection\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommonCountry on Country {\n    id\n    createdAt\n    name\n    enabled\n  }\n"): (typeof documents)["\n  fragment CommonCountry on Country {\n    id\n    createdAt\n    name\n    enabled\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCountries {\n    countries {\n      count\n      items {\n        ...CommonCountry\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCountries {\n    countries {\n      count\n      items {\n        ...CommonCountry\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCountry($id: ID!) {\n    country(id: $id) {\n      ...CommonCountry\n    }\n  }\n"): (typeof documents)["\n  query GetCountry($id: ID!) {\n    country(id: $id) {\n      ...CommonCountry\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommonCustomer on Customer {\n    id\n    createdAt\n    firstName\n    lastName\n    email\n    phoneNumber\n    enabled\n    orders {\n      count\n      items {\n        id\n        code\n        placedAt\n        state\n        total\n        shipment {\n          method\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CommonCustomer on Customer {\n    id\n    createdAt\n    firstName\n    lastName\n    email\n    phoneNumber\n    enabled\n    orders {\n      count\n      items {\n        id\n        code\n        placedAt\n        state\n        total\n        shipment {\n          method\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCustomers {\n    customers {\n      count\n      items {\n        id\n        firstName\n        lastName\n        email\n        enabled\n        orders {\n          count\n          items {\n            total\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCustomers {\n    customers {\n      count\n      items {\n        id\n        firstName\n        lastName\n        email\n        enabled\n        orders {\n          count\n          items {\n            total\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCustomerDetails($id: ID!) {\n    customer(id: $id) {\n      ...CommonCustomer\n    }\n  }\n"): (typeof documents)["\n  query GetCustomerDetails($id: ID!) {\n    customer(id: $id) {\n      ...CommonCustomer\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommonOrder on Order {\n    id\n    code\n    createdAt\n    subtotal\n    total\n    totalQuantity\n    state\n    lines {\n      items {\n        id\n        linePrice\n        quantity\n        unitPrice\n        productVariant {\n          id\n          sku\n          optionValues(withDeleted: true) {\n            id\n            value\n          }\n          product {\n            name\n            slug\n            assets {\n              items {\n                id\n                source\n              }\n            }\n          }\n        }\n      }\n    }\n    customer {\n      id\n      firstName\n      lastName\n      email\n      phoneNumber\n    }\n    shippingAddress {\n      country\n      streetLine1\n      streetLine2\n      province\n      city\n      postalCode\n    }\n    payment {\n      id\n      amount\n      transactionId\n      method\n    }\n    shipment {\n      id\n      amount\n      trackingCode\n      carrier\n      method\n    }\n  }\n"): (typeof documents)["\n  fragment CommonOrder on Order {\n    id\n    code\n    createdAt\n    subtotal\n    total\n    totalQuantity\n    state\n    lines {\n      items {\n        id\n        linePrice\n        quantity\n        unitPrice\n        productVariant {\n          id\n          sku\n          optionValues(withDeleted: true) {\n            id\n            value\n          }\n          product {\n            name\n            slug\n            assets {\n              items {\n                id\n                source\n              }\n            }\n          }\n        }\n      }\n    }\n    customer {\n      id\n      firstName\n      lastName\n      email\n      phoneNumber\n    }\n    shippingAddress {\n      country\n      streetLine1\n      streetLine2\n      province\n      city\n      postalCode\n    }\n    payment {\n      id\n      amount\n      transactionId\n      method\n    }\n    shipment {\n      id\n      amount\n      trackingCode\n      carrier\n      method\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOrdersQuery {\n    orders {\n      count\n      items {\n        id\n        code\n        state\n        total\n        totalQuantity\n        placedAt\n        customer {\n          id\n          firstName\n          lastName\n        }\n        shipment {\n          id\n          amount\n          trackingCode\n          method\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetOrdersQuery {\n    orders {\n      count\n      items {\n        id\n        code\n        state\n        total\n        totalQuantity\n        placedAt\n        customer {\n          id\n          firstName\n          lastName\n        }\n        shipment {\n          id\n          amount\n          trackingCode\n          method\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOrderDetails($orderId: ID) {\n    order(id: $orderId) {\n      ...CommonOrder\n    }\n  }\n"): (typeof documents)["\n  query GetOrderDetails($orderId: ID) {\n    order(id: $orderId) {\n      ...CommonOrder\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommonPaymentMethod on PaymentMethod {\n    id\n    name\n    description\n    enabled\n    handler {\n      code\n    }\n  }\n"): (typeof documents)["\n  fragment CommonPaymentMethod on PaymentMethod {\n    id\n    name\n    description\n    enabled\n    handler {\n      code\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllPaymentMethods {\n    paymentMethods {\n      items {\n        id\n        name\n        description\n        enabled\n        handler {\n          code\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllPaymentMethods {\n    paymentMethods {\n      items {\n        id\n        name\n        description\n        enabled\n        handler {\n          code\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPaymentMethod($paymentMethodId: ID!) {\n    paymentMethod(id: $paymentMethodId) {\n      ...CommonPaymentMethod\n    }\n  }\n"): (typeof documents)["\n  query GetPaymentMethod($paymentMethodId: ID!) {\n    paymentMethod(id: $paymentMethodId) {\n      ...CommonPaymentMethod\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    slug\n    description\n    onlineOnly\n    published\n    options {\n      id\n      name\n      values {\n        id\n        value\n      }\n    }\n    variants {\n      items {\n        id\n        price\n        sku\n        stock\n        published\n        optionValues {\n          id\n          value\n        }\n      }\n    }\n    assets {\n      items {\n        id\n        createdAt\n        name\n        source\n        order\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    slug\n    description\n    onlineOnly\n    published\n    options {\n      id\n      name\n      values {\n        id\n        value\n      }\n    }\n    variants {\n      items {\n        id\n        price\n        sku\n        stock\n        published\n        optionValues {\n          id\n          value\n        }\n      }\n    }\n    assets {\n      items {\n        id\n        createdAt\n        name\n        source\n        order\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProducts($input: ListInput) {\n    products(input: $input) {\n      count\n      items {\n        id\n        createdAt\n        name\n        slug\n        onlineOnly\n        published\n        variants {\n          items {\n            id\n            sku\n            stock\n            price\n          }\n        }\n        assets(input: { take: 1 }) {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProducts($input: ListInput) {\n    products(input: $input) {\n      count\n      items {\n        id\n        createdAt\n        name\n        slug\n        onlineOnly\n        published\n        variants {\n          items {\n            id\n            sku\n            stock\n            price\n          }\n        }\n        assets(input: { take: 1 }) {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductDetails($slug: String!) {\n    product(slug: $slug) {\n      ...CommonProduct\n    }\n  }\n"): (typeof documents)["\n  query GetProductDetails($slug: String!) {\n    product(slug: $slug) {\n      ...CommonProduct\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommonZone on Zone {\n    id\n    createdAt\n    name\n    countries {\n      items {\n        id\n        name\n      }\n    }\n    shippingMethods {\n      items {\n        id\n        name\n        description\n        pricePreview\n        priceCalculator {\n          code\n          args {\n            key\n            value\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CommonZone on Zone {\n    id\n    createdAt\n    name\n    countries {\n      items {\n        id\n        name\n      }\n    }\n    shippingMethods {\n      items {\n        id\n        name\n        description\n        pricePreview\n        priceCalculator {\n          code\n          args {\n            key\n            value\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetZones {\n    zones {\n      items {\n        id\n        name\n        shippingMethods {\n          count\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetZones {\n    zones {\n      items {\n        id\n        name\n        shippingMethods {\n          count\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetZone($id: ID!) {\n    zone(id: $id) {\n      ...CommonZone\n    }\n  }\n"): (typeof documents)["\n  query GetZone($id: ID!) {\n    zone(id: $id) {\n      ...CommonZone\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;