import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ASTNode } from 'graphql';

@Scalar('JSON', () => Object)
export class JsonScalar implements CustomScalar<any, any> {
  description = 'JSON custom scalar type';

  parseValue(value: any): any {
    return value; // value from the client
  }

  serialize(value: any): any {
    return value; // value sent to the client
  }

  parseLiteral(ast: ASTNode): any {
    if (ast.kind === Kind.OBJECT) {
      const objectValue = ast as any;
      const result: any = {};

      objectValue.fields.forEach((field) => {
        result[field.name.value] = this.parseLiteral(field.value);
      });

      return result;
    }
    return null; // Ignore other kinds of AST nodes For Now
  }
}
