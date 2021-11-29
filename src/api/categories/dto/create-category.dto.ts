import { Exclude } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Categories } from '@prisma/client';

export class CreateCategoryDto implements Categories {
  @Exclude()
  id: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
