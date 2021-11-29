import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppLoggerMiddleware } from './shared/middlewares/app.logger.middlware';
import { AppConfigService } from './shared/services/app-configs/app.config.service';
import { OrdersModule } from './api/orders/orders.module';
import { ProductsModule } from './api/products/products.module';
import { TagsModule } from './api/tags/tags.module';
import { CategoriesModule } from './api/categories/categories.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppConfigModule } from './shared/services/app-configs/app.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ThrottlerModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return {
          ttl: appConfigService.configs.APP_THROTTLE_TTL,
          limit: appConfigService.configs.APP_THROTTLE_LIMIT
        };
      }
    }),
    AuthModule,
    UsersModule,
    OrdersModule,
    ProductsModule,
    TagsModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
