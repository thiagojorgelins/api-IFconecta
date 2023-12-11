import { Prisma } from "@prisma/client";
import { Comment } from "../entities/comment.entity";

export class CreateCommentDto implements Prisma.CommentCreateInput{
  content: string
  postId: number
  authorId: number
  authorName: string;
}
