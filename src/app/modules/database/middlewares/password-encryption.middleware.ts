import { Prisma } from '@prisma/client';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto';

const scrypt = promisify(_scrypt);

export const prismaPasswordMiddleware = async (
  params: Prisma.MiddlewareParams,
  next: (params: Prisma.MiddlewareParams) => Promise<any>,
) => {
  if (
    params.model === 'User' &&
    params.args.data?.password &&
    ['create', 'update'].includes(params.action)
  ) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(params.args.data.password, salt, 32)) as Buffer;

    params.args.data.password = `${hash.toString('hex')}.${salt}`;
  }

  return next(params);
};
