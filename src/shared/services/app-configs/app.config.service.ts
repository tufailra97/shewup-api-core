import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type TAppConfig = {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET_KEY: string;
  JWT_TOKEN_TTL: string;
  BCRYPT_SALT_ROUNDS: number;
  APP_THROTTLE_TTL: number;
  APP_THROTTLE_LIMIT: number;
};

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get configs(): TAppConfig {
    return {
      PORT: Number(this.configService.get('PORT')),
      DATABASE_URL: this.configService.get('DATABASE_URL'),
      JWT_SECRET_KEY: this.configService.get('JWT_SECRET_KEY'),
      JWT_TOKEN_TTL: this.configService.get('JWT_TOKEN_TTL'),
      BCRYPT_SALT_ROUNDS: Number(this.configService.get('BCRYPT_SALT_ROUNDS')),
      APP_THROTTLE_TTL: this.configService.get('APP_THROTTLE_TTL'),
      APP_THROTTLE_LIMIT: this.configService.get('APP_THROTTLE_LIMIT')
    };
  }
}
