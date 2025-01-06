import { List, Node } from '../types/gql.types';

export class ListResponse<T extends Node> implements List {
  constructor(readonly items: T[], readonly count: number, readonly pageInfo: { total: number }) {}
}
