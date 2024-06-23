import { Column, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from './ebloc-entity';

@TypeOrmEntity('administrator')
export class AdminEntity extends EBlocEntity {
  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar')
  password: string;
}
