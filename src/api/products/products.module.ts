import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { PrismaModule } from 'src/shared/services/prisma/prisma.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [PrismaModule, TagsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
