import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { errorMessages, prismaKnownErrors } from '../constants';
import { ErrorEntity } from './error.entity';

export class PrismaErrorEntity extends ErrorEntity {
  constructor(error: PrismaClientKnownRequestError) {
    super();

    this.handleError(error);
  }

  handleError(error: PrismaClientKnownRequestError) {
    switch (error.code) {
      case prismaKnownErrors.RECORD_NOT_FOUND.code:
        throw new NotFoundException(errorMessages.RESOURCE_NOT_FOUND);
      case prismaKnownErrors.FOREIGN_CONSTRAINT_FAILED.code: {
        throw new BadRequestException(errorMessages.RESOURCE_CANNOT_BE_DELETED);
      }
    }
  }
}
