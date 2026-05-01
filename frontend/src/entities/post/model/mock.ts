import SocialIcon from "@public/icon-social.svg";
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
    images: ["../../public/testImg/5.png"],
  },
  {
    id: 2,
    user: mockPostUser,
    content: "Пост с двумя фотографиями.",
    likes: 12,
    comments: 3,
    images: ["../../public/testImg/1.png", "../../public/testImg/5.png"],
  },
  {
    id: 3,
    user: mockPostUser,
    content: "Пост с тремя фотографиями.",
    likes: 9,
    comments: 6,
    images: [
      "../../public/testImg/1.png",
      "../../public/testImg/2.png",
      "../../public/testImg/3.png",
    ],
  },
  {
    id: 4,
    user: mockPostUser,
    content: "Пост с четырьмя фотографиями.",
    likes: 24,
    comments: 8,
    images: [
      "../../public/testImg/1.png",
      "../../public/testImg/2.png",
      "../../public/testImg/3.png",
      "../../public/testImg/4.png",
    ],
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
