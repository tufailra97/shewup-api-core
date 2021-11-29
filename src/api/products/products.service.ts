import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { errorMessages, prismaKnownErrors } from 'src/shared/constants';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { TagsService } from '../tags/tags.service';
import { DeleteResourceEntity } from 'src/shared/entities';

// TODO: map product tags correctly
@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tagService: TagsService
  ) {}

  async create(createProductDto: CreateProductDto) {
    const uniqueTags = [...new Set(createProductDto.productTags)];
    const product = await this.prismaService.products.findFirst({
      where: {
        name: createProductDto.name
      }
    });

    if (product) {
      throw new BadRequestException(errorMessages.PRODUCT_ALREADY_EXISTS);
    }

    // TODO: get category from category service
    const category = await this.prismaService.categories.findFirst({
      where: {
        id: createProductDto.categoryId
      }
    });

    if (!category) {
      throw new BadRequestException(errorMessages.CATEGORY_NOT_FOUND);
    }

    const tags = await this.tagService.findManyById(uniqueTags);

    const notFoundTags = uniqueTags.filter(
      (tag) => !tags.find((t) => t.id === tag)
    );

    if (notFoundTags.length) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: errorMessages.TAG_NOT_FOUND,
        error: {
          data: notFoundTags
        }
      });
    }

    try {
      const product = await this.prismaService.products.create({
        data: {
          description: createProductDto.description,
          name: createProductDto.name,
          price: createProductDto.price,
          categoryId: createProductDto.categoryId,
          sku: createProductDto.sku,
          productTags: {
            createMany: {
              data: uniqueTags.map((tag) => ({
                tagId: tag
              }))
            }
          },
          productImages: {
            createMany: {
              data: createProductDto.productImages,
              skipDuplicates: true
            }
          }
        },
        include: {
          productTags: true,
          productImages: true,
          category: true
        }
      });

      return product;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === prismaKnownErrors.UNIQUE_CONSTRAINT_FAILED.code) {
          throw new BadRequestException(`${errorMessages.TAG_NOT_FOUND}`);
        }
      }

      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR
      );
    }
  }

  findAll() {
    return this.prismaService.products.findMany({
      include: {
        category: true,
        productTags: true,
        productImages: true
      }
    });
  }

  async findOneById(id: string) {
    const product = await this.prismaService.products.findFirst({
      where: {
        id
      },
      include: {
        productImages: true,
        category: true,
        productTags: {
          include: {
            tag: true
          }
        }
      }
    });

    if (!product) {
      throw new NotFoundException(errorMessages.PRODUCT_NOT_FOUND);
    }

    return product;
  }

  async findProductsByCategoryId(id: string) {
    const products = await this.prismaService.products.findMany({
      where: {
        categoryId: id
      },
      include: {
        productTags: {
          include: {
            tag: true
          }
        },
        productImages: true,
        category: true
      }
    });
    return products;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.prismaService.products.update({
        where: {
          id
        },
        data: {
          description: updateProductDto.description,
          name: updateProductDto.name,
          price: updateProductDto.price,
          categoryId: updateProductDto.categoryId,
          sku: updateProductDto.sku,
          // TODO: better handle product images
          ...(Array.isArray(updateProductDto.productImages) && {
            productImages: {
              createMany: {
                data: updateProductDto.productImages.map(
                  ({ imageUrl, description }) => ({
                    imageUrl,
                    description
                  })
                ),
                skipDuplicates: true
              }
            }
          }),
          productTags: {
            createMany: {
              data: updateProductDto.productTags.map((tag) => ({
                tagId: tag
              }))
            }
          }
        },
        include: {
          productTags: {
            include: {
              tag: true
            }
          },
          productImages: true,
          category: true
        }
      });

      return updatedProduct;
    } catch (error) {
      console.log(
        '🚀 ~ file: products.service.ts ~ line 172 ~ ProductsService ~ update ~ error',
        error
      );
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === prismaKnownErrors.FOREIGN_CONSTRAINT_FAILED.code) {
          throw new BadRequestException(
            errorMessages.RESOURCE_CANNOT_BE_DELETED
          );
        }

        if (error.code === prismaKnownErrors.RECORD_NOT_FOUND.code) {
          throw new NotFoundException(errorMessages.PRODUCT_NOT_FOUND);
        }
      }

      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteOneById(id: string) {
    try {
      // delete associated tags
      await this.prismaService.productTags.deleteMany({
        where: { productId: id }
      });

      // delete associated images
      await this.prismaService.productImages.deleteMany({
        where: { productId: id }
      });

      // delete associated reviews
      await this.prismaService.productReviews.deleteMany({
        where: { productId: id }
      });

      await this.prismaService.products.delete({
        where: {
          id
        }
      });

      return new DeleteResourceEntity('Product has been deleted');
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === prismaKnownErrors.FOREIGN_CONSTRAINT_FAILED.code) {
          throw new BadRequestException(
            errorMessages.RESOURCE_CANNOT_BE_DELETED
          );
        }

        if (
          error.code === prismaKnownErrors.RECORD_NOT_FOUND.code ||
          error.code === prismaKnownErrors.RECORD_TO_DELETE_NOT_FOUND.code
        ) {
          throw new NotFoundException(errorMessages.PRODUCT_NOT_FOUND);
        }
      }

      throw new InternalServerErrorException(
        errorMessages.INTERNAL_SERVER_ERROR
      );
    }
  }
}
