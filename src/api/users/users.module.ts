import { Module } from '@nestjs/common';

import { AppConfigService } from 'src/common/services/app.config.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AppConfigService, PrismaService]
})
export class UsersModule {}
