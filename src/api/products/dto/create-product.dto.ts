import { Exclude, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Products } from '@prisma/client';

import { ProductImage } from './product-image.dto';

export class CreateProductDto implements Products {
  @Exclude()
  id: string;
  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  description: string;

  @ApiProperty()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2
  })
  price: number;

  @ApiProperty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  sku: string;

  @ValidateNested({ each: true })
  @ApiProperty({ type: [ProductImage] })
  @Type(() => ProductImage)
  @ArrayMinSize(1)
  @IsArray()
  productImages: ProductImage[];

  @ApiProperty()
  productDetails: Prisma.JsonValue;

  @ApiProperty()
  productTags: string[];
}
