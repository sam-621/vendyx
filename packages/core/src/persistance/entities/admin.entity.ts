import { Column, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from './ebloc-entity';

@TypeOrmEntity('administrator')
export class AdminEntity extends EBlocEntity {
  /**
   * The admin's username
   */
  @Column('varchar', { unique: true })
  username: string;

  /**
   * The admin's password
   */
  @Column('varchar', { select: false })
  password: string;
}
