import { Column, JoinTable, ManyToMany, OneToMany, Entity as TypeOrmEntity } from 'typeorm';
import { EBlocEntity } from '@ebloc/core';

@TypeOrmEntity('hello-world')
export class HelloWorldEntity extends EBlocEntity {
  @Column('varchar')
  name: string;

  @Column('boolean', { default: true })
  enabled: boolean;
}
