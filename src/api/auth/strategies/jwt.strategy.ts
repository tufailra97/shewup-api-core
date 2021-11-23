import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AppConfigService } from 'src/shared/services/app-configs/app.config.service';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly appConfigService: AppConfigService,
    private prismaService: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigService.configs.JWT_SECRET_KEY
    });
  }

  async validate(payload) {
    const user = await this.prismaService.users.findFirst({
      where: {
        id: payload.id
      }
    });

    if (user) {
      return user;
    }

    return null;
  }
}
