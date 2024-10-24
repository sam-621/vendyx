import { join } from 'path';

import { GraphQLDefinitionsFactory } from '@nestjs/graphql';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: [join(process.cwd(), 'src/api/**/*.gql')],
  path: join(process.cwd(), 'src/api/shared/types/gql.types.ts'),
  outputAs: 'class'
});
