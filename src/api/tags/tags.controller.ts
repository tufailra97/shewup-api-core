import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';

import { ErrorEntity, ResourceDeletedEntity } from 'src/shared/entities';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from './entities/tag.entity';
import { TagsService } from './tags.service';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOkResponse({ type: TagEntity })
  @ApiBadRequestResponse({ type: ErrorEntity })
  createMany(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createMany(createTagDto);
  }

  @Get()
  @ApiOkResponse({ type: [TagEntity] })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  @ApiNotFoundResponse({ type: ErrorEntity })
  findAll() {
    return this.tagsService.findAll();
  }

  @Get('product/:id')
  @ApiOkResponse({ type: [TagEntity] })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  @ApiNotFoundResponse({ type: ErrorEntity })
  findAllByProductId(@Param('id') id: string) {
    return this.tagsService.findAllByProductId(id);
  }

  @Get(':id')
  @ApiOkResponse({ type: TagEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  @ApiNotFoundResponse({ type: ErrorEntity })
  findOneById(@Param('id') id: string) {
    return this.tagsService.findOneById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TagEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  @ApiNotFoundResponse({ type: ErrorEntity })
  updateOneById(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.updateOneById(id, updateTagDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResourceDeletedEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  @ApiNotFoundResponse({ type: ErrorEntity })
  deleteOneById(@Param('id') id: string) {
    return this.tagsService.deleteOneById(id);
  }
}
