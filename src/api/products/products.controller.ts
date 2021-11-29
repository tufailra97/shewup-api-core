import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';

import { ErrorEntity, DeleteResourceEntity } from 'src/shared/entities';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new product'
  })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ProductEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all products'
  })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [ProductEntity] })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get product by id'
  })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ProductEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  findOneById(@Param('id') id: string) {
    return this.productsService.findOneById(id);
  }

  @Get('/category/:id')
  @ApiOperation({
    summary: 'Get all products by category id'
  })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [ProductEntity] })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  findProductsByCategoryId(@Param('id') id: string) {
    return this.productsService.findProductsByCategoryId(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update product by id'
  })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ProductEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete product by id'
  })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DeleteResourceEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  deleteOneById(@Param('id') id: string) {
    return this.productsService.deleteOneById(id);
  }
}
