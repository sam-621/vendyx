import { Column, ManyToOne, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { CustomerEntity } from './customer.entity';
import { Entity } from './entity';
import { OrderEntity } from './order.entity';

@TypeOrmEntity('address')
export class AddressEntity extends Entity {
  @Column('varchar', { name: 'street_line_1' })
  streetLine1: string;

  @Column('varchar', { name: 'street_line_2', nullable: true })
  streetLine2: string;

  /**
   * Colony or neighborhood
   */
  @Column('varchar')
  suburb: string;

  @Column('varchar')
  city: string;

  /**
   * State
   */
  @Column('varchar')
  province: string;

  @Column('varchar')
  country: string;

  @Column('varchar', { name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column('char', { length: 2, name: 'phone_country_code', nullable: true })
  phoneCountryCode: string;

  @Column('varchar', { name: 'postal_code' })
  postalCode: string;

  @Column('text', { nullable: true })
  references: string;

  @OneToMany(() => OrderEntity, (o) => o.address)
  orders: OrderEntity[];

  @ManyToOne(() => CustomerEntity, (c) => c.addresses)
  customer: CustomerEntity;
}
