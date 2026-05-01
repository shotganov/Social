import SocialIcon from "@shared/assets/icons/icon-social.svg";
import testImg1 from "@shared/assets/images/test-posts/1.png";
import testImg2 from "@shared/assets/images/test-posts/2.png";
import testImg3 from "@shared/assets/images/test-posts/3.png";
import testImg4 from "@shared/assets/images/test-posts/4.png";
import testImg5 from "@shared/assets/images/test-posts/5.png";
import type { User } from "@shared/model";
import type { Post } from "./types";

export const mockPostUser: User = {
  id: 1,
  tag: "john.doe",
  username: "John Doe",
  avatar: SocialIcon,
  bio: "",
};

export const mockPosts: Post[] = [
  {
    id: 1,
    user: mockPostUser,
    content: "Пост с одной фотографией.",
    likes: 5,
    comments: 11,
    images: [testImg5],
  },
  {
    id: 2,
    user: mockPostUser,
    content: "Пост с двумя фотографиями.",
    likes: 12,
    comments: 3,
    images: [testImg1, testImg5],
  },
  {
    id: 3,
    user: mockPostUser,
    content: "Пост с тремя фотографиями.",
    likes: 9,
    comments: 6,
    images: [testImg1, testImg2, testImg3],
  },
  {
    id: 4,
    user: mockPostUser,
    content: "Пост с четырьмя фотографиями.",
    likes: 24,
    comments: 8,
    images: [testImg1, testImg2, testImg3, testImg4],
  },
  {
    id: 5,
    user: mockPostUser,
    content: "Обычный пост без фотографий.",
    likes: 2,
    comments: 1,
  },
];

export const defaultPost = mockPosts[0];
