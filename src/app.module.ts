import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, CommentModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
