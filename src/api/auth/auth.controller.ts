import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginEntity } from './entities/login.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserLoginDto } from './dto/user-login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserLoginDto })
  @ApiOkResponse({ type: LoginEntity })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        statusCode: 401,
        error: 'Unauthorized'
      }
    }
  })
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
