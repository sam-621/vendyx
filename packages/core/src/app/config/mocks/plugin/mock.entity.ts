import { Column, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from '@/app/persistance';

@TypeOrmEntity('hello-world')
export class HelloWorldEntity extends EBlocEntity {
  @Column('varchar')
  name: string;

  @Column('boolean', { default: true })
  enabled: boolean;
}
