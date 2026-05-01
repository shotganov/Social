import type { ComponentType, SVGProps } from "react";
import ChatIcon from "@shared/assets/icons/icon-chat.svg?react";
import HomeIcon from "@shared/assets/icons/icon-home.svg?react";
import NotificationIcon from "@shared/assets/icons/icon-notification.svg?react";
import ProfileIcon from "@shared/assets/icons/icon-profile.svg?react";
import SearchIcon from "@shared/assets/icons/icon-search.svg?react";

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
