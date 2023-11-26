import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, CommentModule, PostModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
