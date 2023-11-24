import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() postUser: CreateUserDto):Promise<CreateUserDto> {
    return this.userService.createUser(postUser)
  }

  @Get()
  async getAllUser(@Req() request:Request, @Res() response:Response):Promise<any>{
    const result = await this.userService.getAllUser()
    return response.status(200).json({
      status: 'Ok!',
      message: "Successfully fetch data!",
      result: result
    })
  }

  @Get(':id')
  async getUser(@Param('id') id: number):Promise<CreateUserDto | null>{
    return this.userService.getUser(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() user: UpdateUserDto):Promise<UpdateUserDto> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: number):Promise<CreateUserDto> {
    return this.userService.removeUser(id);
  }
}
