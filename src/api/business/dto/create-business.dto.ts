import { Exclude } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Business } from '@prisma/client';

export class CreateBusinessDto implements Business {
  @Exclude()
  id: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsString()
  addressLine1: string;

  @ApiProperty({ required: false })
  @IsString()
  addressLine2: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  postCode: string;

  @ApiProperty()
  @IsString()
  country: string;
}
