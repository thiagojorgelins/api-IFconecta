import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"
export class Post{
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