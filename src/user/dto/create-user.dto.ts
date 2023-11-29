import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client'; 
import { IsString } from 'class-validator';
export class CreateUserDto implements Prisma.UserCreateInput{
  @ApiProperty({
    description: 'User Name',
    example: 'string'
  })
  @IsString()
  readonly name: string;
  @IsString()
  @ApiProperty({
    description: 'User Email ',
    example: 'string@email.com'
  })
  readonly email: string;
  @ApiProperty({
    description: 'User Password ',
    example: 'string'
  })
  @IsString()
  readonly password: string;
}