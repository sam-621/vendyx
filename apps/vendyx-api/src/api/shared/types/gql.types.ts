
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum OrderErrorCode {
    NOT_ENOUGH_STOCK = "NOT_ENOUGH_STOCK",
    CUSTOMER_INVALID_EMAIL = "CUSTOMER_INVALID_EMAIL",
    CUSTOMER_DISABLED = "CUSTOMER_DISABLED",
    MISSING_SHIPPING_ADDRESS = "MISSING_SHIPPING_ADDRESS",
    SHIPPING_METHOD_NOT_FOUND = "SHIPPING_METHOD_NOT_FOUND",
    PAYMENT_METHOD_NOT_FOUND = "PAYMENT_METHOD_NOT_FOUND",
    PAYMENT_DECLINED = "PAYMENT_DECLINED",
    ORDER_TRANSITION_ERROR = "ORDER_TRANSITION_ERROR",
    PAYMENT_FAILED = "PAYMENT_FAILED",
    FORBIDDEN_ORDER_ACTION = "FORBIDDEN_ORDER_ACTION"
}

export enum UserErrorCode {
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS"
}

export enum AssetType {
    IMAGE = "IMAGE"
}

export enum CustomerErrorCode {
    INVALID_EMAIL = "INVALID_EMAIL",
    EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS"
}

export enum OrderState {
    MODIFYING = "MODIFYING",
    PAYMENT_ADDED = "PAYMENT_ADDED",
    PAYMENT_AUTHORIZED = "PAYMENT_AUTHORIZED",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELED = "CANCELED"
}

export class CreateOptionInput {
    order: number;
    name: string;
    values: CreateOptionValueInput[];
}

export class CreateOptionValueInput {
    order: number;
    name: string;
}

export class UpdateOptionInput {
    order?: Nullable<number>;
    name?: Nullable<string>;
    values?: Nullable<UpdateOptionValueInput[]>;
}

export class UpdateOptionValueInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    order?: Nullable<number>;
}

export class MarkOrderAsShippedInput {
    carrier: string;
    trackingCode: string;
}

export class OrderListInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
    filters?: Nullable<OrderFilters>;
}

export class OrderFilters {
    code?: Nullable<string>;
    state?: Nullable<OrderState>;
    customer?: Nullable<StringFilter>;
}

export class CreatePaymentMethodInput {
    integrationId: string;
    integrationMetadata: JSON;
    enabled?: Nullable<boolean>;
}

export class UpdatePaymentMethodInput {
    integrationMetadata?: Nullable<JSON>;
    enabled?: Nullable<boolean>;
}

export class CreateProductInput {
    name: string;
    description?: Nullable<string>;
    enabled?: Nullable<boolean>;
    archived?: Nullable<boolean>;
    assets?: Nullable<AssetInProductInput[]>;
}

export class UpdateProductInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    enabled?: Nullable<boolean>;
    archived?: Nullable<boolean>;
    assets?: Nullable<AssetInProductInput[]>;
}

export class AssetInProductInput {
    id: string;
    order: number;
}

export class ProductListInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
    filters?: Nullable<ProductFilters>;
}

export class ProductFilters {
    name?: Nullable<StringFilter>;
    enabled?: Nullable<BooleanFilter>;
    archived?: Nullable<BooleanFilter>;
}

export class CreateShippingMethodInput {
    name: string;
    description?: Nullable<string>;
    enabled?: Nullable<boolean>;
    handlerMetadata: JSON;
    handlerId: string;
    zoneId: string;
}

export class UpdateShippingMethodInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    enabled?: Nullable<boolean>;
    handlerMetadata?: Nullable<JSON>;
}

export class CreateShopInput {
    name: string;
}

export class UpdateShopInput {
    name?: Nullable<string>;
}

export class CreateUserInput {
    email: string;
    password: string;
}

export class UpdateUserInput {
    email?: Nullable<string>;
}

export class GenerateUserAccessTokenInput {
    email: string;
    password: string;
}

export class CreateVariantInput {
    salePrice: number;
    stock?: Nullable<number>;
    sku?: Nullable<string>;
    comparisonPrice?: Nullable<number>;
    costPerUnit?: Nullable<number>;
    requiresShipping?: Nullable<boolean>;
    optionValues?: Nullable<string[]>;
}

export class UpdateVariantInput {
    salePrice?: Nullable<number>;
    stock?: Nullable<number>;
    sku?: Nullable<string>;
    comparisonPrice?: Nullable<number>;
    costPerUnit?: Nullable<number>;
    requiresShipping?: Nullable<boolean>;
    optionValues?: Nullable<string[]>;
}

export class CreateZoneInput {
    name: string;
    stateIds: string[];
}

export class UpdateZoneInput {
    name?: Nullable<string>;
    stateIds?: Nullable<string[]>;
}

export class ListInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
}

export class StringFilter {
    equals?: Nullable<string>;
    contains?: Nullable<string>;
}

export class BooleanFilter {
    equals?: Nullable<boolean>;
}

export class CreateOrderInput {
    line?: Nullable<CreateOrderLineInput>;
}

export class CreateOrderLineInput {
    productVariantId: string;
    quantity: number;
}

export class UpdateOrderLineInput {
    quantity: number;
}

export class AddCustomerToOrderInput {
    firstName?: Nullable<string>;
    lastName: string;
    email: string;
    phoneNumber?: Nullable<string>;
}

export class CreateAddressInput {
    country: string;
    streetLine1: string;
    streetLine2?: Nullable<string>;
    city: string;
    province: string;
    postalCode: string;
    references?: Nullable<string>;
}

export class AddPaymentToOrderInput {
    methodId: string;
}

export class AddShipmentToOrderInput {
    methodId: string;
}

export interface Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface List {
    items: Node[];
    count: number;
    pageInfo: PageInfo;
}

export class Country implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    states: State[];
}

export class State implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    country: Country;
}

export abstract class IQuery {
    abstract countries(): Country[] | Promise<Country[]>;

    abstract orders(input?: Nullable<OrderListInput>): OrderList | Promise<OrderList>;

    abstract paymentMethod(id: string): Nullable<PaymentMethod> | Promise<Nullable<PaymentMethod>>;

    abstract paymentMethods(): PaymentMethod[] | Promise<PaymentMethod[]>;

    abstract paymentIntegrations(): PaymentIntegration[] | Promise<PaymentIntegration[]>;

    abstract products(input?: Nullable<ProductListInput>): ProductList | Promise<ProductList>;

    abstract shippingMethods(): ShippingMethod[] | Promise<ShippingMethod[]>;

    abstract shippingHandlers(): ShippingHandler[] | Promise<ShippingHandler[]>;

    abstract shop(slug: string): Nullable<Shop> | Promise<Nullable<Shop>>;

    abstract shops(input?: Nullable<ListInput>): ShopList | Promise<ShopList>;

    abstract user(accessToken: string): Nullable<User> | Promise<Nullable<User>>;

    abstract validateAccessToken(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract variant(id: string): Nullable<Variant> | Promise<Nullable<Variant>>;

    abstract zones(): Zone[] | Promise<Zone[]>;

    abstract zone(id: string): Zone | Promise<Zone>;

    abstract order(id?: Nullable<string>, code?: Nullable<string>): Nullable<Order> | Promise<Nullable<Order>>;

    abstract product(id?: Nullable<string>): Nullable<Product> | Promise<Nullable<Product>>;

    abstract availableShippingMethods(orderId: string): ShippingMethod[] | Promise<ShippingMethod[]>;

    abstract availablePaymentMethods(orderId: string): PaymentMethod[] | Promise<PaymentMethod[]>;
}

export class Option implements Node {
    order: number;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    values: OptionValue[];
}

export class OptionValue implements Node {
    order: number;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    option: Option;
}

export abstract class IMutation {
    abstract createOption(productId: string, input: CreateOptionInput): Option | Promise<Option>;

    abstract updateOption(id: string, input: UpdateOptionInput): Option | Promise<Option>;

    abstract softRemoveOption(id: string): Option | Promise<Option>;

    abstract softRemoveOptionValues(ids: string[]): boolean | Promise<boolean>;

    abstract markOrderAsShipped(id: string, input: MarkOrderAsShippedInput): OrderResult | Promise<OrderResult>;

    abstract markOrderAsDelivered(id: string): OrderResult | Promise<OrderResult>;

    abstract cancelOrder(id: string): OrderResult | Promise<OrderResult>;

    abstract createPaymentMethod(input: CreatePaymentMethodInput): PaymentMethod | Promise<PaymentMethod>;

    abstract updatePaymentMethod(id: string, input: UpdatePaymentMethodInput): PaymentMethod | Promise<PaymentMethod>;

    abstract removePaymentMethod(id: string): boolean | Promise<boolean>;

    abstract createProduct(input: CreateProductInput): Product | Promise<Product>;

    abstract updateProduct(id: string, input: UpdateProductInput): Product | Promise<Product>;

    abstract softRemoveProduct(ids: string[]): boolean | Promise<boolean>;

    abstract createShippingMethod(input: CreateShippingMethodInput): ShippingMethod | Promise<ShippingMethod>;

    abstract updateShippingMethod(id: string, input: UpdateShippingMethodInput): ShippingMethod | Promise<ShippingMethod>;

    abstract removeShippingMethod(id: string): boolean | Promise<boolean>;

    abstract createShop(input: CreateShopInput): Shop | Promise<Shop>;

    abstract createUser(input: CreateUserInput): UserResult | Promise<UserResult>;

    abstract updateUser(id: string, input: UpdateUserInput): UserResult | Promise<UserResult>;

    abstract generateUserAccessToken(input: GenerateUserAccessTokenInput): UserAccessTokenResult | Promise<UserAccessTokenResult>;

    abstract createVariant(productId: string, input: CreateVariantInput): Variant | Promise<Variant>;

    abstract updateVariant(id: string, input: UpdateVariantInput): Variant | Promise<Variant>;

    abstract softRemoveVariant(id: string): Variant | Promise<Variant>;

    abstract createZone(input: CreateZoneInput): Zone | Promise<Zone>;

    abstract updateZone(id: string, input: UpdateZoneInput): Zone | Promise<Zone>;

    abstract removeZone(id: string): boolean | Promise<boolean>;

    abstract createOrder(input: CreateOrderInput): OrderResult | Promise<OrderResult>;

    abstract addLineToOrder(orderId: string, input: CreateOrderLineInput): OrderResult | Promise<OrderResult>;

    abstract updateOrderLine(lineId: string, input: UpdateOrderLineInput): OrderResult | Promise<OrderResult>;

    abstract removeOrderLine(lineId: string): OrderResult | Promise<OrderResult>;

    abstract addCustomerToOrder(orderId: string, input: AddCustomerToOrderInput): OrderResult | Promise<OrderResult>;

    abstract addShippingAddressToOrder(orderId: string, input: CreateAddressInput): OrderResult | Promise<OrderResult>;

    abstract addShipmentToOrder(orderId: string, input: AddShipmentToOrderInput): OrderResult | Promise<OrderResult>;

    abstract addPaymentToOrder(orderId: string, input: AddPaymentToOrderInput): OrderResult | Promise<OrderResult>;
}

export class OrderResult {
    order?: Nullable<Order>;
    apiErrors: OrderErrorResult[];
}

export class OrderErrorResult {
    code: OrderErrorCode;
    message: string;
}

export class PaymentMethod {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    icon: string;
    enabled: boolean;
    integrationMetadata: JSON;
}

export class PaymentIntegration {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    icon: string;
    metadata: JSON;
}

export class ShippingMethod implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description?: Nullable<string>;
    enabled: boolean;
    handlerMetadata: JSON;
    handler: ShippingHandler;
    pricePreview: number;
}

export class ShippingHandler implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    metadata: JSON;
}

export class Shop implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    slug: string;
    owner: User;
}

export class ShopList implements List {
    items: Shop[];
    count: number;
    pageInfo: PageInfo;
}

export class User implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    shops: ShopList;
}

export class UserList implements List {
    items: User[];
    count: number;
    pageInfo: PageInfo;
}

export class UserAccessTokenResult {
    apiErrors: UserErrorResult[];
    accessToken?: Nullable<string>;
}

export class UserResult {
    user?: Nullable<User>;
    apiErrors: UserErrorResult[];
}

export class UserErrorResult {
    code: UserErrorCode;
    message: string;
}

export class Zone implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    shippingMethods: ShippingMethod[];
    states: State[];
}

export class Address implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    country: string;
    fullName?: Nullable<string>;
    streetLine1: string;
    streetLine2?: Nullable<string>;
    city: string;
    province: string;
    postalCode: string;
    references?: Nullable<string>;
}

export class AddressList implements List {
    items: Address[];
    count: number;
    pageInfo: PageInfo;
}

export class Asset implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    source: string;
    type: AssetType;
    order: number;
}

export class AssetList implements List {
    items: Asset[];
    count: number;
    pageInfo: PageInfo;
}

export class PageInfo {
    total: number;
}

export class Customer implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    firstName?: Nullable<string>;
    lastName: string;
    email: string;
    phoneNumber?: Nullable<string>;
    enabled: boolean;
    orders: OrderList;
    addresses: AddressList;
}

export class CustomerList implements List {
    items: Customer[];
    count: number;
    pageInfo: PageInfo;
}

export class CustomerResult {
    customer?: Nullable<Customer>;
    apiErrors: CustomerErrorResult[];
}

export class CustomerErrorResult {
    code: CustomerErrorCode;
    message: string;
}

export class OptionList implements List {
    items: Option[];
    count: number;
    pageInfo: PageInfo;
}

export class OrderLine implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    unitPrice: number;
    quantity: number;
    linePrice: number;
    productVariant: Variant;
}

export class OrderLineList implements List {
    items: OrderLine[];
    count: number;
    pageInfo: PageInfo;
}

export class Order implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    code: string;
    state: OrderState;
    total: number;
    subtotal: number;
    placedAt?: Nullable<Date>;
    totalQuantity: number;
    lines?: OrderLineList;
    customer?: Nullable<Customer>;
    shippingAddress?: Nullable<OrderShippingAddressJson>;
    payment?: Nullable<Payment>;
    shipment?: Nullable<Shipment>;
}

export class OrderShippingAddressJson {
    country: string;
    fullName?: Nullable<string>;
    streetLine1: string;
    streetLine2?: Nullable<string>;
    city: string;
    province: string;
    postalCode: string;
    references?: Nullable<string>;
}

export class OrderList implements List {
    items: Order[];
    count: number;
    pageInfo: PageInfo;
}

export class Payment implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    transactionId?: Nullable<string>;
    amount: number;
    method: string;
}

export class Product implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    slug: string;
    description?: Nullable<string>;
    enabled: boolean;
    archived: boolean;
    variants?: VariantList;
    assets?: AssetList;
    options: Option[];
}

export class ProductList implements List {
    items: Product[];
    count: number;
    pageInfo: PageInfo;
}

export class Shipment implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    trackingCode?: Nullable<string>;
    carrier?: Nullable<string>;
    amount: number;
    method: string;
    order: Order;
}

export class Variant implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    sku?: Nullable<string>;
    salePrice: number;
    stock: number;
    comparisonPrice?: Nullable<number>;
    costPerUnit?: Nullable<number>;
    requiresShipping: boolean;
    optionValues: OptionValue[];
    product: Product;
}

export class VariantList implements List {
    items: Variant[];
    count: number;
    pageInfo: PageInfo;
}

export type JSON = any;
type Nullable<T> = T | null;
