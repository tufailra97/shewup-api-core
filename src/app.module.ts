import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './api/auth/auth.module';
import { CategoriesModule } from './api/categories/categories.module';
import { OrdersModule } from './api/orders/orders.module';
import { ProductsModule } from './api/products/products.module';
import { TagsModule } from './api/tags/tags.module';
import { UsersModule } from './api/users/users.module';
import { AppService } from './app.service';
import { AppLoggerMiddleware } from './shared/middlewares/app.logger.middlware';
import { AppConfigService } from './shared/services/app-configs/app.config.service';
import { BusinessModule } from './api/business/business.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UsersModule,
    OrdersModule,
    ProductsModule,
    TagsModule,
    CategoriesModule,
    BusinessModule
  ],
  providers: [AppService, AppConfigService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
