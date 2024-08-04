
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateShopInput {
    name: string;
}

export class UpdateShopInput {
    name?: Nullable<string>;
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

export class Shop {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
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

    abstract users(input?: Nullable<ListInput>): UserList | Promise<UserList>;
}

export abstract class IMutation {
    abstract createShop(ownerId?: Nullable<string>, input: CreateShopInput): Shop | Promise<Shop>;

    abstract updateShop(shopId: string, input: UpdateShopInput): Shop | Promise<Shop>;

    abstract deleteShop(shopId: string): Shop | Promise<Shop>;
}

export class User {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    email: string;
    shops: ShopList;
}

export class UserList implements List {
    items: User[];
    count: number;
}

export type JSON = any;
type Nullable<T> = T | null;
