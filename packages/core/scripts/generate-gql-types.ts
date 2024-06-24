import { join } from 'path';

import { GraphQLDefinitionsFactory } from '@nestjs/graphql';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: [join(process.cwd(), 'src/**/*.schema.gql')],
  path: join(process.cwd(), 'src/app/api/common/types/gql.types.ts'),
  outputAs: 'class'
});
