
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
    items: Node[];
    count: number;
}

export class Shop implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    owner: User;
}

export class ShopList implements List {
    items: Shop[];
    count: number;
}

export abstract class IQuery {
    abstract shop(id: string): Nullable<Shop> | Promise<Nullable<Shop>>;

    abstract shops(input?: Nullable<ListInput>): ShopList | Promise<ShopList>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createShop(ownerId: string, input: CreateShopInput): Shop | Promise<Shop>;

    abstract updateShop(id: string, input: UpdateShopInput): Shop | Promise<Shop>;

    abstract deleteShop(id: string): Shop | Promise<Shop>;

    abstract createUser(input: CreateUserInput): UserResult | Promise<UserResult>;

    abstract updateUser(id: string, input: UpdateUserInput): UserResult | Promise<UserResult>;

    abstract generateUserAccessToken(input: GenerateUserAccessTokenInput): UserAccessTokenResult | Promise<UserAccessTokenResult>;
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

export type JSON = any;
type Nullable<T> = T | null;
