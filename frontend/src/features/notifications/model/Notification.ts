import type { User } from "@shared/model";

export type NotificationType = {
  id: string;
  recipientId: number;
  sender: User;
  type: "follow" | "like" | "comment";
};
