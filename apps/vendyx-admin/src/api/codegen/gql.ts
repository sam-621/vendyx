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
  '\n  fragment CommonCountry on Country {\n    id\n    name\n    states {\n      id\n      name\n    }\n  }\n':
    types.CommonCountryFragmentDoc,
  '\n  query GetCountries {\n    countries {\n      ...CommonCountry\n    }\n  }\n':
    types.GetCountriesDocument,
  '\n  fragment CommonCustomer on Customer {\n    id\n    createdAt\n    firstName\n    lastName\n    email\n    phoneNumber\n    enabled\n    totalSpent\n    orders {\n      count\n      items {\n        id\n        code\n        placedAt\n        state\n        total\n        shipment {\n          method\n        }\n      }\n    }\n  }\n':
    types.CommonCustomerFragmentDoc,
  '\n  fragment CommonCustomerOrder on Order {\n    id\n    code\n    placedAt\n    state\n    total\n    shipment {\n      method\n    }\n  }\n':
    types.CommonCustomerOrderFragmentDoc,
  '\n  query GetAllCustomersQuery($input: CustomerListInput) {\n    customers(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        id\n        firstName\n        lastName\n        email\n        enabled\n        totalSpent\n      }\n    }\n  }\n':
    types.GetAllCustomersQueryDocument,
  '\n  query GetAllCustomerOrdersQuery($id: ID!) {\n    customer(id: $id) {\n      orders {\n        count\n        items {\n          ...CommonCustomerOrder\n        }\n      }\n    }\n  }\n':
    types.GetAllCustomerOrdersQueryDocument,
  '\n  query GetCustomerByIdQuery($id: ID!) {\n    customer(id: $id) {\n      ...CommonCustomer\n    }\n  }\n':
    types.GetCustomerByIdQueryDocument,
  '\n  mutation UpdateCustomerMutation($customerId: ID!, $input: UpdateCustomerInput!) {\n    updateCustomer(id: $customerId, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      customer {\n        id\n      }\n    }\n  }\n':
    types.UpdateCustomerMutationDocument,
  '\n  mutation CreateOption($productId: ID!, $input: CreateOptionInput!) {\n    createOption(productId: $productId, input: $input) {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n  }\n':
    types.CreateOptionDocument,
  '\n  mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {\n    updateOption(id: $id, input: $input) {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n  }\n':
    types.UpdateOptionDocument,
  '\n  mutation RemoveOption($id: ID!) {\n    softRemoveOption(id: $id) {\n      id\n    }\n  }\n':
    types.RemoveOptionDocument,
  '\n  fragment CommonOrder on Order {\n    id\n    createdAt\n    code\n    state\n    subtotal\n    total\n    totalQuantity\n    lines {\n      items {\n        id\n        linePrice\n        quantity\n        unitPrice\n        productVariant {\n          id\n          sku\n          optionValues {\n            id\n            name\n          }\n          product {\n            name\n            slug\n            assets {\n              items {\n                id\n                source\n              }\n            }\n          }\n        }\n      }\n    }\n    customer {\n      id\n      email\n      firstName\n      lastName\n      phoneNumber\n    }\n    shippingAddress {\n      streetLine1\n      streetLine2\n      postalCode\n      city\n      province\n      country\n    }\n    shipment {\n      id\n      amount\n      carrier\n      method\n      trackingCode\n    }\n    payment {\n      id\n      amount\n      method\n      transactionId\n    }\n  }\n':
    types.CommonOrderFragmentDoc,
  '\n  query GetAllOrdersQuery($input: OrderListInput) {\n    orders(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        id\n        code\n        state\n        total\n        totalQuantity\n        placedAt\n        customer {\n          id\n          firstName\n          lastName\n        }\n        shipment {\n          id\n          amount\n          trackingCode\n          method\n        }\n      }\n    }\n  }\n':
    types.GetAllOrdersQueryDocument,
  '\n  query GetOrderbyIdQuery($orderId: ID) {\n    order(id: $orderId) {\n      ...CommonOrder\n    }\n  }\n':
    types.GetOrderbyIdQueryDocument,
  '\n  mutation MarkAsShipped($orderId: ID!, $input: MarkOrderAsShippedInput!) {\n    markOrderAsShipped(id: $orderId, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      order {\n        id\n      }\n    }\n  }\n':
    types.MarkAsShippedDocument,
  '\n  mutation MarkAsDelivered($orderId: ID!) {\n    markOrderAsDelivered(id: $orderId) {\n      apiErrors {\n        code\n        message\n      }\n      order {\n        id\n      }\n    }\n  }\n':
    types.MarkAsDeliveredDocument,
  '\n  mutation CancelOrder($orderId: ID!) {\n    cancelOrder(id: $orderId) {\n      apiErrors {\n        code\n        message\n      }\n      order {\n        id\n      }\n    }\n  }\n':
    types.CancelOrderDocument,
  '\n  fragment CommonPaymentIntegration on PaymentIntegration {\n    id\n    icon\n    name\n    metadata\n  }\n':
    types.CommonPaymentIntegrationFragmentDoc,
  '\n  fragment CommonPaymentMethod on PaymentMethod {\n    id\n    name\n    icon\n    enabled\n    integrationMetadata\n  }\n':
    types.CommonPaymentMethodFragmentDoc,
  '\n  query GetPaymentMethods {\n    paymentMethods {\n      ...CommonPaymentMethod\n    }\n  }\n':
    types.GetPaymentMethodsDocument,
  '\n  query GetPaymentMethod($id: ID!) {\n    paymentMethod(id: $id) {\n      ...CommonPaymentMethod\n    }\n  }\n':
    types.GetPaymentMethodDocument,
  '\n  query GetPaymentIntegrations {\n    paymentIntegrations {\n      ...CommonPaymentIntegration\n    }\n  }\n':
    types.GetPaymentIntegrationsDocument,
  '\n  mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {\n    createPaymentMethod(input: $input) {\n      id\n    }\n  }\n':
    types.CreatePaymentMethodDocument,
  '\n  mutation UpdatePaymentMethod($id: ID!, $input: UpdatePaymentMethodInput!) {\n    updatePaymentMethod(id: $id, input: $input) {\n      id\n    }\n  }\n':
    types.UpdatePaymentMethodDocument,
  '\n  mutation RemovePaymentMethod($id: ID!) {\n    removePaymentMethod(id: $id)\n  }\n':
    types.RemovePaymentMethodDocument,
  '\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    slug\n    description\n    enabled\n    variants {\n      items {\n        id\n        salePrice\n        sku\n        stock\n        comparisonPrice\n        costPerUnit\n        requiresShipping\n        optionValues {\n          id\n          name\n        }\n      }\n    }\n    options {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n    assets {\n      items {\n        id\n        name\n        source\n        order\n      }\n    }\n  }\n':
    types.CommonProductFragmentDoc,
  '\n  query GetProducts($input: ProductListInput) {\n    products(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        id\n        createdAt\n        name\n        slug\n        enabled\n        variants {\n          items {\n            id\n            sku\n            stock\n            salePrice\n          }\n        }\n        assets(input: { take: 1 }) {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n  }\n':
    types.GetProductsDocument,
  '\n  query GetProduct($id: ID) {\n    product(id: $id) {\n      ...CommonProduct\n    }\n  }\n':
    types.GetProductDocument,
  '\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n    }\n  }\n':
    types.CreateProductDocument,
  '\n  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n    }\n  }\n':
    types.UpdateProductDocument,
  '\n  mutation RemoveProduct($ids: [ID!]!) {\n    softRemoveProduct(ids: $ids)\n  }\n':
    types.RemoveProductDocument,
  '\n  fragment CommonShippingHandlers on ShippingHandler {\n    id\n    metadata\n    name\n  }\n':
    types.CommonShippingHandlersFragmentDoc,
  '\n  query GetAllHandlers {\n    shippingHandlers {\n      ...CommonShippingHandlers\n    }\n  }\n':
    types.GetAllHandlersDocument,
  '\n  mutation CreateShippingMethod($input: CreateShippingMethodInput!) {\n    createShippingMethod(input: $input) {\n      id\n    }\n  }\n':
    types.CreateShippingMethodDocument,
  '\n  mutation UpdateShippingMethod($id: ID!, $input: UpdateShippingMethodInput!) {\n    updateShippingMethod(id: $id, input: $input) {\n      id\n    }\n  }\n':
    types.UpdateShippingMethodDocument,
  '\n  mutation RemoveShippingMethod($id: ID!) {\n    removeShippingMethod(id: $id)\n  }\n':
    types.RemoveShippingMethodDocument,
  '\n  fragment CommonShop on Shop {\n    id\n    name\n    slug\n  }\n':
    types.CommonShopFragmentDoc,
  '\n  query getShops {\n    shops {\n      items {\n        ...CommonShop\n      }\n    }\n  }\n':
    types.GetShopsDocument,
  '\n  query Shop($slug: String!) {\n    shop(slug: $slug) {\n      ...CommonShop\n    }\n  }\n':
    types.ShopDocument,
  '\n  mutation CreateShop($input: CreateShopInput!) {\n    createShop(input: $input) {\n      id\n      slug\n    }\n  }\n':
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
    types.SoftRemoveVariantDocument,
  '\n  fragment CommonZone on Zone {\n    id\n    name\n    createdAt\n    states {\n      id\n      name\n      country {\n        id\n        name\n      }\n    }\n    shippingMethods {\n      id\n      name\n      description\n      enabled\n      handlerMetadata\n      handler {\n        id\n      }\n      pricePreview\n    }\n  }\n':
    types.CommonZoneFragmentDoc,
  '\n  query getAllZones {\n    zones {\n      id\n      name\n      shippingMethods {\n        id\n      }\n    }\n  }\n':
    types.GetAllZonesDocument,
  '\n  query GetZone($id: ID!) {\n    zone(id: $id) {\n      ...CommonZone\n    }\n  }\n':
    types.GetZoneDocument,
  '\n  mutation CreateZone($input: CreateZoneInput!) {\n    createZone(input: $input) {\n      id\n    }\n  }\n':
    types.CreateZoneDocument,
  '\n  mutation UpdateZone($id: ID!, $input: UpdateZoneInput!) {\n    updateZone(id: $id, input: $input) {\n      id\n    }\n  }\n':
    types.UpdateZoneDocument,
  '\n  mutation RemoveZone($id: ID!) {\n    removeZone(id: $id)\n  }\n': types.RemoveZoneDocument
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonCountry on Country {\n    id\n    name\n    states {\n      id\n      name\n    }\n  }\n'
): typeof import('./graphql').CommonCountryFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCountries {\n    countries {\n      ...CommonCountry\n    }\n  }\n'
): typeof import('./graphql').GetCountriesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonCustomer on Customer {\n    id\n    createdAt\n    firstName\n    lastName\n    email\n    phoneNumber\n    enabled\n    totalSpent\n    orders {\n      count\n      items {\n        id\n        code\n        placedAt\n        state\n        total\n        shipment {\n          method\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').CommonCustomerFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonCustomerOrder on Order {\n    id\n    code\n    placedAt\n    state\n    total\n    shipment {\n      method\n    }\n  }\n'
): typeof import('./graphql').CommonCustomerOrderFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAllCustomersQuery($input: CustomerListInput) {\n    customers(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        id\n        firstName\n        lastName\n        email\n        enabled\n        totalSpent\n      }\n    }\n  }\n'
): typeof import('./graphql').GetAllCustomersQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAllCustomerOrdersQuery($id: ID!) {\n    customer(id: $id) {\n      orders {\n        count\n        items {\n          ...CommonCustomerOrder\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').GetAllCustomerOrdersQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCustomerByIdQuery($id: ID!) {\n    customer(id: $id) {\n      ...CommonCustomer\n    }\n  }\n'
): typeof import('./graphql').GetCustomerByIdQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateCustomerMutation($customerId: ID!, $input: UpdateCustomerInput!) {\n    updateCustomer(id: $customerId, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      customer {\n        id\n      }\n    }\n  }\n'
): typeof import('./graphql').UpdateCustomerMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateOption($productId: ID!, $input: CreateOptionInput!) {\n    createOption(productId: $productId, input: $input) {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n  }\n'
): typeof import('./graphql').CreateOptionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {\n    updateOption(id: $id, input: $input) {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n  }\n'
): typeof import('./graphql').UpdateOptionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RemoveOption($id: ID!) {\n    softRemoveOption(id: $id) {\n      id\n    }\n  }\n'
): typeof import('./graphql').RemoveOptionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonOrder on Order {\n    id\n    createdAt\n    code\n    state\n    subtotal\n    total\n    totalQuantity\n    lines {\n      items {\n        id\n        linePrice\n        quantity\n        unitPrice\n        productVariant {\n          id\n          sku\n          optionValues {\n            id\n            name\n          }\n          product {\n            name\n            slug\n            assets {\n              items {\n                id\n                source\n              }\n            }\n          }\n        }\n      }\n    }\n    customer {\n      id\n      email\n      firstName\n      lastName\n      phoneNumber\n    }\n    shippingAddress {\n      streetLine1\n      streetLine2\n      postalCode\n      city\n      province\n      country\n    }\n    shipment {\n      id\n      amount\n      carrier\n      method\n      trackingCode\n    }\n    payment {\n      id\n      amount\n      method\n      transactionId\n    }\n  }\n'
): typeof import('./graphql').CommonOrderFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAllOrdersQuery($input: OrderListInput) {\n    orders(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        id\n        code\n        state\n        total\n        totalQuantity\n        placedAt\n        customer {\n          id\n          firstName\n          lastName\n        }\n        shipment {\n          id\n          amount\n          trackingCode\n          method\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').GetAllOrdersQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetOrderbyIdQuery($orderId: ID) {\n    order(id: $orderId) {\n      ...CommonOrder\n    }\n  }\n'
): typeof import('./graphql').GetOrderbyIdQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation MarkAsShipped($orderId: ID!, $input: MarkOrderAsShippedInput!) {\n    markOrderAsShipped(id: $orderId, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      order {\n        id\n      }\n    }\n  }\n'
): typeof import('./graphql').MarkAsShippedDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation MarkAsDelivered($orderId: ID!) {\n    markOrderAsDelivered(id: $orderId) {\n      apiErrors {\n        code\n        message\n      }\n      order {\n        id\n      }\n    }\n  }\n'
): typeof import('./graphql').MarkAsDeliveredDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CancelOrder($orderId: ID!) {\n    cancelOrder(id: $orderId) {\n      apiErrors {\n        code\n        message\n      }\n      order {\n        id\n      }\n    }\n  }\n'
): typeof import('./graphql').CancelOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonPaymentIntegration on PaymentIntegration {\n    id\n    icon\n    name\n    metadata\n  }\n'
): typeof import('./graphql').CommonPaymentIntegrationFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonPaymentMethod on PaymentMethod {\n    id\n    name\n    icon\n    enabled\n    integrationMetadata\n  }\n'
): typeof import('./graphql').CommonPaymentMethodFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetPaymentMethods {\n    paymentMethods {\n      ...CommonPaymentMethod\n    }\n  }\n'
): typeof import('./graphql').GetPaymentMethodsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetPaymentMethod($id: ID!) {\n    paymentMethod(id: $id) {\n      ...CommonPaymentMethod\n    }\n  }\n'
): typeof import('./graphql').GetPaymentMethodDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetPaymentIntegrations {\n    paymentIntegrations {\n      ...CommonPaymentIntegration\n    }\n  }\n'
): typeof import('./graphql').GetPaymentIntegrationsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {\n    createPaymentMethod(input: $input) {\n      id\n    }\n  }\n'
): typeof import('./graphql').CreatePaymentMethodDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdatePaymentMethod($id: ID!, $input: UpdatePaymentMethodInput!) {\n    updatePaymentMethod(id: $id, input: $input) {\n      id\n    }\n  }\n'
): typeof import('./graphql').UpdatePaymentMethodDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RemovePaymentMethod($id: ID!) {\n    removePaymentMethod(id: $id)\n  }\n'
): typeof import('./graphql').RemovePaymentMethodDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    slug\n    description\n    enabled\n    variants {\n      items {\n        id\n        salePrice\n        sku\n        stock\n        comparisonPrice\n        costPerUnit\n        requiresShipping\n        optionValues {\n          id\n          name\n        }\n      }\n    }\n    options {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n    assets {\n      items {\n        id\n        name\n        source\n        order\n      }\n    }\n  }\n'
): typeof import('./graphql').CommonProductFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetProducts($input: ProductListInput) {\n    products(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        id\n        createdAt\n        name\n        slug\n        enabled\n        variants {\n          items {\n            id\n            sku\n            stock\n            salePrice\n          }\n        }\n        assets(input: { take: 1 }) {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n  }\n'
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
  source: '\n  mutation RemoveProduct($ids: [ID!]!) {\n    softRemoveProduct(ids: $ids)\n  }\n'
): typeof import('./graphql').RemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonShippingHandlers on ShippingHandler {\n    id\n    metadata\n    name\n  }\n'
): typeof import('./graphql').CommonShippingHandlersFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAllHandlers {\n    shippingHandlers {\n      ...CommonShippingHandlers\n    }\n  }\n'
): typeof import('./graphql').GetAllHandlersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateShippingMethod($input: CreateShippingMethodInput!) {\n    createShippingMethod(input: $input) {\n      id\n    }\n  }\n'
): typeof import('./graphql').CreateShippingMethodDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateShippingMethod($id: ID!, $input: UpdateShippingMethodInput!) {\n    updateShippingMethod(id: $id, input: $input) {\n      id\n    }\n  }\n'
): typeof import('./graphql').UpdateShippingMethodDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RemoveShippingMethod($id: ID!) {\n    removeShippingMethod(id: $id)\n  }\n'
): typeof import('./graphql').RemoveShippingMethodDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonShop on Shop {\n    id\n    name\n    slug\n  }\n'
): typeof import('./graphql').CommonShopFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getShops {\n    shops {\n      items {\n        ...CommonShop\n      }\n    }\n  }\n'
): typeof import('./graphql').GetShopsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Shop($slug: String!) {\n    shop(slug: $slug) {\n      ...CommonShop\n    }\n  }\n'
): typeof import('./graphql').ShopDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateShop($input: CreateShopInput!) {\n    createShop(input: $input) {\n      id\n      slug\n    }\n  }\n'
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
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonZone on Zone {\n    id\n    name\n    createdAt\n    states {\n      id\n      name\n      country {\n        id\n        name\n      }\n    }\n    shippingMethods {\n      id\n      name\n      description\n      enabled\n      handlerMetadata\n      handler {\n        id\n      }\n      pricePreview\n    }\n  }\n'
): typeof import('./graphql').CommonZoneFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getAllZones {\n    zones {\n      id\n      name\n      shippingMethods {\n        id\n      }\n    }\n  }\n'
): typeof import('./graphql').GetAllZonesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetZone($id: ID!) {\n    zone(id: $id) {\n      ...CommonZone\n    }\n  }\n'
): typeof import('./graphql').GetZoneDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateZone($input: CreateZoneInput!) {\n    createZone(input: $input) {\n      id\n    }\n  }\n'
): typeof import('./graphql').CreateZoneDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateZone($id: ID!, $input: UpdateZoneInput!) {\n    updateZone(id: $id, input: $input) {\n      id\n    }\n  }\n'
): typeof import('./graphql').UpdateZoneDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RemoveZone($id: ID!) {\n    removeZone(id: $id)\n  }\n'
): typeof import('./graphql').RemoveZoneDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
