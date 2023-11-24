import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {id: number;
  @ApiProperty({
    description: 'Name User',
    example: 'string'
  })
  name: string;
  @ApiProperty({
    description: 'Email User',
    example: 'string@string.com'
  })
  email: string;
}