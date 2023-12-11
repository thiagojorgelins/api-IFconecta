import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";
export class CreatePostDto implements Prisma.PostCreateInput{
  @ApiProperty({
    description: 'Post Category',
    example: 'string'
  })
  @IsString()
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
  
  authorId: number
  authorName: string

  @ApiProperty({
    description: 'Post Image',
    type: 'file',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  postImage: string
}