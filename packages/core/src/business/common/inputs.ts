import { FindManyOptions, FindOneOptions } from 'typeorm';

import { ListInput } from '@/api/common';

export type FindUniqueInput<Entity> = FindOneOptions<Entity>['where'] & {
  relations?: FindOneOptions<Entity>['relations'];
};

export type FindInput<Entity> = ListInput &
  FindManyOptions<Entity>['where'] & {
    relations?: FindManyOptions<Entity>['relations'];
  };
