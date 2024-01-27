import * as path from 'path';

import { Module } from '@nestjs/common';

import { AdminApiModule } from './admin';
import { GraphqlApiModule } from './common/graphql-api.module';
import { UploadModule } from './upload';

const COMMON_SCHEMA_PATH = './common/**/*.schema.gql';
const ADMIN_API_SCHEMA_PATH = './admin/**/*.schema.gql';

@Module({
  imports: [
    UploadModule,
    GraphqlApiModule.register({
      include: [AdminApiModule],
      path: '/admin-api',
      typePaths: [COMMON_SCHEMA_PATH, ADMIN_API_SCHEMA_PATH].map((p) =>
        path.join(process.cwd(), './src/app/api', p),
      ),
    }),
  ],
})
export class ApiModule {}
