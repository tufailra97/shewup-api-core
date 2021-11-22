import { ApiProperty } from '@nestjs/swagger';

export class ErrorEntity {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({ required: false })
  errors: any;

  @ApiProperty()
  message: string;
}
