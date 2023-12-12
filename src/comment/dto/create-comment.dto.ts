import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client"
import { IsString } from "class-validator";

export class CreateCommentDto implements Prisma.CommentCreateInput{
  @ApiProperty({
      description: 'Conteudo do comentário',
      example: 'Post inutil, deve ser apagado.'
    })
  @IsString()
  content: string
  
  postId: number
  authorId: number
  authorName: string;
}
