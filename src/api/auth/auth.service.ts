import { Users } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BcryptService } from 'src/shared/services/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    const isCorrectPassword = await this.bcryptService.comparePassword(
      password,
      user.password
    );

    if (user && isCorrectPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: Users) {
    const payload = { user };

    return {
      token: this.jwtService.sign(payload)
    };
  }
}
