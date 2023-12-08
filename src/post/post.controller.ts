import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um post'})
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto)
  }

  @IsPublic()
  @ApiOperation({ summary: 'Exibir todos os posts criados'})
  @Get()
  findAll() {
    return this.postService.getAllPost()
  }

  @IsPublic()
  @ApiOperation({ summary: 'Exibir um post pelo ID'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.getPost(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar um post'})
  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(+id, updatePostDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover um post'})
  @Delete(':id')
  removePost(@Param('id') id: string) {
    return this.postService.removePost(+id);
  }
}
