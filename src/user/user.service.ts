import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async createUser(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data: user })

    return {
      ...createdUser,
      password: undefined
    }
  }

  getAllUser() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      },
    });
  }

  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id: id } })
    return {
      ...user,
      password: undefined
    }
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
    })
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
