import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client'; 
import { IsEmail, IsOptional, IsString, Matches, MinLength } from 'class-validator';
export class CreateUserDto implements Prisma.UserCreateInput{

  @ApiProperty({
    description: 'User name',
    example: 'string'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'string@email.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'P4ssw0rd'
  })
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha fraca',
  })
  password: string;

  @ApiProperty({
    description: 'User Image',
    type: 'file',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  userImage: string
}