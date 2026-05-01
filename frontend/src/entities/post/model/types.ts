import type { User } from "@shared/model";

export type Post = {
  id: number;
  user: User;
  content: string;
  likes: number;
  comments: number;
  images?: string[];
};
