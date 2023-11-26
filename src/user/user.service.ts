import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto
    })
  }

  getAllUser() {
    return this.prisma.user.findMany({
      select:{
        id: true,
        name: true,
        email: true,
        posts: true
      },
    });
  }

  getUser(id: number) {
    return this.prisma.user.findUnique({ where: { id: id }, select:{
      id: true,
      name: true,
      email: true,
    } })
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: id },
      data: updateUserDto
    });
  }

  removeUser(id: number) {
    return this.prisma.user.delete({
      where: { id: id }
    })
  }
}
