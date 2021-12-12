import { Exclude } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import { Gender, StoreUserRoles, Users } from '@prisma/client';

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

  @ApiProperty({ enum: StoreUserRoles, isArray: true })
  StoreUserRoles: StoreUserRoles[];

  @ApiProperty({ enum: Gender })
  gender: Gender;

  @ApiProperty()
  contactNumber: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
