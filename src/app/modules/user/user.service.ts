import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

import {
  User,
  CreateUserInput,
  UpdateUserInput,
} from '../../shared/types/graphql.schema';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: DatabaseService) {}

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  findOne(id: number): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  create(createUserInput: CreateUserInput): Promise<User> {
    return this.prismaService.user.create({
      data: createUserInput,
    });
  }

  remove(id: number): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }
}
