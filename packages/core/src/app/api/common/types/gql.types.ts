
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum AdminErrorCode {
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS"
}

export enum CollectionErrorCode {
    COLLECTION_NOT_FOUND = "COLLECTION_NOT_FOUND",
    NO_ID_OR_SLUG_PROVIDED = "NO_ID_OR_SLUG_PROVIDED",
    DUPLICATED_SLUG = "DUPLICATED_SLUG"
}

export enum OptionErrorCode {
    DUPLICATED_OPTION_VALUES = "DUPLICATED_OPTION_VALUES",
    OPTION_NOT_FOUND = "OPTION_NOT_FOUND",
    OPTION_VALUE_NOT_FOUND = "OPTION_VALUE_NOT_FOUND"
}

export enum OrderErrorCode {
    ORDER_NOT_FOUND = "ORDER_NOT_FOUND",
    LINE_NOT_FOUND = "LINE_NOT_FOUND",
    VARIANT_NOT_FOUND = "VARIANT_NOT_FOUND",
    ORDER_TRANSITION_ERROR = "ORDER_TRANSITION_ERROR",
    NOT_ENOUGH_STOCK = "NOT_ENOUGH_STOCK",
    CUSTOMER_INVALID_EMAIL = "CUSTOMER_INVALID_EMAIL",
    CUSTOMER_DISABLED = "CUSTOMER_DISABLED",
    SHIPPING_METHOD_NOT_FOUND = "SHIPPING_METHOD_NOT_FOUND",
    MISSING_SHIPPING_ADDRESS = "MISSING_SHIPPING_ADDRESS",
    MISSING_SHIPPING_PRICE_CALCULATOR = "MISSING_SHIPPING_PRICE_CALCULATOR",
    MISSING_PAYMENT_INTEGRATION = "MISSING_PAYMENT_INTEGRATION",
    PAYMENT_METHOD_NOT_FOUND = "PAYMENT_METHOD_NOT_FOUND",
    PAYMENT_DECLINED = "PAYMENT_DECLINED"
}

export enum ProductErrorCode {
    PRODUCT_NOT_FOUND = "PRODUCT_NOT_FOUND",
    NO_ID_OR_SLUG_PROVIDED = "NO_ID_OR_SLUG_PROVIDED",
    DUPLICATED_SLUG = "DUPLICATED_SLUG",
    PRODUCT_HAS_VARIANTS = "PRODUCT_HAS_VARIANTS"
}

export enum VariantErrorCode {
    VARIANT_NOT_FOUND = "VARIANT_NOT_FOUND",
    PRODUCT_NOT_FOUND = "PRODUCT_NOT_FOUND"
}

export enum AssetType {
    IMAGE = "IMAGE"
}

export enum CustomerErrorCode {
    INVALID_ACCESS_TOKEN = "INVALID_ACCESS_TOKEN",
    PASSWORDS_DO_NOT_MATCH = "PASSWORDS_DO_NOT_MATCH",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    CUSTOMER_NOT_FOUND = "CUSTOMER_NOT_FOUND",
    INVALID_EMAIL = "INVALID_EMAIL",
    EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS"
}

export enum OrderState {
    MODIFYING = "MODIFYING",
    PAYMENT_ADDED = "PAYMENT_ADDED",
    PAYMENT_AUTHORIZED = "PAYMENT_AUTHORIZED",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED"
}

export class AuthenticateInput {
    username: string;
    password: string;
}

export class CreateCollectionInput {
    name: string;
    slug: string;
    description?: Nullable<string>;
    enabled?: Nullable<boolean>;
}

export class UpdateCollectionInput {
    name?: Nullable<string>;
    slug?: Nullable<string>;
    description?: Nullable<string>;
    enabled?: Nullable<boolean>;
}

export class UpdateCustomerInput {
    enabled?: Nullable<boolean>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    phoneCountryCode?: Nullable<string>;
}

export class CreateOptionInput {
    name: string;
    values?: Nullable<string[]>;
}

export class UpdateOptionInput {
    name?: Nullable<string>;
}

export class UpdateOptionValueInput {
    id: string;
    value: string;
}

export class MarkOrderAsShippedInput {
    carrier: string;
    trackingCode: string;
}

export class CreateProductInput {
    name: string;
    slug: string;
    description?: Nullable<string>;
    published: boolean;
    onlineOnly: boolean;
    assetsIds?: Nullable<string[]>;
}

export class UpdateProductInput {
    name?: Nullable<string>;
    slug?: Nullable<string>;
    description?: Nullable<string>;
    published?: Nullable<boolean>;
    onlineOnly?: Nullable<boolean>;
    assetsIds?: Nullable<string[]>;
}

export class CreateVariantInput {
    sku: string;
    price: number;
    stock: number;
    published: boolean;
    optionValuesIds?: Nullable<string[]>;
}

export class UpdateVariantInput {
    sku?: Nullable<string>;
    price?: Nullable<number>;
    stock?: Nullable<number>;
    published?: Nullable<boolean>;
    optionValuesIds?: Nullable<string[]>;
}

export class CreateAddressInput {
    streetLine1: string;
    streetLine2?: Nullable<string>;
    city: string;
    province: string;
    country: string;
    phoneNumber?: Nullable<string>;
    phoneCountryCode?: Nullable<string>;
    postalCode: string;
    references?: Nullable<string>;
}

export class ListInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
}

export class CreateCustomerInput {
    firstName?: Nullable<string>;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: Nullable<string>;
    phoneCountryCode?: Nullable<string>;
}

export class UpdateCustomerPasswordInput {
    password: string;
    newPassword: string;
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
    phoneCountryCode?: Nullable<string>;
}

export class AddPaymentToOrderInput {
    methodId: string;
}

export class AddShipmentToOrderInput {
    shippingMethodId: string;
}

export interface VariantResult {
    variant?: Nullable<Variant>;
    apiErrors: VariantErrorResult[];
}

export interface Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface List {
    items: Node[];
    count: number;
}

export class Admin implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    password: string;
}

export abstract class IMutation {
    abstract authenticate(input: AuthenticateInput): AuthenticateResult | Promise<AuthenticateResult>;

    abstract createCollection(input: CreateCollectionInput): CollectionResult | Promise<CollectionResult>;

    abstract updateCollection(id: string, input: UpdateCollectionInput): CollectionResult | Promise<CollectionResult>;

    abstract removeCollection(id: string): RemoveCollectionResult | Promise<RemoveCollectionResult>;

    abstract setProductsInCollection(id: string, productIds: string[]): CollectionResult | Promise<CollectionResult>;

    abstract updateCustomer(id: string, input: UpdateCustomerInput, accessToken: string): CustomerResult | Promise<CustomerResult>;

    abstract createOption(input: CreateOptionInput): OptionResult | Promise<OptionResult>;

    abstract updateOption(id: string, input: UpdateOptionInput): OptionResult | Promise<OptionResult>;

    abstract removeOption(id: string): RemoveOptionResult | Promise<RemoveOptionResult>;

    abstract addOptionValues(optionId: string, values: string[]): OptionResult | Promise<OptionResult>;

    abstract updateOptionValues(input: UpdateOptionValueInput[]): UpdateOptionValueResult | Promise<UpdateOptionValueResult>;

    abstract removeOptionValues(ids: string[]): OptionResult | Promise<OptionResult>;

    abstract markOrderAsShipped(id: string, input: MarkOrderAsShippedInput): OrderResult | Promise<OrderResult>;

    abstract markOrderAsDelivered(id: string): OrderResult | Promise<OrderResult>;

    abstract createProduct(input: CreateProductInput): ProductResult | Promise<ProductResult>;

    abstract updateProduct(id: string, input: UpdateProductInput): ProductResult | Promise<ProductResult>;

    abstract removeProduct(id: string): RemoveProductResult | Promise<RemoveProductResult>;

    abstract setCollectionsInProduct(id: string, collectionIds: string[]): ProductResult | Promise<ProductResult>;

    abstract createVariant(productId: string, input: CreateVariantInput): CreateVariantResult | Promise<CreateVariantResult>;

    abstract updateVariant(id: string, input: UpdateVariantInput): UpdateVariantResult | Promise<UpdateVariantResult>;

    abstract removeVariant(id: string): RemoveVariantResult | Promise<RemoveVariantResult>;

    abstract createCustomer(input: CreateCustomerInput): CustomerResult | Promise<CustomerResult>;

    abstract updateCustomerPassword(accessToken: string, input: UpdateCustomerPasswordInput): CustomerResult | Promise<CustomerResult>;

    abstract addAddressToCustomer(accessToken: string, input: CreateAddressInput): CustomerResult | Promise<CustomerResult>;

    abstract generateCustomerAccessToken(email: string, password: string): GenerateCustomerAccessTokenResult | Promise<GenerateCustomerAccessTokenResult>;

    abstract requestRecoveryCustomerPassword(email: string): CustomerResult | Promise<CustomerResult>;

    abstract recoverCustomerPassword(urlToken: string, password: string): CustomerResult | Promise<CustomerResult>;

    abstract createOrder(input?: Nullable<CreateOrderInput>): OrderResult | Promise<OrderResult>;

    abstract addLineToOrder(orderId: string, input: CreateOrderLineInput): OrderResult | Promise<OrderResult>;

    abstract updateOrderLine(lineId: string, input: UpdateOrderLineInput): OrderResult | Promise<OrderResult>;

    abstract removeOrderLine(lineId: string): OrderResult | Promise<OrderResult>;

    abstract addCustomerToOrder(orderId: string, input: AddCustomerToOrderInput): OrderResult | Promise<OrderResult>;

    abstract addShippingAddressToOrder(orderId: string, input: CreateAddressInput): OrderResult | Promise<OrderResult>;

    abstract addPaymentToOrder(orderId: string, input: AddPaymentToOrderInput): OrderResult | Promise<OrderResult>;

    abstract addShipmentToOrder(orderId: string, input: AddShipmentToOrderInput): OrderResult | Promise<OrderResult>;
}

export abstract class IQuery {
    abstract validateToken(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract customers(input?: Nullable<ListInput>): CustomerList | Promise<CustomerList>;

    abstract customer(id: string, accessToken: string): Nullable<Customer> | Promise<Nullable<Customer>>;

    abstract orders(input?: Nullable<ListInput>): Nullable<OrderList> | Promise<Nullable<OrderList>>;

    abstract collections(input?: Nullable<ListInput>): CollectionList | Promise<CollectionList>;

    abstract collection(id?: Nullable<string>, slug?: Nullable<string>): Nullable<Collection> | Promise<Nullable<Collection>>;

    abstract order(id?: Nullable<string>, code?: Nullable<string>): Nullable<Order> | Promise<Nullable<Order>>;

    abstract products(input?: Nullable<ListInput>): ProductList | Promise<ProductList>;

    abstract product(id?: Nullable<string>, slug?: Nullable<string>): Nullable<Product> | Promise<Nullable<Product>>;

    abstract variants(input?: Nullable<ListInput>): VariantList | Promise<VariantList>;

    abstract variant(id: string): Nullable<Variant> | Promise<Nullable<Variant>>;

    abstract availablePaymentMethods(): PaymentMethod[] | Promise<PaymentMethod[]>;

    abstract availableShippingMethods(): ShippingMethod[] | Promise<ShippingMethod[]>;
}

export class AuthenticateResult {
    authToken?: Nullable<string>;
    apiErrors: AdminErrorResult[];
}

export class AdminErrorResult {
    code: AdminErrorCode;
    message: string;
}

export class RemoveCollectionResult {
    success?: Nullable<boolean>;
    apiErrors: CollectionErrorResult[];
}

export class CollectionResult {
    collection?: Nullable<Collection>;
    apiErrors: CollectionErrorResult[];
}

export class CollectionErrorResult {
    code: CollectionErrorCode;
    message: string;
}

export class OptionResult {
    option?: Nullable<Option>;
    apiErrors: OptionErrorResult[];
}

export class RemoveOptionResult {
    success: boolean;
    apiErrors: OptionErrorResult[];
}

export class UpdateOptionValueResult {
    success: boolean;
    apiErrors: OptionErrorResult[];
}

export class OptionErrorResult {
    code: OptionErrorCode;
    message: string;
}

export class OrderResult {
    order?: Nullable<Order>;
    apiErrors: OrderErrorResult[];
}

export class OrderErrorResult {
    code: OrderErrorCode;
    message: string;
}

export class RemoveProductResult {
    success?: Nullable<boolean>;
    apiErrors: ProductErrorResult[];
}

export class ProductResult {
    product?: Nullable<Product>;
    apiErrors: ProductErrorResult[];
}

export class ProductErrorResult {
    code: ProductErrorCode;
    message: string;
}

export class CreateVariantResult implements VariantResult {
    variant?: Nullable<Variant>;
    apiErrors: VariantErrorResult[];
}

export class UpdateVariantResult implements VariantResult {
    variant?: Nullable<Variant>;
    apiErrors: VariantErrorResult[];
}

export class RemoveVariantResult {
    success?: Nullable<boolean>;
    apiErrors: VariantErrorResult[];
}

export class VariantErrorResult {
    code: VariantErrorCode;
    message: string;
}

export class Address implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    streetLine1: string;
    streetLine2?: Nullable<string>;
    city: string;
    province: string;
    country: string;
    phoneNumber?: Nullable<string>;
    phoneCountryCode?: Nullable<string>;
    postalCode: string;
    references?: Nullable<string>;
}

export class AddressList implements List {
    items: Address[];
    count: number;
}

export class Asset implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    source: string;
    type: AssetType;
}

export class AssetList implements List {
    items: Asset[];
    count: number;
}

export class Collection implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    slug: string;
    description?: Nullable<string>;
    enabled: string;
    products?: ProductList;
    assets?: AssetList;
}

export class CollectionList implements List {
    items: Collection[];
    count: number;
}

export class Customer implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    firstName?: Nullable<string>;
    lastName: string;
    email: string;
    phoneNumber?: Nullable<string>;
    phoneCountryCode?: Nullable<string>;
    enabled: boolean;
    orders: OrderList;
    addresses: AddressList;
}

export class CustomerList implements List {
    items: Customer[];
    count: number;
}

export class CustomerResult {
    customer?: Nullable<Customer>;
    apiErrors: CustomerErrorResult[];
}

export class CustomerErrorResult {
    code: CustomerErrorCode;
    message: string;
}

export class OptionValue implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    value: string;
    option: Option;
}

export class Option implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    values?: Nullable<OptionValue[]>;
}

export class OptionList implements List {
    items: Option[];
    count: number;
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
    lines: OrderLineList;
    customer?: Nullable<Customer>;
    shippingAddress?: Nullable<OrderShippingAddressJson>;
    payment?: Nullable<Payment>;
    shipment?: Nullable<Shipment>;
}

export class OrderShippingAddressJson {
    streetLine1: string;
    streetLine2?: Nullable<string>;
    city: string;
    province: string;
    country: string;
    phoneNumber?: Nullable<string>;
    phoneCountryCode?: Nullable<string>;
    postalCode: string;
    references?: Nullable<string>;
}

export class OrderList implements List {
    items: Order[];
    count: number;
}

export class PaymentMethod implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description?: Nullable<string>;
    enabled: boolean;
}

export class Payment implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    transactionId?: Nullable<string>;
    amount: number;
    method: PaymentMethod;
}

export class PaymentList implements List {
    items: Payment[];
    count: number;
}

export class Product implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    slug: string;
    description?: Nullable<string>;
    published: boolean;
    onlineOnly: boolean;
    variants?: VariantList;
    assets?: AssetList;
    options: Option[];
}

export class ProductList implements List {
    items: Product[];
    count: number;
}

export class Shipment implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    trackingCode?: Nullable<string>;
    carrier?: Nullable<string>;
    amount: number;
    order: Order;
    method: ShippingMethod;
}

export class ShipmentList implements List {
    items: Shipment[];
    count: number;
}

export class ShippingMethod implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description?: Nullable<string>;
    enabled: boolean;
}

export class Variant implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    sku: string;
    price: number;
    stock: number;
    published: boolean;
    optionValues?: Nullable<OptionValue[]>;
    product: Product;
}

export class VariantList implements List {
    items: Variant[];
    count: number;
}

export class GenerateCustomerAccessTokenResult {
    accessToken?: Nullable<string>;
    apiErrors: CustomerErrorResult[];
}

type Nullable<T> = T | null;
