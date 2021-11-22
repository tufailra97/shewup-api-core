import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors
} from '@nestjs/common';

import { ErrorEntity } from 'src/shared/entities';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse({ type: ErrorEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse({ type: ErrorEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse({ type: ErrorEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse({ type: ErrorEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  updateOneById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOneById(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  deleteOneById(@Param('id') id: string) {
    return this.usersService.deleteOneById(id);
  }
}
