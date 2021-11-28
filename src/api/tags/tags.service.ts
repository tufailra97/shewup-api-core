import { Tags } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { errorMessages, prismaKnownErrors } from 'src/shared/constants';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMany(createTagDto: CreateTagDto) {
    const uniqueTags = [...new Set(createTagDto.tags)];
    const tags = await this.findManyByName(uniqueTags);

    const tagsToCreate = uniqueTags.filter(
      (tag) => !tags.find((t) => t.name === tag.name)
    );

    if (!tagsToCreate.length) {
      return [];
    }

    try {
      await this.prismaService.tags.createMany({
        data: tagsToCreate.map((tag) => ({
          name: tag.name,
          description: tag.description
        }))
      });

      const newTags = this.findManyByName(tagsToCreate);

      return newTags;
    } catch (error) {
      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findManyByName(tagsToFind: Partial<Tags>[]) {
    const tags = await this.prismaService.tags.findMany({
      where: {
        OR: tagsToFind.map((tag) => ({ name: tag.name }))
      }
    });

    return tags;
  }

  async findManyById(tagsToFind: string[]) {
    const tags = await this.prismaService.tags.findMany({
      where: {
        OR: tagsToFind.map((id) => ({ id }))
      }
    });

    return tags;
  }

  findAll() {
    return this.prismaService.tags.findMany();
  }

  async findAllByProductId(id: string) {
    const tags = await this.prismaService.productTags.findMany({
      where: { product: { id } }
    });

    return tags;
  }

  async findOneById(id: string) {
    const tag = await this.prismaService.tags.findFirst({
      where: { id }
    });

    if (!tag) {
      throw new NotFoundException(errorMessages.TAG_NOT_FOUND);
    }

    return tag;
  }

  async updateOneById(id: string, updateTagDto: UpdateTagDto) {
    const tag = await this.prismaService.tags.findFirst({
      where: { id }
    });

    if (!tag) {
      throw new NotFoundException(errorMessages.TAG_NOT_FOUND);
    }

    try {
      return this.prismaService.tags.update({
        where: { id },
        data: updateTagDto
      });
    } catch (error) {
      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteOneById(id: string) {
    const tag = await this.prismaService.tags.findFirst({
      where: { id }
    });

    if (!tag) {
      throw new NotFoundException(errorMessages.TAG_NOT_FOUND);
    }

    try {
      await this.prismaService.tags.delete({ where: { id } });
      return {
        statusCode: 200,
        message: 'Tag deleted'
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === prismaKnownErrors.RECORD_NOT_FOUND.code) {
          throw new NotFoundException(errorMessages.TAG_NOT_FOUND);
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
