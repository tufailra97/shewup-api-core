import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '@prisma/client';

import { ROLES_KEY } from '../decorators/roles.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    const { user } = context.switchToHttp().getRequest();

    if (!requiredRoles) {
      return true;
    }

    if (!user) {
      return false;
    }

    return requiredRoles.some((role) => user.role === role);
  }
}
