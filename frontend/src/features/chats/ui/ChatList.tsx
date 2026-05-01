import { Box, ButtonBase } from "@mui/material";
import { useState } from "react";
import SocialIcon from "@shared/assets/icons/icon-social.svg?react";
import { Title, SearchInput } from "@shared/ui";
import type { Chat } from "../model/Chat";

type ChatListProps = {
  chats: Chat[];
  selectedChatId: number;
  onSelectChat: (chatId: number) => void;
};

export const ChatList = ({
  chats,
  selectedChatId,
  onSelectChat,
}: ChatListProps) => {
  const hasSelectedChat = selectedChatId > 0;
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // Здесь будет поиск по списку чатов
  };

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
        "@media (max-width: 800px)": {
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
        <Title text="Чаты" fontSize={22} />
        <SearchInput
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          placeholder="Поиск по чатам..."
          px={1.75}
          py={1.25}
        />
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
