
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum UserErrorCode {
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS"
}

export enum AssetType {
    IMAGE = "IMAGE"
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

export class ProductFilters {
    name?: Nullable<StringFilter>;
    enabled?: Nullable<BooleanFilter>;
    achived?: Nullable<BooleanFilter>;
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

export class ProductListInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
    filters?: Nullable<ProductFilters>;
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

    abstract createProduct(input: CreateProductInput): Product | Promise<Product>;

    abstract updateProduct(id: string, input: UpdateProductInput): Product | Promise<Product>;

    abstract softRemoveProduct(ids: string[]): boolean | Promise<boolean>;

    abstract createShop(input: CreateShopInput): Shop | Promise<Shop>;

    abstract createUser(input: CreateUserInput): UserResult | Promise<UserResult>;

    abstract updateUser(id: string, input: UpdateUserInput): UserResult | Promise<UserResult>;

    abstract generateUserAccessToken(input: GenerateUserAccessTokenInput): UserAccessTokenResult | Promise<UserAccessTokenResult>;

    abstract createVariant(productId: string, input: CreateVariantInput): Variant | Promise<Variant>;

    abstract updateVariant(id: string, input: UpdateVariantInput): Variant | Promise<Variant>;

    abstract softRemoveVariant(id: string): Variant | Promise<Variant>;
}

export abstract class IQuery {
    abstract products(input?: Nullable<ProductListInput>): ProductList | Promise<ProductList>;

    abstract shop(slug: string): Nullable<Shop> | Promise<Nullable<Shop>>;

    abstract shops(input?: Nullable<ListInput>): ShopList | Promise<ShopList>;

    abstract user(accessToken: string): Nullable<User> | Promise<Nullable<User>>;

    abstract validateAccessToken(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract product(id?: Nullable<string>): Nullable<Product> | Promise<Nullable<Product>>;

    abstract variants(input?: Nullable<ListInput>): VariantList | Promise<VariantList>;

    abstract variant(id: string): Nullable<Variant> | Promise<Nullable<Variant>>;
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

export class OptionList implements List {
    items: Option[];
    count: number;
    pageInfo: PageInfo;
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
