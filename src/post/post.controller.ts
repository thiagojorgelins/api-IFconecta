import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Criar um post'})
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Exibir todos os posts criados'})
  @Get()
  findAll() {
    return this.postService.getAllPost()
  }

  @ApiOperation({ summary: 'Exibir um post pelo ID'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.getPost(+id);
  }

  @ApiOperation({ summary: 'Atualizar um post'})
  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(+id, updatePostDto);
  }

  @ApiOperation({ summary: 'Remover um post'})
  @Delete(':id')
  removePost(@Param('id') id: string) {
    return this.postService.removePost(+id);
  }
}
