import { Exclude } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Tags } from '@prisma/client';

export class TagDto implements Tags {
  @Exclude()
  id: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty({
    description: 'The name of the tag',
    example: 'Tag 1',
    required: true
  })
  @IsString()
  @MaxLength(30)
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'The description of the tag',
    example: 'This is the first tag',
    required: true
  })
  @IsString()
  @MinLength(3)
  description: string;
}
