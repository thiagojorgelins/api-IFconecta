import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { UploadMiddleware } from 'src/middlewares/upload.middleware';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um post' })
  @UseInterceptors(UploadMiddleware)
  @ApiConsumes('multipart/form-data')
  async createPost(@Body() createPostDto: CreatePostDto, @UploadedFile() file, @CurrentUser() user: User) {
    enum category {
      business, culture, fashion, gastronomy, health, movies, music, science, sports, technology, travel
    }
    if (file) {
      createPostDto.postImage = file.filename
    } else {
      if (createPostDto.category in category) {
        createPostDto.postImage = `${createPostDto.category}_img.jpg`
      } else {
        createPostDto.postImage = `default_img.jpg`
      }
    }
    createPostDto.authorName = user.name
    createPostDto.authorId = user.id
    const createdPost = await this.postService.create(createPostDto)

    return createdPost

  }

  @IsPublic()
  @ApiOperation({ summary: 'Exibir todos os posts criados' })
  @Get()
  findAll() {
    return this.postService.getAllPost()
  }

  @IsPublic()
  @ApiOperation({ summary: 'Exibir um post pelo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.getPost(+id)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar um post' })
  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(+id, updatePostDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover um post' })
  @Delete(':id')
  async removePost(@Param('id') id: string, createPostDto: CreatePostDto, @CurrentUser() user: User) {
    try {
      const post = await this.postService.getPost(+id);

      if (!post) {
        throw new UnauthorizedException('Post não encontrado')
      }
      if (post.authorId !== user.id) {
        throw new UnauthorizedException('Usuário não autorizado a remover este post')
      }
      return this.postService.removePost(+id)
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Ocorreu um erro ao remover o post');
    }

  }

  @IsPublic()
  @Get('search/:filters')
  searchPosts(@Query('filters') query: string) {
    return this.postService.searchPosts(query)
  }

  @IsPublic()
  @ApiOperation({ summary: 'Exibir posts por categoria' })
  @Get('category/:category')
  findPostsByCategory(@Param('category') category: string) {
    return this.postService.getPostsByCategory(category)
  }
}
