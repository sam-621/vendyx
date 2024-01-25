import { Column, Entity as TypeOrmEntity } from 'typeorm';

import { Entity } from './entity';

@TypeOrmEntity('administrator')
export class AdminEntity extends Entity {
  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar')
  password: string;
}
