import { ApiProperty } from '@nestjs/swagger';
import { Tags } from '@prisma/client';

export class TagEntity implements Tags {
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
