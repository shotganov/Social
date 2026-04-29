import type { User } from "./User";

export type Post = {
  id: number;
  user: User;
  content: string;
  likes: number;
  comments: number;
  images?: string[];
};
