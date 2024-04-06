import { Column, ManyToOne, Entity as TypeOrmEntity } from 'typeorm';

import { Entity } from './entity';
import { OrderEntity } from './order.entity';
import { VariantEntity } from './variant.entity';

@TypeOrmEntity('order_line')
export class OrderLineEntity extends Entity {
  @Column('int', { name: 'unit_price' })
  unitPrice: number;

  @Column('int')
  quantity: number;

  @Column('int', { name: 'line_price' })
  linePrice: number;

  @ManyToOne(() => OrderEntity, (o) => o.lines)
  order: OrderEntity;

  @ManyToOne(() => VariantEntity, (v) => v.orderLines)
  productVariant: VariantEntity;
}
