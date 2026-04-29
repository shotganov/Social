import { Box } from "@mui/material";
import { Notification } from "../components/Notification";
import type { NotificationType } from "../types/Notification";
import SocialIcon from "../../public/icon-social.svg";

export const NotificationsPage = () => {
  const Notifications: NotificationType[] = [
    {
      id: "1",
      recipientId: 1,
      sender: {
        id: 10,
        username: "Alex",
        tag: "alex",
        avatar: SocialIcon,
        bio: "",
      },
      type: "follow",
    },
    {
      id: "2",
      recipientId: 1,
      sender: {
        id: 11,
        username: "Maria Doe",
        tag: "maria.doe",
        avatar: SocialIcon,
        bio: "",
      },
      type: "like",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Box
        sx={{
          pt: 2,
          fontSize: "22px",
          fontWeight: "700",
        }}
      >
        Уведомления
      </Box>

      {Notifications.map((elem) => {
        return <Notification key={elem.id} notification={elem} />;
      })}
    </Box>
  );
};
