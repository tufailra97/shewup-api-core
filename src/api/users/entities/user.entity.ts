import { ApiProperty } from '@nestjs/swagger';
import { Gender, UserRoles, Users } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements Users {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ enum: UserRoles })
  userRole: UserRoles;

  @ApiProperty({ enum: Gender })
  gender: Gender;

  @ApiProperty()
  contactNumber: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
