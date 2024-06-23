import {
  CreateDateColumn,
  DeleteDateColumn,
  EntitySchema,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export abstract class EBlocEntity extends EntitySchema {
  @PrimaryGeneratedColumn('uuid')
  id: ID;

  // DESC - Newest first
  // ASC - Oldest first
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

export type ID = string;
