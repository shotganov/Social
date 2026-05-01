import { Box } from "@mui/material";
import { colors, radius } from "@shared/styles";
import type { NotificationType } from "../model/Notification";

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
        borderRadius: radius.lg,
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
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

        <Box sx={{ fontSize: 15, lineHeight: 1.5, color: colors.textSoft }}>
          {textNotification}
        </Box>
      </Box>
    </Box>
  );
};
