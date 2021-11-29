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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';

import { ErrorEntity, DeleteResourceEntity } from 'src/shared/entities';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from './entities/tag.entity';
import { TagsService } from './tags.service';

@ApiTags('Tags')
@Controller('tags')
@ApiBearerAuth()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new tag'
  })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TagEntity })
  @ApiBadRequestResponse({ type: ErrorEntity })
  createMany(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createMany(createTagDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tags'
  })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [TagEntity] })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  @ApiNotFoundResponse({ type: ErrorEntity })
  findAll() {
    return this.tagsService.findAll();
  }

  @Get('product/:id')
  @ApiOperation({
    summary: 'Get all tags by ptoduct id'
  })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [TagEntity] })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  @ApiNotFoundResponse({ type: ErrorEntity })
  findAllByProductId(@Param('id') id: string) {
    return this.tagsService.findAllByProductId(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get tag by id'
  })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TagEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  @ApiNotFoundResponse({ type: ErrorEntity })
  findOneById(@Param('id') id: string) {
    return this.tagsService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update tag by id'
  })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TagEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  @ApiNotFoundResponse({ type: ErrorEntity })
  updateOneById(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.updateOneById(id, updateTagDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete tag by id'
  })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: DeleteResourceEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  @ApiNotFoundResponse({ type: ErrorEntity })
  deleteOneById(@Param('id') id: string) {
    return this.tagsService.deleteOneById(id);
  }
}
