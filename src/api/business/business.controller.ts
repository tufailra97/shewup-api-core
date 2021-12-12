import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Controller('business')
@ApiTags('Business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto);
  }

  @Get()
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOneById(id);
  }

  @Patch(':id')
  updateOneById(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto
  ) {
    return this.businessService.updateOneById(id, updateBusinessDto);
  }

  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    return this.businessService.deleteOneById(id);
  }
}
