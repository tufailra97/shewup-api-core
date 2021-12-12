import { StoreUserRoles } from '@prisma/client';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'storeUserRoles';
export const Roles = (...roles: StoreUserRoles[]) =>
  SetMetadata(ROLES_KEY, roles);
