import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { StoreUserRoles } from '@prisma/client';

import { UserEntity } from 'src/api/users/entities/user.entity';

import { ROLES_KEY } from '../decorators/roles.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<StoreUserRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    const { user }: { user: UserEntity } = context.switchToHttp().getRequest();

    if (!requiredRoles) {
      return true;
    }

    if (!user) {
      return false;
    }

    return requiredRoles.some((role) => user.StoreUserRoles.includes(role));
  }
}
