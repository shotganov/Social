import Button from "@mui/material/Button";
import { Box, ButtonBase } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/selectors";
import HomeIcon from "../../public/icon-home.svg?react";
import MoreIcon from "../../public/icon-more.svg?react";
import ChatIcon from "../../public/icon-chat.svg?react";
import NotificationIcon from "../../public/icon-notification.svg?react";
import ProfileIcon from "../../public/icon-profile.svg?react";
import SocialIcon from "../../public/icon-social.svg?react";
import SearchIcon from "../../public/icon-search.svg?react";
import { useState } from "react";

type Props = {
  isChatsPage: boolean;
};

export const SideBar = ({ isChatsPage }: Props) => {
  const user = useAppSelector(selectUser);

  const menuItems = [
    { text: "Главная", icon: HomeIcon, path: "/" },
    { text: "Поиск", icon: SearchIcon, path: "/search" },
    { text: "Уведомления", icon: NotificationIcon, path: "/notifications" },
    { text: "Чаты", icon: ChatIcon, path: "/chats" },
    { text: "Профиль", icon: ProfileIcon, path: "/profile/" },
  ];

  return (
    <Box
      sx={{
        ml: "20px",
        width: 300,
        height: "100vh",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        py: 1,
        alignSelf: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          px: 1.5,
          py: 1.5,
          borderRadius: isChatsPage ? "16px 0px 0px 16px" : 4,
          border: "1px solid #e2e8f0",
          backgroundColor: "white",
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              px: 1.5,
              gap: 1.5,
              pb: 2,
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            <SocialIcon width={48} height={48} />
            <span>Social</span>
          </Box>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                startIcon={<Icon width={24} height={24} />}
                sx={{
                  justifyContent: "flex-start",
                  minHeight: 60,
                  gap: 1.5,
                  px: 2.5,
                  borderRadius: 3,
                  color: "#334765",
                  fontSize: 18,
                  fontWeight: 400,
                  textTransform: "none",
                  // border: "1px solid #e2e8f0",
                  transition: "background-color 180ms ease",
                  backgroundColor: "transparent",
                  "& .MuiButton-startIcon": {
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  "& svg": {
                    display: "block",
                    flexShrink: 0,
                    color: "inherit",
                  },
                  "&.active": {
                    backgroundColor: "#edf4ff",
                    color: "#2563ff",
                  },
                  "&:hover": {
                    backgroundColor: "#f6f8fc",
                  },
                }}
              >
                <Box component="span" sx={{ lineHeight: 1.2 }}>
                  {item.text}
                </Box>
              </Button>
            );
          })}
        </Box>

        <ButtonBase
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            p: 1.5,
            borderRadius: 3,
            color: "#0f172a",
            transition: "background-color 180ms ease",
            "&:hover": {
              backgroundColor: "#f8fafc",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textAlign: "left",
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: "#cbd5e1",
                flexShrink: 0,
              }}
            />
            <Box>
              <Box sx={{ lineHeight: 1.2, fontSize: 17, fontWeight: 500 }}>
                {user.username}
              </Box>
              <Box sx={{ fontSize: 15, color: "#64748b" }}>
                @{user.tag ? user.tag : "fsdfd"}
              </Box>
            </Box>
          </Box>
          <MoreIcon style={{ color: "#64748b" }} />
        </ButtonBase>
      </Box>
    </Box>
  );
};
