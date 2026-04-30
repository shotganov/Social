import { Box, ButtonBase, InputBase, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "../../public/icon-search.svg?react";
import SendIcon from "../../public/icon-send.svg?react";
import SocialIcon from "../../public/icon-social.svg?react";
import BackIcon from "../../public/icon-back.svg?react";
import { Message } from "../components/Message";

type Chat = {
  id: number;
  userName: string;
};

type ChatMessage = {
  id: number;
  text: string;
  chatId: number;
};

const chats: Chat[] = [
  { id: 1, userName: "John" },
  { id: 2, userName: "Johnium" },
];

export const ChatsPage = () => {
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

type ChatListProps = {
  chats: Chat[];
  selectedChatId: number;
  onSelectChat: (chatId: number) => void;
};

const ChatList = ({ chats, selectedChatId, onSelectChat }: ChatListProps) => {
  const hasSelectedChat = selectedChatId > 0;

  return (
    <Box
      sx={{
        width: 330,
        flexShrink: 0,
        borderTop: "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0",
        "@media (max-width: 1100px)": {
          display: hasSelectedChat ? "none" : "block",
          width: "100%",
          borderRadius: 0,
        },
        "media (max-width: 800px)": {
          border: 0,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Box sx={{ fontSize: 22, fontWeight: 600 }}>Чаты</Box>
        <Paper elevation={0} sx={searchInputWrapSx}>
          <SearchIcon />
          <InputBase
            placeholder="Поиск по чатам..."
            sx={{
              width: "100%",
              fontSize: 15,
              color: "#0f172a",
            }}
          />
        </Paper>
      </Box>

      {chats.length > 0 ? (
        chats.map((chat) => {
          const active = selectedChatId === chat.id;

          return (
            <ButtonBase
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              sx={{
                width: "100%",
                textAlign: "left",
                justifyContent: "left",
                backgroundColor: active ? "#edf4ff" : "#ffffff",
                transition: "background-color 220ms ease",
                color: active ? "#5f8df0" : "#334765",
                "&:hover": {
                  backgroundColor: "#f6f8fc",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  width: "100%",
                  color: "#0f172a",
                }}
              >
                <Box sx={{ flexShrink: 0 }}>
                  <SocialIcon width={48} height={48} />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    minWidth: 0,
                  }}
                >
                  <Box sx={{ fontSize: 16, fontWeight: 500, lineHeight: 1.2 }}>
                    {chat.userName}
                  </Box>

                  <Box sx={{ fontSize: 16, lineHeight: 1.5, color: "#334765" }}>
                    Последнее сообщение..
                  </Box>
                </Box>
              </Box>
            </ButtonBase>
          );
        })
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 10,
            color: "#334765",
            fontSize: 18,
          }}
        >
          Нет чатов
        </Box>
      )}
    </Box>
  );
};

type ChatDialogProps = {
  chat: Chat;
  message: string;
  messages: ChatMessage[];
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onBack: () => void;
};

const ChatDialog = ({
  chat,
  message,
  messages,
  onMessageChange,
  onSendMessage,
  onBack,
}: ChatDialogProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        border: "1px solid #e2e8f0",
        borderRadius: "0px 16px 16px 0px",
        "@media (max-width: 800px)": {
          borderRadius: 0,
          borderLeft: 0,
          borderRight: 0,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2,
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          borderRadius: "0px 16px 0px 0px",
          "@media (max-width: 800px)": {
            borderRadius: 0,
          },
        }}
      >
        <ButtonBase
          onClick={onBack}
          sx={{
            display: "none",
            width: 36,
            height: 36,
            borderRadius: "50%",
            color: "#8D9DB4",
            transition: "background-color 180ms ease, color 180ms ease",
            "&:hover": {
              color: "#64748b",
              backgroundColor: "#f1f5f9",
            },
            "@media (max-width: 800px)": {
              display: "flex",
            },
          }}
        >
          <Box
            component={BackIcon}
            sx={{
              width: 24,
              height: 24,
              color: "inherit",
            }}
          />
        </ButtonBase>

        <Box sx={{ flexShrink: 0 }}>
          <SocialIcon width={48} height={48} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            minWidth: 0,
          }}
        >
          <Box sx={{ fontSize: 18, fontWeight: 500, lineHeight: 1.2 }}>
            {chat.userName}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: 2,
          gap: 1,
          overflowY: "auto",
        }}
      >
        {messages.map((item) => (
          <Message key={item.id} message={item.text} />
        ))}
      </Box>

      <Box sx={{ mt: "auto", px: 2, py: 1.5 }}>
        <Paper elevation={0} sx={messageInputWrapSx}>
          <InputBase
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Написать сообщение..."
            sx={{
              width: "100%",
              fontSize: 15,
              color: "#0f172a",
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSendMessage();
              }
            }}
          />

          {message.length > 0 && (
            <ButtonBase type="button" onClick={onSendMessage} sx={sendBtnSx}>
              <SendIcon width={20} height={20} />
            </ButtonBase>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const EmptyDialog = () => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#334765",
      fontSize: 18,
      border: "1px solid #e2e8f0",
      borderRadius: "0px 16px 16px 0px",
      "@media (max-width: 1100px)": {
        display: "none",
      },
    }}
  >
    Выберите чат
  </Box>
);

const searchInputWrapSx = {
  display: "flex",
  gap: 1,
  px: 1.5,
  py: 1,
  borderRadius: 3,
  border: "1px solid #dbe4f0",
  backgroundColor: "#f8fafc",
  color: "#8FA1BF",
  transition: "background-color 180ms ease, border-color 180ms ease",
  "&:focus-within": {
    backgroundColor: "#eef2f7",
    borderColor: "#c6d2e1",
  },
} as const;

const messageInputWrapSx = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  px: 1.5,
  py: 1,
  borderRadius: 3,
  border: "1px solid #dbe4f0",
  backgroundColor: "#f8fafc",
  transition: "background-color 180ms ease, border-color 180ms ease",
  "&:focus-within": {
    backgroundColor: "#eef2f7",
    borderColor: "#c6d2e1",
  },
} as const;

const sendBtnSx = {
  width: 36,
  height: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderRadius: 2.5,
  backgroundColor: "#8FA1BF",
  cursor: "pointer",
  transition: "0.2s ease",
  "&:hover": {
    backgroundColor: "#7C92B0",
  },
} as const;
