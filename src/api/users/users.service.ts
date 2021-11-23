import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';

import { errorMessages } from 'src/shared/constants';
import { BcryptService } from 'src/shared/services/bcrypt/bcrypt.service';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private bcryptService: BcryptService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.users.findFirst({
      where: { email: createUserDto.email }
    });

    if (user) {
      throw new ConflictException(errorMessages.EMAIL_ALREADY_IN_USE);
    }

    try {
      const hashedPassword = await this.bcryptService.hashPassword(
        createUserDto.password
      );
      const newUser = await this.prismaService.users.create({
        data: { ...createUserDto, password: hashedPassword }
      });

      return new UserEntity(newUser);
    } catch (error) {
      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll() {
    try {
      const users = await this.prismaService.users.findMany();
      return users.map((user) => new UserEntity(user));
    } catch (error) {
      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOneById(id: string) {
    const user = await this.prismaService.users.findFirst({
      where: { id }
    });

    if (!user) {
      throw new BadRequestException(errorMessages.USER_NOT_FOUND);
    }

    return new UserEntity(user);
  }

  async findOneByEmail(email: string) {
    const user = await this.prismaService.users.findFirst({
      where: { email }
    });

    if (!user) {
      throw new BadRequestException(errorMessages.USER_NOT_FOUND);
    }

    return new UserEntity(user);
  }

  async updateOneById(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prismaService.users.update({
        where: {
          id
        },
        data: {
          ...updateUserDto
        }
      });

      return new UserEntity(user);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async deleteOneById(id: string) {
    try {
      await this.prismaService.users.delete({
        where: {
          id
        }
      });

      return { message: 'User deleted' };
    } catch (error) {
      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR
      );
    }
  }
}
