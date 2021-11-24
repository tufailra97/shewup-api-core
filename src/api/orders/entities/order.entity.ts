import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Orders } from '@prisma/client';

import { ProductDto } from '../dto/create-order.dto';

export class OrderEntity implements Orders {
  @ApiProperty()
  id: string;

  @ApiProperty()
  total: number;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  udpatedAt: Date;

  @ApiProperty({ type: [ProductDto] })
  @Type(() => ProductDto)
  products: Array<ProductDto>;
}
