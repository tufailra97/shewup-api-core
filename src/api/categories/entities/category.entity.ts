import { ApiProperty } from '@nestjs/swagger';
import { Categories } from '@prisma/client';

export class CategoryEntity implements Categories {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
