import { Box, ButtonBase, InputBase, Paper } from "@mui/material";
import SearchIcon from "../../public/icon-search.svg?react";
import SendIcon from "../../public/icon-send.svg?react";
import SocialIcon from "../../public/icon-social.svg?react";
import { useState } from "react";
import { Message } from "../components/Message";

type Chat = {
  id: number;
  userName: string;
};

type Message = {
  id: number;
  text: string;
  // recipientId: number;
  // senderId: number;
  chatId: number;
};

export const ChatsPage = () => {
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState(0);
  const [messageList, setMessageList] = useState<Message[]>([]);

  const handleSendMessage = (text: string, chatId: number) => {
    setMessageList([
      ...messageList,
      {
        id: messageList.length + 1,
        text: text,
        // recipientId: 1,
        // senderId: 1,
        chatId: chatId,
      },
    ]);

    setMessage("");
  };

  const Chats: Chat[] = [
    { id: 1, userName: "John" },
    { id: 2, userName: "Johnium" },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        py: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: "white",
          height: "100%",
          borderRadius: "0px 16px 16px 0px",
        }}
      >
        <Box
          sx={{
            width: "330px",
            borderTop: "1px solid #e2e8f0",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <Box
            sx={{
              width: "330px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 2,
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <Box sx={{ fontSize: 22, fontWeight: 600 }}>Чаты</Box>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                gap: 1,
                px: 1.5,
                py: 1,
                borderRadius: 3,
                border: "1px solid #dbe4f0",
                backgroundColor: "#f8fafc",
                color: "#8FA1BF",
                transition:
                  "background-color 180ms ease, border-color 180ms ease",
                "&:focus-within": {
                  backgroundColor: "#eef2f7",
                  borderColor: "#c6d2e1",
                },
              }}
            >
              <SearchIcon></SearchIcon>
              <InputBase
                // value={query}
                // onChange={(event) => setQuery(event.target.value)}
                placeholder={"Поиск по чатам..."}
                sx={{
                  width: "100%",
                  fontSize: 15,
                  color: "#0f172a",
                }}
              />
            </Paper>
          </Box>

          {Chats.length > 0 ? (
            Chats.map((elem, index) => {
              return (
                <ButtonBase
                  key={index}
                  onClick={() => setChatId(elem.id)}
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    justifyContent: "left",
                    backgroundColor: chatId === elem.id ? "#edf4ff" : "#ffffff",
                    transition: "background-color 220ms ease",
                    color: chatId === elem.id ? "#5f8df0" : "#334765",
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
                      <Box
                        sx={{ fontSize: 16, fontWeight: 500, lineHeight: 1.2 }}
                      >
                        {elem.userName}
                      </Box>

                      <Box
                        sx={{ fontSize: 16, lineHeight: 1.5, color: "#334765" }}
                      >
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
                fontSize: "18px",
              }}
            >
              Нет чатов
            </Box>
          )}
        </Box>

        {chatId > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              border: "1px solid #e2e8f0",
              borderRadius: "0px 16px 16px 0px",
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
                <Box sx={{ fontSize: 18, fontWeight: 500, lineHeight: 1.2 }}>
                  {Chats[chatId - 1].userName}
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
              {messageList.map((elem) => {
                if (chatId === elem.chatId) {
                  return <Message message={elem.text}></Message>;
                }
              })}
            </Box>

            <Box sx={{ mt: "auto", px: 2, py: 1.5 }}>
              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  py: 1,
                  borderRadius: 3,
                  border: "1px solid #dbe4f0",
                  backgroundColor: "#f8fafc",
                  transition:
                    "background-color 180ms ease, border-color 180ms ease",
                  "&:focus-within": {
                    backgroundColor: "#eef2f7",
                    borderColor: "#c6d2e1",
                  },
                }}
              >
                <InputBase
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={"Написать сообщение..."}
                  sx={{
                    width: "100%",
                    fontSize: 15,
                    color: "#0f172a",
                  }}
                />

                {message.length > 0 && (
                  <ButtonBase
                    type="button"
                    onClick={() => handleSendMessage(message, chatId)}
                    sx={{
                      width: "36px",
                      height: "30px",
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
                    }}
                  >
                    <SendIcon width={20} height={20} />
                  </ButtonBase>
                )}
              </Paper>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#334765",
              fontSize: "18px",
              border: "1px solid #e2e8f0",
              borderRadius: "0px 16px 16px 0px",
            }}
          >
            Выберите чат
          </Box>
        )}
      </Box>
    </Box>
  );
};
