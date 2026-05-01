import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ChatDialog,
  ChatList,
  EmptyDialog,
  type Chat,
  type ChatMessage,
} from "@features/chats";

const chats: Chat[] = [
  { id: 1, userName: "John" },
  { id: 2, userName: "Johnium" },
];

export const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState(0);
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);

  const selectedChat = chats.find((chat) => chat.id === chatId) ?? null;

  useEffect(() => {
    document.body.classList.toggle("chat-dialog-open", chatId > 0);

    return () => {
      document.body.classList.remove("chat-dialog-open");
    };
  }, [chatId]);

  const handleSendMessage = (text: string, targetChatId: number) => {
    const nextText = text.trim();
    if (!nextText) return;

    setMessageList([
      ...messageList,
      {
        id: messageList.length + 1,
        text: nextText,
        chatId: targetChatId,
      },
    ]);

    setMessage("");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        py: 1,
        "@media (max-width: 800px)": {
          height: chatId > 0 ? "100vh" : "calc(100vh - 72px)",
          py: 0,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: "white",
          height: "100%",
          borderRadius: "0px 16px 16px 0px",
          "@media (max-width: 1100px)": {
            borderRadius: 0,
          },
        }}
      >
        <ChatList
          chats={chats}
          selectedChatId={chatId}
          onSelectChat={setChatId}
        />

        {selectedChat ? (
          <ChatDialog
            chat={selectedChat}
            message={message}
            messages={messageList.filter((item) => item.chatId === chatId)}
            onMessageChange={setMessage}
            onSendMessage={() => handleSendMessage(message, chatId)}
            onBack={() => setChatId(0)}
          />
        ) : (
          <EmptyDialog />
        )}
      </Box>
    </Box>
  );
};
