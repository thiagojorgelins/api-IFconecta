import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Criar usuário'})
  createUser(@Body() postUser: CreateUserDto) {
    return this.userService.createUser(postUser)
  }

  @Get()
  @ApiOperation({ summary: 'Exibir todos os usuários cadastrados!'})
  getAllUser() {
    return this.userService.getAllUser()
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
