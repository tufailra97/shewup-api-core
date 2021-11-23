import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/shared/services/bcrypt/bcrypt.module';

import { PrismaModule } from 'src/shared/services/prisma/prisma.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, BcryptModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
