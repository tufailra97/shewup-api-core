import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type TAppConfig = {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET_KEY: string;
  BCRYPT_SALT_ROUNDS: number;
};

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get configs(): TAppConfig {
    return {
      PORT: Number(this.configService.get('PORT')),
      DATABASE_URL: this.configService.get('DATABASE_URL'),
      JWT_SECRET_KEY: this.configService.get('JWT_SECRET_KEY'),
      BCRYPT_SALT_ROUNDS: Number(this.configService.get('BCRYPT_SALT_ROUNDS'))
    };
  }
}
