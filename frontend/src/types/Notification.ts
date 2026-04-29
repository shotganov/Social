import type { User } from "./User";

export type NotificationType = {
  id: string;
  recipientId: number;
  sender: User;
  type: "follow" | "like" | "comment";
};
