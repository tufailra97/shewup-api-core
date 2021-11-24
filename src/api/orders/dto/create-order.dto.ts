import { ApiProperty } from '@nestjs/swagger';
import { Products } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested
} from 'class-validator';

// TODO: extract this to the product resource when we have a product resource
export class ProductDto implements Partial<Products> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  sku: string;
}

export class CreateOrderDto {
  @ApiProperty({ type: [ProductDto] })
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  @ArrayMinSize(1)
  @IsArray()
  products: ProductDto[];
}
