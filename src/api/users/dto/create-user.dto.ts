import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Gender, UserRoles, Users } from '@prisma/client';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator';

export class CreateUserDto implements Users {
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

  @ApiProperty({ enum: UserRoles })
  userRole: UserRoles;

  @ApiProperty({ enum: Gender })
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
