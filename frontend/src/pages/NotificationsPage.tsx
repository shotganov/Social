import { Box } from "@mui/material";
import { Notification, type NotificationType } from "@features/notifications";
import SocialIcon from "@shared/assets/icons/icon-social.svg";
import { Title } from "@shared/ui";

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
        py: 2,
      }}
    >
      <Title text="Уведомления" fontSize={22} />

      {Notifications.map((elem) => {
        return <Notification key={elem.id} notification={elem} />;
      })}
    </Box>
  );
};
