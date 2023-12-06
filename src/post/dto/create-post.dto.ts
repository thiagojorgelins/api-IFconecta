import { Prisma } from "@prisma/client";

export class CreatePostDto implements Prisma.PostCreateInput{
  category: string;
  title: string;
  subtitle: string;
  content: string;
}
