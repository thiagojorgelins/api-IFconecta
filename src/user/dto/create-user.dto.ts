import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client'; 
export class CreateUserDto implements Prisma.UserCreateInput{
  id: number;
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
  @ApiProperty({
    description: 'Password User',
    example: 'string'
  })
  password: string;
}