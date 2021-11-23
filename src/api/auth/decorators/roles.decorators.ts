import { UserRoles } from '@prisma/client';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'userRole';
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
