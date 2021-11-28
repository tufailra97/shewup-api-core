import { ArrayMinSize, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TagDto } from './tag.dto';

export class CreateTagDto {
  @ApiProperty({ type: [TagDto] })
  @Type(() => TagDto)
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  tags: TagDto[];
}
