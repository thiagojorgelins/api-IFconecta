import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [UserModule, CommentModule, PostModule, PrismaModule, AuthModule, 
    MulterModule.register({
    storage: diskStorage({
      destination: './public/uploads/post-images',
      filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
      },
    }),
  }),],
  controllers: [],
  providers: [PrismaService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule { }
