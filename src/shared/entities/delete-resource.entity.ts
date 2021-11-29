import { ApiProperty } from '@nestjs/swagger';

export class DeleteResourceEntity {
  @ApiProperty()
  statusCode: 200;

  @ApiProperty()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
