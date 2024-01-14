import type { PostI } from '../interface/post.interface';

export class CreatePostDto implements PostI {
  title: string;
  content: string;
  tags?: string[];
}
