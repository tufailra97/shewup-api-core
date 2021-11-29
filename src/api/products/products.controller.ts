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
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ProductEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [ProductEntity] })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ProductEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  findOneById(@Param('id') id: string) {
    return this.productsService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ProductEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DeleteResourceEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  deleteOneById(@Param('id') id: string) {
    return this.productsService.deleteOneById(id);
  }
}
