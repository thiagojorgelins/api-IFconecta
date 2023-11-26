import { Prisma } from '@prisma/client'; 
import { IsInt, IsString, isString } from 'class-validator';
export class CreateUserDto implements Prisma.UserCreateInput{
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly password: string;
}