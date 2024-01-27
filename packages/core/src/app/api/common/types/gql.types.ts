
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

export class ListInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
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
}

export abstract class IQuery {
    abstract validateToken(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract products(input?: Nullable<ListInput>): ProductList | Promise<ProductList>;

    abstract product(id?: Nullable<string>, slug?: Nullable<string>): Nullable<Product> | Promise<Nullable<Product>>;

    abstract variants(input?: Nullable<ListInput>): VariantList | Promise<VariantList>;

    abstract variant(id: string): Nullable<Variant> | Promise<Nullable<Variant>>;
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
    items: Nullable<Asset>[];
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
    items: Nullable<Option>[];
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
    items: Nullable<Product>[];
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
    items: Nullable<Variant>[];
    count: number;
}

type Nullable<T> = T | null;
