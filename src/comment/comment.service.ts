import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) { }

  createComment(createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: createCommentDto
    })
  }

  getAllComment() {
    return this.prisma.comment.findMany({})
  }

  getComment(id: number) {
    return this.prisma.comment.findUnique({
      where: { id: id },
      select: {
        content: true,
        author: {
          select: {
            name: true,
          }
        }
      }
    })
  }

  updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id: id },
      data: updateCommentDto
    })
  }

  removeComment(id: number) {
    return this.prisma.comment.delete({
      where: { id: id }
    })
  }
}
