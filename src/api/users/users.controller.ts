import { DeleteResourceEntity, ErrorEntity } from 'src/shared/entities';

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { UserRoles } from '@prisma/client';

import { Roles } from '../auth/decorators/roles.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user'
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse({ type: ErrorEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all users'
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse({ type: ErrorEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a user by id'
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse({ type: ErrorEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user by id'
  })
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse({ type: ErrorEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  updateOneById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOneById(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user by id'
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: DeleteResourceEntity })
  @ApiInternalServerErrorResponse({ type: ErrorEntity })
  deleteOneById(@Param('id') id: string) {
    return this.usersService.deleteOneById(id);
  }
}
