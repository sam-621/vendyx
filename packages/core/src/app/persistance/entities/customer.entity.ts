import { Column, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { AddressEntity } from './address.entity';
import { EBlocEntity } from './ebloc-entity';
import { OrderEntity } from './order.entity';

@TypeOrmEntity('customer')
export class CustomerEntity extends EBlocEntity {
  @Column('varchar', { name: 'first_name', nullable: true })
  firstName: string;

  @Column('varchar', { name: 'last_name' })
  lastName: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar', { name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column('char', { length: 2, name: 'phone_country_code', nullable: true })
  phoneCountryCode: string;

  /**
   * @description
   * to customer be able to login, place orders, etc. the customer must be enabled
   *
   * @default true
   */
  @Column('boolean', { default: true })
  enabled: boolean;

  @OneToMany(() => OrderEntity, o => o.customer)
  orders: OrderEntity[];

  @OneToMany(() => AddressEntity, a => a.customer)
  addresses: AddressEntity[];
}
