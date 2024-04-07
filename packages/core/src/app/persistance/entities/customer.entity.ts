import { Column, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { AddressEntity } from './address.entity';
import { Entity } from './entity';
import { OrderEntity } from './order.entity';

@TypeOrmEntity('customer')
export class CustomerEntity extends Entity {
  @Column('varchar', { name: 'first_name', nullable: true })
  firstName: string;

  @Column('varchar', { name: 'last_name' })
  lastName: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column('char', { length: 2, name: 'phone_country_code', nullable: true })
  phoneCountryCode: string;

  @Column('boolean')
  enable: boolean;

  @OneToMany(() => OrderEntity, (o) => o.customer)
  orders: OrderEntity[];

  @OneToMany(() => AddressEntity, (a) => a.customer)
  addresses: AddressEntity[];
}
