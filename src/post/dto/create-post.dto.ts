import { ApiProperty } from "@nestjs/swagger"
import { Prisma } from "@prisma/client"
import { IsInt, IsNumber, IsString, isInt } from "class-validator"
export class CreatePostDto {
  @ApiProperty({
    description: 'Post Category',
    example: 'string'
  })
  @IsString()
  category: string
  @ApiProperty({
    description: 'Post Title',
    example: 'string'
  })
  @IsString()
  title: string
  @ApiProperty({
    description: 'Post Subtitle',
    example: 'string'
  })
  @IsString()
  subtitle: string
  @ApiProperty({
    description: 'Post Content',
    example: 'string'
  })
  @IsString()
  content: string
  @ApiProperty({
    description: 'Post AuthorID',
    example: 'number'
  })
  @IsNumber()
  authorId: number
}
