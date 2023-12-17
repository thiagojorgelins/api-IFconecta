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
      include: {
        author: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  getPost(id: number) {
    return this.prisma.post.findUnique({
      where: { id: id },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
    })
  }

  getPostsByCategory(category: string) {
    return this.prisma.post.findMany({
      where: { category: category },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  searchPosts(filters: string) {
    return this.prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: filters } },
          { subtitle: { contains: filters } },
          { category: { contains: filters } },
        ],
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  updatePost(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id: id },
      data: updatePostDto
    })
  }

  removePost(id: number) {
    return this.prisma.post.delete({
      where: {
        id: id
      }
    })
  }
}
