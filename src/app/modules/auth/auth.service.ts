import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthPayload, User } from '../../shared/types/graphql.schema';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });

    if (user && user.password === password) return _.omit(user, 'password');
    else return null;
  }

  async login(user: User): Promise<AuthPayload> {
    return { user, accessToken: 'jwt' };
  }
}
