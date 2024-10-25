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

export type Address = Node & {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  postalCode: Scalars['String']['output'];
  /** State or region */
  province: Scalars['String']['output'];
  references?: Maybe<Scalars['String']['output']>;
  streetLine1: Scalars['String']['output'];
  streetLine2?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type AddressList = List & {
  __typename?: 'AddressList';
  count: Scalars['Int']['output'];
  items: Array<Address>;
  pageInfo: PageInfo;
};

export type Asset = Node & {
  __typename?: 'Asset';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  source: Scalars['String']['output'];
  type: AssetType;
  updatedAt: Scalars['Date']['output'];
};

export type AssetInProductInput = {
  id: Scalars['ID']['input'];
  order: Scalars['Int']['input'];
};

export type AssetList = List & {
  __typename?: 'AssetList';
  count: Scalars['Int']['output'];
  items: Array<Asset>;
  pageInfo: PageInfo;
};

export enum AssetType {
  Image = 'IMAGE'
}

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Country = Node & {
  __typename?: 'Country';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  states: Array<State>;
  updatedAt: Scalars['Date']['output'];
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

export type CreatePaymentMethodInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  integrationId: Scalars['ID']['input'];
  integrationMetadata: Scalars['JSON']['input'];
};

export type CreateProductInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  assets?: InputMaybe<Array<AssetInProductInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type CreateShippingMethodInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  handlerId: Scalars['ID']['input'];
  handlerMetadata: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
  zoneId: Scalars['ID']['input'];
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

export type CreateZoneInput = {
  name: Scalars['String']['input'];
  stateIds: Array<Scalars['ID']['input']>;
};

export type Customer = Node & {
  __typename?: 'Customer';
  addresses: AddressList;
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  /** to customer be able to login, place orders, etc. the customer must be enabled */
  enabled: Scalars['Boolean']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  orders: OrderList;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export enum CustomerErrorCode {
  EmailAlreadyExists = 'EMAIL_ALREADY_EXISTS',
  InvalidEmail = 'INVALID_EMAIL'
}

export type CustomerErrorResult = {
  __typename?: 'CustomerErrorResult';
  code: CustomerErrorCode;
  message: Scalars['String']['output'];
};

export type CustomerList = List & {
  __typename?: 'CustomerList';
  count: Scalars['Int']['output'];
  items: Array<Customer>;
  pageInfo: PageInfo;
};

/**  Results  */
export type CustomerResult = {
  __typename?: 'CustomerResult';
  apiErrors: Array<CustomerErrorResult>;
  customer?: Maybe<Customer>;
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

export type MarkOrderAsShippedInput = {
  carrier: Scalars['String']['input'];
  trackingCode: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelOrder: OrderResult;
  createOption: Option;
  createPaymentMethod: PaymentMethod;
  createProduct: Product;
  createShippingMethod: ShippingMethod;
  createShop: Shop;
  createUser: UserResult;
  createVariant: Variant;
  createZone: Zone;
  generateUserAccessToken: UserAccessTokenResult;
  markOrderAsDelivered: OrderResult;
  markOrderAsShipped: OrderResult;
  removePaymentMethod: Scalars['Boolean']['output'];
  removeShippingMethod: Scalars['Boolean']['output'];
  removeZone: Scalars['Boolean']['output'];
  softRemoveOption: Option;
  softRemoveOptionValues: Scalars['Boolean']['output'];
  softRemoveProduct: Scalars['Boolean']['output'];
  softRemoveVariant: Variant;
  updateOption: Option;
  updatePaymentMethod: PaymentMethod;
  updateProduct: Product;
  updateShippingMethod: ShippingMethod;
  updateUser: UserResult;
  updateVariant: Variant;
  updateZone: Zone;
};

export type MutationCancelOrderArgs = {
  id: Scalars['ID']['input'];
};

export type MutationCreateOptionArgs = {
  input: CreateOptionInput;
  productId: Scalars['ID']['input'];
};

export type MutationCreatePaymentMethodArgs = {
  input: CreatePaymentMethodInput;
};

export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type MutationCreateShippingMethodArgs = {
  input: CreateShippingMethodInput;
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

export type MutationCreateZoneArgs = {
  input: CreateZoneInput;
};

export type MutationGenerateUserAccessTokenArgs = {
  input: GenerateUserAccessTokenInput;
};

export type MutationMarkOrderAsDeliveredArgs = {
  id: Scalars['ID']['input'];
};

export type MutationMarkOrderAsShippedArgs = {
  id: Scalars['ID']['input'];
  input: MarkOrderAsShippedInput;
};

export type MutationRemovePaymentMethodArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveShippingMethodArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveZoneArgs = {
  id: Scalars['ID']['input'];
};

export type MutationSoftRemoveOptionArgs = {
  id: Scalars['ID']['input'];
};

export type MutationSoftRemoveOptionValuesArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type MutationSoftRemoveProductArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type MutationSoftRemoveVariantArgs = {
  id: Scalars['ID']['input'];
};

export type MutationUpdateOptionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateOptionInput;
};

export type MutationUpdatePaymentMethodArgs = {
  id: Scalars['ID']['input'];
  input: UpdatePaymentMethodInput;
};

export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
};

export type MutationUpdateShippingMethodArgs = {
  id: Scalars['ID']['input'];
  input: UpdateShippingMethodInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type MutationUpdateVariantArgs = {
  id: Scalars['ID']['input'];
  input: UpdateVariantInput;
};

export type MutationUpdateZoneArgs = {
  id: Scalars['ID']['input'];
  input: UpdateZoneInput;
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

export type Order = Node & {
  __typename?: 'Order';
  code: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  customer?: Maybe<Customer>;
  id: Scalars['ID']['output'];
  lines: OrderLineList;
  payment?: Maybe<Payment>;
  /** The date and time when a payment has been added to the order */
  placedAt?: Maybe<Scalars['Date']['output']>;
  shipment?: Maybe<Shipment>;
  shippingAddress?: Maybe<OrderShippingAddressJson>;
  state: OrderState;
  /** Order lines total less discounts */
  subtotal: Scalars['Int']['output'];
  /** The price that will be sent to the payment provider. subtotal plus shipping price */
  total: Scalars['Int']['output'];
  totalQuantity: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type OrderLinesArgs = {
  input?: InputMaybe<ListInput>;
};

/**  Utils  */
export enum OrderErrorCode {
  ForbiddenOrderAction = 'FORBIDDEN_ORDER_ACTION',
  OrderNotFound = 'ORDER_NOT_FOUND',
  OrderTransitionError = 'ORDER_TRANSITION_ERROR'
}

export type OrderErrorResult = {
  __typename?: 'OrderErrorResult';
  code: OrderErrorCode;
  message: Scalars['String']['output'];
};

export type OrderFilters = {
  code?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<OrderState>;
};

export type OrderLine = Node & {
  __typename?: 'OrderLine';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  linePrice: Scalars['Int']['output'];
  productVariant: Variant;
  quantity: Scalars['Int']['output'];
  unitPrice: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type OrderLineList = List & {
  __typename?: 'OrderLineList';
  count: Scalars['Int']['output'];
  items: Array<OrderLine>;
  pageInfo: PageInfo;
};

export type OrderList = List & {
  __typename?: 'OrderList';
  count: Scalars['Int']['output'];
  items: Array<Order>;
  pageInfo: PageInfo;
};

export type OrderListInput = {
  /** Filters to apply */
  filters?: InputMaybe<OrderFilters>;
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

/**  Results  */
export type OrderResult = {
  __typename?: 'OrderResult';
  apiErrors: Array<OrderErrorResult>;
  order?: Maybe<Order>;
};

export type OrderShippingAddressJson = {
  __typename?: 'OrderShippingAddressJson';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  fullName?: Maybe<Scalars['String']['output']>;
  postalCode: Scalars['String']['output'];
  /** State or region */
  province: Scalars['String']['output'];
  references?: Maybe<Scalars['String']['output']>;
  streetLine1: Scalars['String']['output'];
  streetLine2?: Maybe<Scalars['String']['output']>;
};

export enum OrderState {
  /** The order has been canceled by the admin */
  Canceled = 'CANCELED',
  /** The order has been delivered and is completes */
  Delivered = 'DELIVERED',
  /** The order is being modified by the customer (CRUD line actions, adding contact info and shipment info) */
  Modifying = 'MODIFYING',
  /** The order is ready to be paid */
  PaymentAdded = 'PAYMENT_ADDED',
  /** The payment has been authorized by the payment provider */
  PaymentAuthorized = 'PAYMENT_AUTHORIZED',
  /** The order has been shipped (carrier and tracking code added) */
  Shipped = 'SHIPPED'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  total: Scalars['Int']['output'];
};

export type Payment = Node & {
  __typename?: 'Payment';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  method: Scalars['String']['output'];
  transactionId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

/** A payment integration is am integration to be used in a payment method by any shop. */
export type PaymentIntegration = {
  __typename?: 'PaymentIntegration';
  createdAt: Scalars['Date']['output'];
  /** The payment integration's icon */
  icon: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /**
   * Specific data for the payment integration chosen
   * Usually, this json stores the payment integration keys
   */
  metadata: Scalars['JSON']['output'];
  /** The payment integration's name (e.g. 'Stripe') */
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

/** A payment method is a way to pay for an order in your shop, like credit card, paypal, etc */
export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  createdAt: Scalars['Date']['output'];
  /**
   * Whether the payment method is enabled or not
   * Not enabled payment methods will not be shown in the storefront
   * Useful for payment methods that are not ready to be used yet
   */
  enabled: Scalars['Boolean']['output'];
  /** The payment method's icon */
  icon: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /**
   * Specific data for the payment integration chosen
   * Usually, this json stores the payment integration keys
   */
  integrationMetadata: Scalars['JSON']['output'];
  /** The payment method's name (e.g. 'Stripe') */
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Product = Node & {
  __typename?: 'Product';
  /**
   * Whether the product is archived or not.
   * Archived products are not exposed to the storefront API and are not visible in the admin ui by default.
   * Useful for products that are not available anymore but you don't want to lose their data.
   */
  archived: Scalars['Boolean']['output'];
  assets: AssetList;
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

export type ProductAssetsArgs = {
  input?: InputMaybe<ListInput>;
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
  countries: Array<Country>;
  order?: Maybe<Order>;
  orders: OrderList;
  paymentIntegrations: Array<PaymentIntegration>;
  paymentMethod?: Maybe<PaymentMethod>;
  paymentMethods: Array<PaymentMethod>;
  product?: Maybe<Product>;
  products: ProductList;
  shippingHandlers: Array<ShippingHandler>;
  shippingMethods: Array<ShippingMethod>;
  shop?: Maybe<Shop>;
  shops: ShopList;
  user?: Maybe<User>;
  validateAccessToken?: Maybe<Scalars['Boolean']['output']>;
  variant?: Maybe<Variant>;
  zone: Zone;
  zones: Array<Zone>;
};

export type QueryOrderArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryOrdersArgs = {
  input?: InputMaybe<OrderListInput>;
};

export type QueryPaymentMethodArgs = {
  id: Scalars['ID']['input'];
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

export type QueryZoneArgs = {
  id: Scalars['ID']['input'];
};

export type Shipment = Node & {
  __typename?: 'Shipment';
  amount: Scalars['Int']['output'];
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  method: Scalars['String']['output'];
  order: Order;
  trackingCode?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

/** A shipping handler is a way to manage the shipping of an order in your shop, manage include the shipping cost, the shipping time, etc */
export type ShippingHandler = Node & {
  __typename?: 'ShippingHandler';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /**
   * Specific data for the shipping handler chosen.
   * Usually, this json stores the shipping handler keys
   */
  metadata: Scalars['JSON']['output'];
  /** The shipping handler's name (e.g. 'Fedex') */
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

/** A shipping method is a method chosen by the customer to ship the order to the customer's address */
export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod';
  createdAt: Scalars['Date']['output'];
  /** The shipping method's description */
  description?: Maybe<Scalars['String']['output']>;
  /**
   * Whether the shipping method is enabled or not
   * Not enabled shipping methods will not be shown in the storefront
   * Useful for shipping methods that are not ready to be used yet
   */
  enabled: Scalars['Boolean']['output'];
  handler: ShippingHandler;
  /**
   * Specific data for the shipping handler chosen
   * Usually, this json stores the shipping handler keys
   */
  handlerMetadata: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  /** The shipping method's name (e.g. 'Stripe') */
  name: Scalars['String']['output'];
  pricePreview: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
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

export type State = Node & {
  __typename?: 'State';
  country: Country;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
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

export type UpdatePaymentMethodInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  integrationMetadata?: InputMaybe<Scalars['JSON']['input']>;
};

export type UpdateProductInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  assets?: InputMaybe<Array<AssetInProductInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateShippingMethodInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  handlerMetadata?: InputMaybe<Scalars['JSON']['input']>;
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

export type UpdateZoneInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  stateIds?: InputMaybe<Array<Scalars['ID']['input']>>;
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

export type Zone = Node & {
  __typename?: 'Zone';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  shippingMethods: Array<ShippingMethod>;
  states: Array<State>;
  updatedAt: Scalars['Date']['output'];
};

export type CommonCountryFragment = {
  __typename?: 'Country';
  id: string;
  name: string;
  states: Array<{ __typename?: 'State'; id: string; name: string }>;
} & { ' $fragmentName'?: 'CommonCountryFragment' };

export type GetCountriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCountriesQuery = {
  __typename?: 'Query';
  countries: Array<
    { __typename?: 'Country' } & {
      ' $fragmentRefs'?: { CommonCountryFragment: CommonCountryFragment };
    }
  >;
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

export type CommonOrderFragment = {
  __typename?: 'Order';
  id: string;
  createdAt: any;
  code: string;
  state: OrderState;
  subtotal: number;
  total: number;
  totalQuantity: number;
  placedAt?: any | null;
  lines: {
    __typename?: 'OrderLineList';
    items: Array<{
      __typename?: 'OrderLine';
      id: string;
      linePrice: number;
      quantity: number;
      unitPrice: number;
      productVariant: { __typename?: 'Variant'; id: string; salePrice: number };
    }>;
  };
  customer?: {
    __typename?: 'Customer';
    id: string;
    email: string;
    enabled: boolean;
    firstName?: string | null;
    lastName: string;
    phoneNumber?: string | null;
  } | null;
  shippingAddress?: {
    __typename?: 'OrderShippingAddressJson';
    streetLine1: string;
    streetLine2?: string | null;
    postalCode: string;
    city: string;
    province: string;
    country: string;
    references?: string | null;
    fullName?: string | null;
  } | null;
  shipment?: {
    __typename?: 'Shipment';
    id: string;
    amount: number;
    carrier?: string | null;
    method: string;
    trackingCode?: string | null;
  } | null;
  payment?: {
    __typename?: 'Payment';
    id: string;
    amount: number;
    method: string;
    transactionId?: string | null;
  } | null;
} & { ' $fragmentName'?: 'CommonOrderFragment' };

export type GetAllOrdersQueryQueryVariables = Exact<{
  input?: InputMaybe<OrderListInput>;
}>;

export type GetAllOrdersQueryQuery = {
  __typename?: 'Query';
  orders: {
    __typename?: 'OrderList';
    count: number;
    pageInfo: { __typename?: 'PageInfo'; total: number };
    items: Array<{
      __typename?: 'Order';
      id: string;
      code: string;
      state: OrderState;
      total: number;
      totalQuantity: number;
      placedAt?: any | null;
      customer?: {
        __typename?: 'Customer';
        id: string;
        firstName?: string | null;
        lastName: string;
      } | null;
      shipment?: {
        __typename?: 'Shipment';
        id: string;
        amount: number;
        trackingCode?: string | null;
        method: string;
      } | null;
    }>;
  };
};

export type GetOrderbyIdQueryQueryVariables = Exact<{
  orderId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type GetOrderbyIdQueryQuery = {
  __typename?: 'Query';
  order?:
    | ({ __typename?: 'Order' } & {
        ' $fragmentRefs'?: { CommonOrderFragment: CommonOrderFragment };
      })
    | null;
};

export type CommonPaymentIntegrationFragment = {
  __typename?: 'PaymentIntegration';
  id: string;
  icon: string;
  name: string;
  metadata: any;
} & { ' $fragmentName'?: 'CommonPaymentIntegrationFragment' };

export type CommonPaymentMethodFragment = {
  __typename?: 'PaymentMethod';
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  integrationMetadata: any;
} & { ' $fragmentName'?: 'CommonPaymentMethodFragment' };

export type GetPaymentMethodsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPaymentMethodsQuery = {
  __typename?: 'Query';
  paymentMethods: Array<
    { __typename?: 'PaymentMethod' } & {
      ' $fragmentRefs'?: { CommonPaymentMethodFragment: CommonPaymentMethodFragment };
    }
  >;
};

export type GetPaymentMethodQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetPaymentMethodQuery = {
  __typename?: 'Query';
  paymentMethod?:
    | ({ __typename?: 'PaymentMethod' } & {
        ' $fragmentRefs'?: { CommonPaymentMethodFragment: CommonPaymentMethodFragment };
      })
    | null;
};

export type GetPaymentIntegrationsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPaymentIntegrationsQuery = {
  __typename?: 'Query';
  paymentIntegrations: Array<
    { __typename?: 'PaymentIntegration' } & {
      ' $fragmentRefs'?: { CommonPaymentIntegrationFragment: CommonPaymentIntegrationFragment };
    }
  >;
};

export type CreatePaymentMethodMutationVariables = Exact<{
  input: CreatePaymentMethodInput;
}>;

export type CreatePaymentMethodMutation = {
  __typename?: 'Mutation';
  createPaymentMethod: { __typename?: 'PaymentMethod'; id: string };
};

export type UpdatePaymentMethodMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdatePaymentMethodInput;
}>;

export type UpdatePaymentMethodMutation = {
  __typename?: 'Mutation';
  updatePaymentMethod: { __typename?: 'PaymentMethod'; id: string };
};

export type RemovePaymentMethodMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RemovePaymentMethodMutation = { __typename?: 'Mutation'; removePaymentMethod: boolean };

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
  assets: {
    __typename?: 'AssetList';
    items: Array<{ __typename?: 'Asset'; id: string; name: string; source: string; order: number }>;
  };
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
      assets: {
        __typename?: 'AssetList';
        items: Array<{ __typename?: 'Asset'; id: string; source: string }>;
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
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;

export type RemoveProductMutation = { __typename?: 'Mutation'; softRemoveProduct: boolean };

export type CommonShippingHandlersFragment = {
  __typename?: 'ShippingHandler';
  id: string;
  metadata: any;
  name: string;
} & { ' $fragmentName'?: 'CommonShippingHandlersFragment' };

export type GetAllHandlersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllHandlersQuery = {
  __typename?: 'Query';
  shippingHandlers: Array<
    { __typename?: 'ShippingHandler' } & {
      ' $fragmentRefs'?: { CommonShippingHandlersFragment: CommonShippingHandlersFragment };
    }
  >;
};

export type CreateShippingMethodMutationVariables = Exact<{
  input: CreateShippingMethodInput;
}>;

export type CreateShippingMethodMutation = {
  __typename?: 'Mutation';
  createShippingMethod: { __typename?: 'ShippingMethod'; id: string };
};

export type UpdateShippingMethodMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateShippingMethodInput;
}>;

export type UpdateShippingMethodMutation = {
  __typename?: 'Mutation';
  updateShippingMethod: { __typename?: 'ShippingMethod'; id: string };
};

export type RemoveShippingMethodMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RemoveShippingMethodMutation = {
  __typename?: 'Mutation';
  removeShippingMethod: boolean;
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

export type CommonZoneFragment = {
  __typename?: 'Zone';
  id: string;
  name: string;
  createdAt: any;
  states: Array<{
    __typename?: 'State';
    id: string;
    name: string;
    country: { __typename?: 'Country'; id: string; name: string };
  }>;
  shippingMethods: Array<{
    __typename?: 'ShippingMethod';
    id: string;
    name: string;
    description?: string | null;
    enabled: boolean;
    handlerMetadata: any;
    pricePreview: number;
    handler: { __typename?: 'ShippingHandler'; id: string };
  }>;
} & { ' $fragmentName'?: 'CommonZoneFragment' };

export type GetAllZonesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllZonesQuery = {
  __typename?: 'Query';
  zones: Array<{
    __typename?: 'Zone';
    id: string;
    name: string;
    shippingMethods: Array<{ __typename?: 'ShippingMethod'; id: string }>;
  }>;
};

export type GetZoneQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetZoneQuery = {
  __typename?: 'Query';
  zone: { __typename?: 'Zone' } & { ' $fragmentRefs'?: { CommonZoneFragment: CommonZoneFragment } };
};

export type CreateZoneMutationVariables = Exact<{
  input: CreateZoneInput;
}>;

export type CreateZoneMutation = {
  __typename?: 'Mutation';
  createZone: { __typename?: 'Zone'; id: string };
};

export type UpdateZoneMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateZoneInput;
}>;

export type UpdateZoneMutation = {
  __typename?: 'Mutation';
  updateZone: { __typename?: 'Zone'; id: string };
};

export type RemoveZoneMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RemoveZoneMutation = { __typename?: 'Mutation'; removeZone: boolean };

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
export const CommonCountryFragmentDoc = new TypedDocumentString(
  `
    fragment CommonCountry on Country {
  id
  name
  states {
    id
    name
  }
}
    `,
  { fragmentName: 'CommonCountry' }
) as unknown as TypedDocumentString<CommonCountryFragment, unknown>;
export const CommonOrderFragmentDoc = new TypedDocumentString(
  `
    fragment CommonOrder on Order {
  id
  createdAt
  code
  state
  subtotal
  total
  totalQuantity
  placedAt
  lines {
    items {
      id
      linePrice
      quantity
      unitPrice
      productVariant {
        id
        salePrice
      }
    }
  }
  customer {
    id
    email
    enabled
    firstName
    lastName
    phoneNumber
  }
  shippingAddress {
    streetLine1
    streetLine2
    postalCode
    city
    province
    country
    references
    fullName
  }
  shipment {
    id
    amount
    carrier
    method
    trackingCode
  }
  payment {
    id
    amount
    method
    transactionId
  }
}
    `,
  { fragmentName: 'CommonOrder' }
) as unknown as TypedDocumentString<CommonOrderFragment, unknown>;
export const CommonPaymentIntegrationFragmentDoc = new TypedDocumentString(
  `
    fragment CommonPaymentIntegration on PaymentIntegration {
  id
  icon
  name
  metadata
}
    `,
  { fragmentName: 'CommonPaymentIntegration' }
) as unknown as TypedDocumentString<CommonPaymentIntegrationFragment, unknown>;
export const CommonPaymentMethodFragmentDoc = new TypedDocumentString(
  `
    fragment CommonPaymentMethod on PaymentMethod {
  id
  name
  icon
  enabled
  integrationMetadata
}
    `,
  { fragmentName: 'CommonPaymentMethod' }
) as unknown as TypedDocumentString<CommonPaymentMethodFragment, unknown>;
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
  assets {
    items {
      id
      name
      source
      order
    }
  }
}
    `,
  { fragmentName: 'CommonProduct' }
) as unknown as TypedDocumentString<CommonProductFragment, unknown>;
export const CommonShippingHandlersFragmentDoc = new TypedDocumentString(
  `
    fragment CommonShippingHandlers on ShippingHandler {
  id
  metadata
  name
}
    `,
  { fragmentName: 'CommonShippingHandlers' }
) as unknown as TypedDocumentString<CommonShippingHandlersFragment, unknown>;
export const CommonZoneFragmentDoc = new TypedDocumentString(
  `
    fragment CommonZone on Zone {
  id
  name
  createdAt
  states {
    id
    name
    country {
      id
      name
    }
  }
  shippingMethods {
    id
    name
    description
    enabled
    handlerMetadata
    handler {
      id
    }
    pricePreview
  }
}
    `,
  { fragmentName: 'CommonZone' }
) as unknown as TypedDocumentString<CommonZoneFragment, unknown>;
export const GetCountriesDocument = new TypedDocumentString(`
    query GetCountries {
  countries {
    ...CommonCountry
  }
}
    fragment CommonCountry on Country {
  id
  name
  states {
    id
    name
  }
}`) as unknown as TypedDocumentString<GetCountriesQuery, GetCountriesQueryVariables>;
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
export const GetAllOrdersQueryDocument = new TypedDocumentString(`
    query GetAllOrdersQuery($input: OrderListInput) {
  orders(input: $input) {
    count
    pageInfo {
      total
    }
    items {
      id
      code
      state
      total
      totalQuantity
      placedAt
      customer {
        id
        firstName
        lastName
      }
      shipment {
        id
        amount
        trackingCode
        method
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetAllOrdersQueryQuery, GetAllOrdersQueryQueryVariables>;
export const GetOrderbyIdQueryDocument = new TypedDocumentString(`
    query GetOrderbyIdQuery($orderId: ID) {
  order(id: $orderId) {
    ...CommonOrder
  }
}
    fragment CommonOrder on Order {
  id
  createdAt
  code
  state
  subtotal
  total
  totalQuantity
  placedAt
  lines {
    items {
      id
      linePrice
      quantity
      unitPrice
      productVariant {
        id
        salePrice
      }
    }
  }
  customer {
    id
    email
    enabled
    firstName
    lastName
    phoneNumber
  }
  shippingAddress {
    streetLine1
    streetLine2
    postalCode
    city
    province
    country
    references
    fullName
  }
  shipment {
    id
    amount
    carrier
    method
    trackingCode
  }
  payment {
    id
    amount
    method
    transactionId
  }
}`) as unknown as TypedDocumentString<GetOrderbyIdQueryQuery, GetOrderbyIdQueryQueryVariables>;
export const GetPaymentMethodsDocument = new TypedDocumentString(`
    query GetPaymentMethods {
  paymentMethods {
    ...CommonPaymentMethod
  }
}
    fragment CommonPaymentMethod on PaymentMethod {
  id
  name
  icon
  enabled
  integrationMetadata
}`) as unknown as TypedDocumentString<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>;
export const GetPaymentMethodDocument = new TypedDocumentString(`
    query GetPaymentMethod($id: ID!) {
  paymentMethod(id: $id) {
    ...CommonPaymentMethod
  }
}
    fragment CommonPaymentMethod on PaymentMethod {
  id
  name
  icon
  enabled
  integrationMetadata
}`) as unknown as TypedDocumentString<GetPaymentMethodQuery, GetPaymentMethodQueryVariables>;
export const GetPaymentIntegrationsDocument = new TypedDocumentString(`
    query GetPaymentIntegrations {
  paymentIntegrations {
    ...CommonPaymentIntegration
  }
}
    fragment CommonPaymentIntegration on PaymentIntegration {
  id
  icon
  name
  metadata
}`) as unknown as TypedDocumentString<
  GetPaymentIntegrationsQuery,
  GetPaymentIntegrationsQueryVariables
>;
export const CreatePaymentMethodDocument = new TypedDocumentString(`
    mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {
  createPaymentMethod(input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<
  CreatePaymentMethodMutation,
  CreatePaymentMethodMutationVariables
>;
export const UpdatePaymentMethodDocument = new TypedDocumentString(`
    mutation UpdatePaymentMethod($id: ID!, $input: UpdatePaymentMethodInput!) {
  updatePaymentMethod(id: $id, input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<
  UpdatePaymentMethodMutation,
  UpdatePaymentMethodMutationVariables
>;
export const RemovePaymentMethodDocument = new TypedDocumentString(`
    mutation RemovePaymentMethod($id: ID!) {
  removePaymentMethod(id: $id)
}
    `) as unknown as TypedDocumentString<
  RemovePaymentMethodMutation,
  RemovePaymentMethodMutationVariables
>;
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
      assets(input: {take: 1}) {
        items {
          id
          source
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
  assets {
    items {
      id
      name
      source
      order
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
    mutation RemoveProduct($ids: [ID!]!) {
  softRemoveProduct(ids: $ids)
}
    `) as unknown as TypedDocumentString<RemoveProductMutation, RemoveProductMutationVariables>;
export const GetAllHandlersDocument = new TypedDocumentString(`
    query GetAllHandlers {
  shippingHandlers {
    ...CommonShippingHandlers
  }
}
    fragment CommonShippingHandlers on ShippingHandler {
  id
  metadata
  name
}`) as unknown as TypedDocumentString<GetAllHandlersQuery, GetAllHandlersQueryVariables>;
export const CreateShippingMethodDocument = new TypedDocumentString(`
    mutation CreateShippingMethod($input: CreateShippingMethodInput!) {
  createShippingMethod(input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<
  CreateShippingMethodMutation,
  CreateShippingMethodMutationVariables
>;
export const UpdateShippingMethodDocument = new TypedDocumentString(`
    mutation UpdateShippingMethod($id: ID!, $input: UpdateShippingMethodInput!) {
  updateShippingMethod(id: $id, input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<
  UpdateShippingMethodMutation,
  UpdateShippingMethodMutationVariables
>;
export const RemoveShippingMethodDocument = new TypedDocumentString(`
    mutation RemoveShippingMethod($id: ID!) {
  removeShippingMethod(id: $id)
}
    `) as unknown as TypedDocumentString<
  RemoveShippingMethodMutation,
  RemoveShippingMethodMutationVariables
>;
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
export const GetAllZonesDocument = new TypedDocumentString(`
    query getAllZones {
  zones {
    id
    name
    shippingMethods {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<GetAllZonesQuery, GetAllZonesQueryVariables>;
export const GetZoneDocument = new TypedDocumentString(`
    query GetZone($id: ID!) {
  zone(id: $id) {
    ...CommonZone
  }
}
    fragment CommonZone on Zone {
  id
  name
  createdAt
  states {
    id
    name
    country {
      id
      name
    }
  }
  shippingMethods {
    id
    name
    description
    enabled
    handlerMetadata
    handler {
      id
    }
    pricePreview
  }
}`) as unknown as TypedDocumentString<GetZoneQuery, GetZoneQueryVariables>;
export const CreateZoneDocument = new TypedDocumentString(`
    mutation CreateZone($input: CreateZoneInput!) {
  createZone(input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreateZoneMutation, CreateZoneMutationVariables>;
export const UpdateZoneDocument = new TypedDocumentString(`
    mutation UpdateZone($id: ID!, $input: UpdateZoneInput!) {
  updateZone(id: $id, input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<UpdateZoneMutation, UpdateZoneMutationVariables>;
export const RemoveZoneDocument = new TypedDocumentString(`
    mutation RemoveZone($id: ID!) {
  removeZone(id: $id)
}
    `) as unknown as TypedDocumentString<RemoveZoneMutation, RemoveZoneMutationVariables>;
