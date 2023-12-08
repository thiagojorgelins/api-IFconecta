import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class CreatePostDto implements Prisma.PostCreateInput{
  @ApiProperty({
    description: 'Post Category',
    example: 'string'
  })
  category: string;

  @ApiProperty({
    description: 'Post Title',
    example: 'string'
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Post Subtitle',
    example: 'string'
  })
  @IsString()
  subtitle: string;

  @ApiProperty({
    description: 'Post Content',
    example: 'string'
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Post AuthorID',
    example: 'number'
  })
  @IsNumber()
  authorId: number

  postImage: string
}