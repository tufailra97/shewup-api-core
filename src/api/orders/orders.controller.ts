import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { ErrorEntity } from 'src/shared/entities';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OrderEntity })
  @ApiBadRequestResponse({ type: ErrorEntity })
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    const { id } = req.user;
    return this.ordersService.create(createOrderDto, id);
  }

  @Get('single/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OrderEntity })
  @ApiBadRequestResponse({ type: ErrorEntity })
  findOneById(@Request() req, @Param('id') id: string) {
    const { id: userId } = req.user;
    return this.ordersService.findOneById(id, userId);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [OrderEntity] })
  @ApiBadRequestResponse({ type: ErrorEntity })
  findAllByUserId(@Request() req) {
    const { id } = req.user;
    return this.ordersService.findAllByUserId(id);
  }
}
