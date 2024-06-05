
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

export enum OptionErrorCode {
    DUPLICATED_OPTION_VALUES = "DUPLICATED_OPTION_VALUES"
}

export enum ProductErrorCode {
    PRODUCT_NOT_FOUND = "PRODUCT_NOT_FOUND",
    NO_ID_OR_SLUG_PROVIDED = "NO_ID_OR_SLUG_PROVIDED",
    DUPLICATED_SLUG = "DUPLICATED_SLUG"
}

export enum VariantErrorCode {
    VARIANT_NOT_FOUND = "VARIANT_NOT_FOUND",
    PRODUCT_NOT_FOUND = "PRODUCT_NOT_FOUND"
}

export enum AssetType {
    IMAGE = "IMAGE"
}

export enum OrderState {
    MODIFYING = "MODIFYING",
    PAYMENT_ADDED = "PAYMENT_ADDED",
    PAYMENT_AUTHORIZED = "PAYMENT_AUTHORIZED",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED"
}

export enum OrderErrorCode {
    ORDER_NOT_FOUND = "ORDER_NOT_FOUND",
    LINE_NOT_FOUND = "LINE_NOT_FOUND",
    ORDER_TRANSITION_ERROR = "ORDER_TRANSITION_ERROR",
    NOT_ENOUGH_STOCK = "NOT_ENOUGH_STOCK",
    CUSTOMER_INVALID_EMAIL = "CUSTOMER_INVALID_EMAIL",
    SHIPPING_METHOD_NOT_FOUND = "SHIPPING_METHOD_NOT_FOUND",
    PAYMENT_METHOD_NOT_FOUND = "PAYMENT_METHOD_NOT_FOUND",
    PAYMENT_DECLINED = "PAYMENT_DECLINED"
}

export class AuthenticateInput {
    username: string;
    password: string;
}

export class CreateOptionInput {
    name: string;
    values?: Nullable<string[]>;
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
    phoneNumber?: Nullable<string>;
    phoneCountryCode?: Nullable<string>;
    enable: boolean;
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

export class AddPaymentToOrderInput {
    methodId: string;
}

export class AddShipmentToOrderInput {
    shippingMethodId: string;
}

export interface ProductResult {
    product?: Nullable<Product>;
    apiErrors: ProductErrorResult[];
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

    abstract createOption(input: CreateOptionInput): OptionResult | Promise<OptionResult>;

    abstract createProduct(input: CreateProductInput): CreateProductResult | Promise<CreateProductResult>;

    abstract updateProduct(id: string, input: UpdateProductInput): UpdateProductResult | Promise<UpdateProductResult>;

    abstract removeProduct(id: string): RemoveProductResult | Promise<RemoveProductResult>;

    abstract createVariant(productId: string, input: CreateVariantInput): CreateVariantResult | Promise<CreateVariantResult>;

    abstract updateVariant(id: string, input: UpdateVariantInput): UpdateVariantResult | Promise<UpdateVariantResult>;

    abstract removeVariant(id: string): RemoveVariantResult | Promise<RemoveVariantResult>;

    abstract createOrder(input?: Nullable<CreateOrderInput>): OrderResult | Promise<OrderResult>;

    abstract addLineToOrder(orderId: string, input: CreateOrderLineInput): OrderResult | Promise<OrderResult>;

    abstract updateOrderLine(lineId: string, input: UpdateOrderLineInput): OrderResult | Promise<OrderResult>;

    abstract removeOrderLine(lineId: string): OrderResult | Promise<OrderResult>;

    abstract addCustomerToOrder(orderId: string, input: CreateCustomerInput): OrderResult | Promise<OrderResult>;

    abstract addShippingAddressToOrder(orderId: string, input: CreateAddressInput): OrderResult | Promise<OrderResult>;

    abstract addPaymentToOrder(orderId: string, input: AddPaymentToOrderInput): OrderResult | Promise<OrderResult>;

    abstract addShipmentToOrder(orderId: string, input: AddShipmentToOrderInput): OrderResult | Promise<OrderResult>;
}

export abstract class IQuery {
    abstract validateToken(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract orders(input?: Nullable<ListInput>): Nullable<OrderList> | Promise<Nullable<OrderList>>;

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

export class OptionResult {
    option?: Nullable<Option>;
    apiErrors: OptionErrorResult[];
}

export class OptionErrorResult {
    code: OptionErrorCode;
    message: string;
}

export class CreateProductResult implements ProductResult {
    product?: Nullable<Product>;
    apiErrors: ProductErrorResult[];
}

export class UpdateProductResult implements ProductResult {
    product?: Nullable<Product>;
    apiErrors: ProductErrorResult[];
}

export class RemoveProductResult {
    success?: Nullable<boolean>;
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

export class Customer implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    firstName?: Nullable<string>;
    lastName: string;
    email: string;
    phoneNumber?: Nullable<string>;
    phoneCountryCode?: Nullable<string>;
    enable: boolean;
    orders?: Nullable<OrderList[]>;
    addresses?: Nullable<AddressList[]>;
}

export class CustomerList implements List {
    items: Customer[];
    count: number;
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
    shippingAddress?: Nullable<Address>;
    payment?: Nullable<Payment>;
    shipment?: Nullable<Shipment>;
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

export class OrderResult {
    order?: Nullable<Order>;
    apiErrors: OrderErrorResult[];
}

export class OrderErrorResult {
    code: OrderErrorCode;
    message: string;
}

type Nullable<T> = T | null;
