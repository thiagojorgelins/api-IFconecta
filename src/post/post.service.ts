import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) { }

  create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: createPostDto
    })
  }

  getAllPost() {
    return this.prisma.post.findMany({
      include:{
        author:{
          select: {
            name: true
          }
        }
      }
    })
  }

  getPost(id: number) {
    return this.prisma.post.findUnique({ where: { id: id } ,
    include: {
      author: {
        select: {
          name: true
        }
      }
    }})
  }

  updatePost(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id: id },
      data: updatePostDto
    })
  }

  removePost(id: number) {
    return this.prisma.post.delete({
      where: { id: id },
    })
  }
}
