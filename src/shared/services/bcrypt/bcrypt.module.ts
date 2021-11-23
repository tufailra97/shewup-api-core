import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { AppConfigModule } from '../app-configs/app.module';

@Module({
  imports: [AppConfigModule],
  exports: [BcryptService],
  providers: [BcryptService]
})
export class BcryptModule {}
