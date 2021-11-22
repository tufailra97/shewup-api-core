import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Main')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  main(): string {
    return this.appService.getMain();
  }
}
