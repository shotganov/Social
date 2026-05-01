export type Chat = {
  id: number;
  userName: string;
};

export type ChatMessage = {
  id: number;
  text: string;
  chatId: number;
};
