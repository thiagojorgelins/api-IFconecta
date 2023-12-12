import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar Comentário'})
  @Post(':postId')
  async create(@Body() createCommentDto: CreateCommentDto, @CurrentUser() user: User, @Param('postId') postId:  string): Promise<any> {
    createCommentDto.postId = +postId
    createCommentDto.authorId = user.id
    createCommentDto.authorName = user.name
    return await this.commentService.createComment(createCommentDto)
  }

  @IsPublic()
  @ApiOperation({ summary: 'Exibir todos os comentários'})
  @Get()
  findAll() {
    return this.commentService.getAllComment()
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Exibir comentário pelo ID'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.getComment(+id)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar um comentário'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.updateComment(+id, updateCommentDto)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover um comentário'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.removeComment(+id)
  }
}
