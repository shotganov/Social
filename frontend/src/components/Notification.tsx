import { Box } from "@mui/material";
import type { NotificationType } from "../types/Notification";

interface NotificationProps {
  notification: NotificationType;
}

const notificationTexts = {
  follow: "подписался на вас",
  like: "поставил лайк на ваш пост",
  comment: "написал комментарий под вашим постом",
};

export const Notification = ({ notification }: NotificationProps) => {
  const textNotification = notificationTexts[notification.type];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        mt: 2,
        borderRadius: 4,
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
      }}
    >
      <Box
        component="img"
        src={notification.sender.avatar}
        alt=""
        sx={{
          width: 44,
          height: 44,
          flexShrink: 0,
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 1.5,
          minWidth: 0,
        }}
      >
        <Box sx={{ fontSize: 17, fontWeight: 500 }}>
          {notification.sender.username}
        </Box>

        <Box sx={{ fontSize: 15, lineHeight: 1.5, color: "#334765" }}>
          {textNotification}
        </Box>
      </Box>
    </Box>
  );
};
