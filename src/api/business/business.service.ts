import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { errorMessages } from 'src/shared/constants';
import { DeleteResourceEntity } from 'src/shared/entities';
import { PrismaErrorEntity } from 'src/shared/entities/prisma-error.entity';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBusinessDto: CreateBusinessDto) {
    // TODO: get user id from token
    const business = await this.prismaService.business.findFirst({
      where: {
        name: createBusinessDto.name,
        postCode: createBusinessDto.postCode
      }
    });

    if (business) {
      throw new ConflictException(errorMessages.RESOURCE_ALREADY_EXISTS);
    }

    try {
      const business = await this.prismaService.business.create({
        data: {
          ...createBusinessDto,
          businessUsers: {
            create: {
              isOwner: true,
              userId: '7fa1b348-2a02-4491-b080-64c3b7a633d3'
            }
          }
        }
      });

      return business;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        new PrismaErrorEntity(error);
      }

      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOneById(id: string) {
    const business = await this.prismaService.business.findFirst({
      where: {
        id
      }
    });

    if (!business) {
      throw new NotFoundException(errorMessages.RESOURCE_NOT_FOUND);
    }

    return business;
  }

  async findAll() {
    const businesses = await this.prismaService.business.findMany();

    return businesses;
  }

  async updateOneById(id: string, updateBusinessDto: UpdateBusinessDto) {
    const business = await this.prismaService.business.findFirst({
      where: {
        id
      }
    });

    if (!business) {
      throw new NotFoundException(errorMessages.RESOURCE_NOT_FOUND);
    }

    // check if other business exist with same name in the same postcode
    const otherBusiness = await this.prismaService.business.findMany({
      where: {
        NOT: {
          id
        },
        OR: [
          {
            name: updateBusinessDto.name,
            postCode: updateBusinessDto.postCode
          }
        ]
      },
      select: {
        name: true
      }
    });

    if (otherBusiness.length) {
      throw new ConflictException(errorMessages.RESOURCE_ALREADY_EXISTS);
    }

    try {
      await this.prismaService.business.update({
        where: { id },
        data: updateBusinessDto
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        new PrismaErrorEntity(error);
      }

      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteOneById(id: string) {
    // when deleting a business,
    // - all related business users should be deleted
    // - all related business products should be deleted
    // - all orders related to the business should be anonymised
    // -

    const business = await this.prismaService.business.findFirst({
      where: { id }
    });

    if (!business) {
      throw new NotFoundException(errorMessages.RESOURCE_NOT_FOUND);
    }

    try {
      await this.prismaService.businessUsers.deleteMany({
        where: {
          busienssId: id
        }
      });
      await this.prismaService.store.deleteMany({
        where: {
          businessId: id
        }
      });
      await this.prismaService.business.delete({ where: { id } });
      return new DeleteResourceEntity('Business has been deleted');
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        new PrismaErrorEntity(error);
      }

      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR
      );
    }
  }
}
