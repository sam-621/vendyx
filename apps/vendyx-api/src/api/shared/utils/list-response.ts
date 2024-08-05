import { List, Node } from '../types';

export class ListResponse<T extends Node> implements List {
  constructor(readonly items: T[], readonly count: number) {}
}
