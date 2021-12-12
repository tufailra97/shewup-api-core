import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Gender, StoreUserRoles, Users } from '@prisma/client';

export class CreateUserDto implements Users {
  businessId: string;
  businessBranchId: string;
  @Exclude()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty()
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty({ enum: StoreUserRoles, isArray: true })
  @IsEnum(StoreUserRoles, { each: true })
  StoreUserRoles: StoreUserRoles[];

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsString()
  contactNumber: string;

  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/, {
    message: `Password must be at least 8 character long and 
    must contain at least one upper case character\n, 
    one lowercase character and\n 
    at least one special character`
  })
  @ApiProperty()
  password: string;
}
