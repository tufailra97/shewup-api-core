import { BadRequestException, Injectable } from '@nestjs/common';

import { errorMessages } from 'src/shared/constants';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, userId: string) {
    const { products } = createOrderDto;

    const user = await this.prismaService.users.findFirst({
      where: {
        id: userId
      },
      select: {
        id: true
      }
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const productsFromDatabase = await this.prismaService.products.findMany({
      where: {
        OR: [
          ...products.map(({ id }) => ({
            id
          }))
        ]
      },
      select: {
        price: true,
        id: true
      }
    });

    const validateProducts = products.reduce(
      (acc, product) => {
        const _product = productsFromDatabase.find(
          ({ id }) => id === product.id
        );

        if (!_product) {
          throw new BadRequestException(
            `Product with id ${product.id} not found`
          );
        }

        if (product.price !== _product.price) {
          throw new BadRequestException(
            `Price mismatch product with id ${product.id}`
          );
        }

        return {
          ...acc,
          total: acc.total + product.price
        };
      },
      {
        total: 0
      }
    );

    try {
      const order = await this.prismaService.orders.create({
        data: {
          total: validateProducts.total,
          orderDetails: {
            createMany: {
              data: products.map(({ id, price }) => ({
                productId: id,
                price
              }))
            }
          }
        },
        include: {
          orderDetails: {
            select: {
              id: false,
              orderId: false,
              product: true
            }
          }
        }
      });

      const mappedOrder = {
        ...order,
        orderDetails: {
          products: order.orderDetails.map(({ product }) => product)
        }
      };

      return {
        order: mappedOrder
      };
    } catch (error) {
      return {
        error
      };
    }
  }

  async findAllByUserId(userId: string) {
    const orders = await this.prismaService.orders.findMany({
      where: {},
      include: {
        orderDetails: {
          include: {
            product: {
              include: {
                category: true,
                productImages: true
              }
            }
          }
        }
      }
    });

    if (!orders.length) {
      return [];
    }

    const mappedOrder = orders.map((order) => ({
      ...order,
      orderDetails: {
        products: order.orderDetails.map(({ product, price }) => ({
          ...product,
          purchasePrice: price
        }))
      }
    }));

    return mappedOrder;
  }

  async findOneById(id: string, userId: string) {
    const order = await this.prismaService.orders.findFirst({
      where: {
        AND: [
          {
            id
          }
        ]
      },
      include: {
        orderDetails: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      throw new BadRequestException(errorMessages.ORDER_NOT_FOUND);
    }

    const mappedOrder = {
      ...order,
      orderDetails: {
        products: order.orderDetails.map(({ product }) => product)
      }
    };

    return mappedOrder;
  }
}
