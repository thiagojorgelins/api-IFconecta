import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @IsPublic()
  @Post()
  @ApiOperation({ summary: 'Criar usuário'})
  createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser)
  }

  @IsPublic()
  @Get()
  @ApiOperation({ summary: 'Exibir todos os usuários cadastrados!'})
  getAllUser() {
    return this.userService.getAllUser()
  }

  @Get('profile')
  getUserProfile(@CurrentUser() user: User){
    return user
  }

  @Get(':id')
  @ApiOperation({ summary: 'Exibir um usuário pelo ID'})
  getUser(@Param('id') id: string) {
    return this.userService.getUser(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um usuário'})
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário'})
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
