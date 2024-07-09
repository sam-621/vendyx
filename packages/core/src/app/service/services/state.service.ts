import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ListInput } from '@/app/api/common';
import { ID, StateEntity } from '@/app/persistance';

@Injectable()
export class StateService {
  constructor(@InjectDataSource() private db: DataSource) {}

  /**
   * Find all states. By default, it returns all states.
   */
  find(input: ListInput & { onlyEnabled?: boolean }) {
    return this.db.getRepository(StateEntity).find({
      ...clean(input),
      where: { enabled: input.onlyEnabled || undefined },
      order: { name: 'DESC' }
    });
  }

  /**
   * Find an state by its id.
   */
  findUnique({ id, onlyEnabled }: { id: ID; onlyEnabled?: boolean }) {
    return this.db.getRepository(StateEntity).findOne({
      where: { id, enabled: onlyEnabled || undefined }
    });
  }
}
