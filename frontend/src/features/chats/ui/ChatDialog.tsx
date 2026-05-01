import { Box, ButtonBase, InputBase, Paper } from "@mui/material";
import BackIcon from "@public/icon-back.svg?react";
import SendIcon from "@public/icon-send.svg?react";
import SocialIcon from "@public/icon-social.svg?react";
import type { Chat, ChatMessage } from "../model/Chat";
import { Message } from "./Message";
import { messageInputWrapSx, sendBtnSx } from "./chatStyles";

type ChatDialogProps = {
  chat: Chat;
  message: string;
  messages: ChatMessage[];
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onBack: () => void;
};

export const ChatDialog = ({
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
