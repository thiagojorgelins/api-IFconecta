import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @ApiProperty({ example: 'string@email.com', description: 'Endereço de e-mail' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P4ssw0rd', description: 'Senha' })
  @IsString()
  password: string;
}