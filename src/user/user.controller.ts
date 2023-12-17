import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { UserUploadMiddleware } from 'src/middlewares/upload.middleware';
import { Prisma } from '@prisma/client';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @IsPublic()
  @Post()
  @ApiOperation({ summary: 'Criar usuário'})
  @UseInterceptors(UserUploadMiddleware)
  @ApiConsumes('multipart/form-data')
  async createUser(@Body() createUserDto: CreateUserDto, @UploadedFile() file) {
    if (file){
      createUserDto.userImage = file.filename
    }
    try {
      return await this.userService.createUser(createUserDto)
    } catch (error) {
      if (error.code === 'P2002'){
        throw new ConflictException('Email já é utilizado!')
      }
      throw error
    }
    
  }

  @IsPublic()
  @Get()
  @ApiOperation({ summary: 'Exibir todos os usuários cadastrados!'})
  getAllUser() {
    return this.userService.getAllUser()
  }
  
  @ApiBearerAuth()
  @Get('profile')
  getUserProfile(@CurrentUser() user: User){
    return user
  }

  @IsPublic()
  @Get(':id')
  @ApiOperation({ summary: 'Exibir um usuário pelo ID'})
  getUser(@Param('id') id: string) {
    return this.userService.getUser(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um usuário'})
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }
  
  @IsPublic()
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário'})
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
