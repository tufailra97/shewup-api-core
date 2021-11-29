import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { errorMessages, prismaKnownErrors } from 'src/shared/constants';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryExists = await this.prismaService.categories.findFirst({
      where: {
        name: createCategoryDto.name
      }
    });

    if (categoryExists) {
      throw new ConflictException(errorMessages.RESOURCE_ALREADY_EXISTS);
    }

    try {
      const newCategory = await this.prismaService.categories.create({
        data: {
          name: createCategoryDto.name,
          description: createCategoryDto.description
        }
      });

      return newCategory;
    } catch (error) {
      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll() {
    try {
      const categories = await this.prismaService.categories.findMany();
      return categories;
    } catch (error) {
      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOneById(id: string) {
    const category = await this.prismaService.categories.findFirst({
      where: {
        id
      }
    });

    if (!category) {
      throw new NotFoundException(errorMessages.RESOURCE_NOT_FOUND);
    }

    return category;
  }

  async updateOneById(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.prismaService.categories.update({
        where: {
          id
        },
        data: {
          name: updateCategoryDto.name,
          description: updateCategoryDto.description
        }
      });

      return updatedCategory;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === prismaKnownErrors.RECORD_NOT_FOUND.code) {
          throw new NotFoundException(errorMessages.RESOURCE_NOT_FOUND);
        }

        if (error.code === prismaKnownErrors.UNIQUE_CONSTRAINT_FAILED.code) {
          throw new ConflictException();
        }

        if (error.code === prismaKnownErrors.FOREIGN_CONSTRAINT_FAILED.code) {
          throw new BadRequestException(
            errorMessages.RESOURCE_CANNOT_BE_DELETED
          );
        }
      }
      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR
      );
    }
  }
}
