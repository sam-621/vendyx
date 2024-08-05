import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('ID')
export class IDScalar implements CustomScalar<string, string> {
  description = 'ID custom scalar type';

  parseValue(value: number): string {
    return String(value); // value from the client
  }

  serialize(value: string): string {
    return value; // value sent to the client
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind === Kind.INT) {
      return String(ast.value);
    }
    return '';
  }
}
