import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  async createUser(data: CreateUserDto): Promise<CreateUserDto> {
    return this.prisma.user.create({
      data,
    })
  }

  async getAllUser(): Promise<CreateUserDto[]> {
    return this.prisma.user.findMany({});
  }

  async getUser(id: number): Promise<CreateUserDto | null> {
    return this.prisma.user.findUnique({ where: { id: Number(id) } })
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<UpdateUserDto> {
    return this.prisma.user.update({
      where: { id: Number(id)},
      data: { name: data.name, email: data.email }
    });
  }

  async removeUser(id: number): Promise<CreateUserDto> {
    return this.prisma.user.delete({
      where: {id: Number(id)}
    })
  }
}
