import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppConfigService } from 'src/shared/services/app-configs/app.config.service';
import { AppConfigModule } from 'src/shared/services/app-configs/app.module';
import { BcryptModule } from 'src/shared/services/bcrypt/bcrypt.module';
import { PrismaModule } from 'src/shared/services/prisma/prisma.module';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    BcryptModule,
    UsersModule,
    PassportModule,
    AppConfigModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (appConfigService: AppConfigService) => ({
        secret: appConfigService.configs.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: appConfigService.configs.JWT_TOKEN_TTL
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
