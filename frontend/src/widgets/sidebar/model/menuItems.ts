import type { ComponentType, SVGProps } from "react";
import ChatIcon from "@public/icon-chat.svg?react";
import HomeIcon from "@public/icon-home.svg?react";
import NotificationIcon from "@public/icon-notification.svg?react";
import ProfileIcon from "@public/icon-profile.svg?react";
import SearchIcon from "@public/icon-search.svg?react";

export type SideBarMenuItem = {
  text: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  path: string;
};

export const menuItems: SideBarMenuItem[] = [
  { text: "Главная", icon: HomeIcon, path: "/" },
  { text: "Поиск", icon: SearchIcon, path: "/search" },
  { text: "Уведомления", icon: NotificationIcon, path: "/notifications" },
  { text: "Чаты", icon: ChatIcon, path: "/chats" },
  { text: "Профиль", icon: ProfileIcon, path: "/profile/" },
];
