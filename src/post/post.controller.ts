import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { MulterMiddleware } from 'src/middlewares/upload.middleware';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @IsPublic()
  @Post()
  @ApiOperation({ summary: 'Criar um post'})
  @UseInterceptors(MulterMiddleware)
  @ApiConsumes('multipart/form-data')
  async createPost(@Body() createPostDto: CreatePostDto, @UploadedFile() file) {
    // Aqui, você pode acessar o arquivo enviado através da variável 'file'
    // Faça as alterações necessárias para salvar a string no banco de dados
    // e armazenar o nome do arquivo (file.filename) em createPostDto.postImage
    createPostDto.postImage = file.filename;
    return this.postService.create(createPostDto);
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
