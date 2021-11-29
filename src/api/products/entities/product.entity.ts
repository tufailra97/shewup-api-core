import { ApiProperty } from '@nestjs/swagger';
import { Prisma, ProductImages, Products } from '@prisma/client';

import { TagDto } from 'src/api/tags/dto/tag.dto';

import { ProductImage } from '../dto/product-image.dto';

export class ProductEntity implements Products {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  productDetails: Prisma.JsonValue;

  @ApiProperty({ type: [ProductImage] })
  productImages: ProductImages[];

  @ApiProperty({ type: [TagDto] })
  productTags: TagDto[];
}
