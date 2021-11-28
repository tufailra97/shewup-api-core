import { ApiProperty } from '@nestjs/swagger';

export class ResourceDeletedEntity {
  @ApiProperty()
  statusCode: 200;

  @ApiProperty()
  message: string;
}
