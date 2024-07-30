import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export abstract class EBlocEntity {
  @PrimaryGeneratedColumn('uuid')
  id: ID;

  // DESC - Newest first - oldest last
  // ASC - Oldest first - newest last
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

export type ID = string;
export type ConfigurableProperty = {
  code: string;
  args: {
    key: string;
    value: string;
  }[];
};
