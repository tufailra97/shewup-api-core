import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';

import { ErrorEntity } from 'src/shared/entities';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@ApiTags('Categories')
@Controller('categories')
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new category'
  })
  @ApiOkResponse({ type: CategoryEntity })
  @ApiConflictResponse({ type: ErrorEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all categories'
  })
  @ApiOkResponse({ type: [CategoryEntity] })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get category by id'
  })
  @ApiOkResponse({ type: CategoryEntity })
  @ApiNotFoundResponse({ type: ErrorEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  findOneById(@Param('id') id: string) {
    return this.categoriesService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update category by id'
  })
  @ApiOkResponse({ type: CategoryEntity })
  updateOneById(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.updateOneById(id, updateCategoryDto);
  }
}
