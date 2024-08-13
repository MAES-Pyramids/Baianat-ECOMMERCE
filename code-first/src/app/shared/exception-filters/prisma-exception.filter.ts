import {
  Catch,
  NotFoundException,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements GqlExceptionFilter {
  catch(exception: PrismaClientKnownRequestError) {
    switch (exception.code) {
      case 'P2025': {
        return new NotFoundException('Record not found');
      }
      case 'P2002': {
        const targets = exception.meta?.target as string[];
        if (targets && targets.includes('email')) {
          return new ConflictException('Email already exists');
        } else return new ConflictException('Unique constraint failed');
      }
      case 'P2003': {
        return new UnprocessableEntityException('Referenced entity not exist');
      }
      default: {
        return new Error('An unexpected error occurred');
      }
    }
  }
}
