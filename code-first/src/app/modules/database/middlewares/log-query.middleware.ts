import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const prismaQueryLoggerMiddleware: Prisma.Middleware = async (
  params: Prisma.MiddlewareParams,
  next: (params: Prisma.MiddlewareParams) => Promise<any>,
) => {
  const logger = new Logger('PrismaMiddleware');

  const before = Date.now();
  const result = await next(params);
  const after = Date.now();

  logger.warn(
    `Duration: ${after - before} ms, Query: ${params.model}.${params.action}`,
  );

  return result;
};
