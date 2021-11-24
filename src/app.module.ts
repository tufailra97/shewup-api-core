import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppLoggerMiddleware } from './shared/middlewares/app.logger.middlware';
import { AppConfigService } from './shared/services/app-configs/app.config.service';
import { OrdersModule } from './api/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UsersModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
