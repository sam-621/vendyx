import { Column, ManyToOne, Entity as TypeOrmEntity } from 'typeorm';

import { CustomerEntity } from './customer.entity';
import { EBlocEntity } from './ebloc-entity';

@TypeOrmEntity('address')
export class AddressEntity extends EBlocEntity {
  @Column('varchar')
  country: string;

  @Column('varchar', { name: 'full_name', nullable: true })
  fullName: string;

  @Column('varchar', { name: 'street_line_1' })
  streetLine1: string;

  @Column('varchar', { name: 'street_line_2', nullable: true })
  streetLine2: string;

  @Column('varchar')
  city: string;

  /**
   * State
   */
  @Column('varchar')
  province: string;

  @Column('varchar', { name: 'postal_code' })
  postalCode: string;

  @Column('text', { nullable: true })
  references: string;

  @ManyToOne(() => CustomerEntity, c => c.addresses)
  customer: CustomerEntity;
}
