
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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
    suburb: string;
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

export class CreateOrderLineInput {
    productVariantId: string;
    quantity: number;
}

export class UpdateOrderLineInput {
    quantity: number;
}

export class CreateOrderInput {
    lines?: Nullable<CreateOrderLineInput[]>;
}

export interface Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface List {
    items: Nullable<Node>[];
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
    abstract authenticate(input: AuthenticateInput): Nullable<string> | Promise<Nullable<string>>;

    abstract createOption(input: CreateOptionInput): Option | Promise<Option>;

    abstract createProduct(input: CreateProductInput): Product | Promise<Product>;

    abstract updateProduct(id: string, input: UpdateProductInput): Product | Promise<Product>;

    abstract removeProduct(id: string): boolean | Promise<boolean>;

    abstract createVariant(productId: string, input: CreateVariantInput): Variant | Promise<Variant>;

    abstract updateVariant(id: string, input: UpdateVariantInput): Variant | Promise<Variant>;

    abstract removeVariant(id: string): boolean | Promise<boolean>;

    abstract addOrderLineToOrder(orderId: string, input: CreateOrderLineInput): Order | Promise<Order>;

    abstract updateOrderLine(lineId: string, input: UpdateOrderLineInput): Order | Promise<Order>;

    abstract removeOrderLine(lineId: string): boolean | Promise<boolean>;

    abstract createOrder(input?: Nullable<CreateOrderInput>): Nullable<Order> | Promise<Nullable<Order>>;

    abstract addCustomerToOrder(orderId: string, input: CreateCustomerInput): Nullable<Order> | Promise<Nullable<Order>>;

    abstract addShippingAddressToOrder(orderId: string, input: CreateAddressInput): Nullable<Order> | Promise<Nullable<Order>>;
}

export abstract class IQuery {
    abstract validateToken(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract orders(input?: Nullable<ListInput>): Nullable<OrderList> | Promise<Nullable<OrderList>>;

    abstract products(input?: Nullable<ListInput>): ProductList | Promise<ProductList>;

    abstract product(id?: Nullable<string>, slug?: Nullable<string>): Nullable<Product> | Promise<Nullable<Product>>;

    abstract variants(input?: Nullable<ListInput>): VariantList | Promise<VariantList>;

    abstract variant(id: string): Nullable<Variant> | Promise<Nullable<Variant>>;

    abstract order(id?: Nullable<string>, code?: Nullable<string>): Nullable<Order> | Promise<Nullable<Order>>;
}

export class Address implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    streetLine1: string;
    streetLine2?: Nullable<string>;
    suburb: string;
    city: string;
    province: string;
    country: string;
    phoneNumber?: Nullable<string>;
    phoneCountryCode?: Nullable<string>;
    postalCode: string;
    references?: Nullable<string>;
}

export class AddressList implements List {
    items: Nullable<Address>[];
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
    addressed?: Nullable<AddressList[]>;
}

export class CustomerList implements List {
    items: Nullable<Customer>[];
    count: number;
}

export class OptionValue implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    value: string;
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
    items: Nullable<OrderLine>[];
    count: number;
}

export class Order implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    code?: Nullable<number>;
    state?: Nullable<OrderState>;
    total?: Nullable<number>;
    subtotal?: Nullable<number>;
    placedAt?: Nullable<Date>;
    totalQuantity?: Nullable<number>;
    lines?: Nullable<OrderLineList[]>;
    customer?: Nullable<Customer>;
    address?: Nullable<Address>;
    payment?: Nullable<Payment>;
    shipment?: Nullable<Shipment>;
}

export class OrderList implements List {
    items: Nullable<Order>[];
    count: number;
}

export class Payment implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    transactionId: string;
    amount: number;
}

export class PaymentList implements List {
    items: Nullable<Payment>[];
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
    amount?: Nullable<number>;
}

export class ShipmentList implements List {
    items: Nullable<Shipment>[];
    count: number;
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
}

export class VariantList implements List {
    items: Variant[];
    count: number;
}

type Nullable<T> = T | null;
