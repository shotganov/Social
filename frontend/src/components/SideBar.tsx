import { Box, ButtonBase } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CreatePostModalWindow } from "./CreatePostModalWindow";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/selectors";
import HomeIcon from "../../public/icon-home.svg?react";
import MoreIcon from "../../public/icon-more.svg?react";
import ChatIcon from "../../public/icon-chat.svg?react";
import NotificationIcon from "../../public/icon-notification.svg?react";
import ProfileIcon from "../../public/icon-profile.svg?react";
import SocialIcon from "../../public/icon-social.svg?react";
import SearchIcon from "../../public/icon-search.svg?react";

type Props = {
  isChatsPage: boolean;
};

export const SideBar = ({ isChatsPage }: Props) => {
  const user = useAppSelector(selectUser);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

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
        maxWidth: 300,
        width: "100%",
        "@media (max-width: 1350px)": {
          width: 72,
          maxWidth: 72,
        },
        "@media (max-width: 800px)": {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          top: "auto",
          zIndex: 30,
          width: "100%",
          maxWidth: "none",
          height: 72,
          ml: 0,
          p: 0,
          "body.chat-dialog-open &": {
            display: "none",
          },
        },
        height: "100vh",
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
          "@media (max-width: 1350px)": {
            alignItems: "center",
            px: 1,
          },
          "@media (max-width: 800px)": {
            flexDirection: "row",
            justifyContent: "center",
            px: 1.5,
            py: 1,
            borderRadius: 0,
            borderLeft: 0,
            borderRight: 0,
            borderBottom: 0,
            boxShadow: "0 -8px 24px rgba(15, 23, 42, 0.08)",
          },
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
            "@media (max-width: 1350px)": {
              alignItems: "center",
              gap: 1.25,
            },
            "@media (max-width: 800px)": {
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              gap: 0.5,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              px: 1.5,
              "@media (max-width: 1350px)": {
                px: 0,
                pb: 0,
                width: 48,
                height: 48,
                justifyContent: "center",
                mb: 1,
              },
              "@media (max-width: 800px)": {
                display: "none",
              },
              gap: 1.5,
              pb: 2,
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            <SocialIcon width={48} height={48} />
            <Box
              component="span"
              sx={{
                ...sxAdaptive,
              }}
            >
              Social
            </Box>
          </Box>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <ButtonBase
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  minHeight: 60,
                  gap: 1.5,
                  px: 2.5,
                  "@media (max-width: 1350px)": {
                    width: 48,
                    height: 48,
                    px: 0,
                    minHeight: 48,
                    gap: 0,
                    justifyContent: "center",
                  },
                  "@media (max-width: 800px)": {
                    width: 52,
                    height: 52,
                    minHeight: 52,
                    borderRadius: 3,
                  },
                  borderRadius: 3,
                  color: "#334765",
                  fontSize: 18,
                  fontWeight: 400,
                  textTransform: "none",
                  transition: "background-color 180ms ease",
                  backgroundColor: "transparent",
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
                <Icon width={24} height={24} />
                <Box component="span" sx={{ lineHeight: 1.2, ...sxAdaptive }}>
                  {item.text}
                </Box>
              </ButtonBase>
            );
          })}

          <ButtonBase
            type="button"
            onClick={() => setIsCreatePostOpen(true)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 52,
              mx: 1,
              mt: 1,
              px: 2,
              borderRadius: 3,
              backgroundColor: "#2563ff",
              color: "#ffffff",
              fontSize: 17,
              fontWeight: 700,
              transition: "background-color 180ms ease",
              "&:hover": {
                backgroundColor: "#1d4ed8",
              },
              "@media (max-width: 1350px)": {
                width: 48,
                height: 48,
                minHeight: 48,
                mx: 0,
                mt: 0.5,
                px: 0,
                borderRadius: "50%",
              },
              "@media (max-width: 800px)": {
                width: 52,
                height: 52,
                minHeight: 52,
                mt: 0,
                borderRadius: 3,
              },
            }}
          >
            <Box component="span" sx={{ ...sxAdaptive }}>
              Пост
            </Box>
            <Box
              component="span"
              sx={{
                display: "none",
                position: "relative",
                width: 20,
                height: 20,
                "@media (max-width: 1350px)": {
                  display: "block",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  width: 3,
                  height: "100%",
                  borderRadius: 3,
                  backgroundColor: "currentColor",
                  transform: "translateX(-50%)",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  width: "100%",
                  height: 3,
                  borderRadius: 999,
                  backgroundColor: "currentColor",
                  transform: "translateY(-50%)",
                },
              }}
            />
          </ButtonBase>
        </Box>

        <ButtonBase
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            p: 1.5,
            "@media (max-width: 1350px)": {
              width: 48,
              height: 48,
              p: 0,
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "#f6f8fc",
              },
            },
            "@media (max-width: 800px)": {
              display: "none",
            },
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
            <Box sx={{ ...sxAdaptive }}>
              <Box sx={{ lineHeight: 1.2, fontSize: 17, fontWeight: 500 }}>
                {user.username}
              </Box>
              <Box sx={{ fontSize: 15, color: "#64748b" }}>
                @{user.tag ? user.tag : "fsdfd"}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              color: "#64748b",
              "@media (max-width: 1350px)": {
                display: "none",
              },
            }}
          >
            <MoreIcon />
          </Box>
        </ButtonBase>
      </Box>

      {isCreatePostOpen && (
        <CreatePostModalWindow setIsEdit={setIsCreatePostOpen} />
      )}
    </Box>
  );
};

const sxAdaptive = {
  "@media (max-width: 1350px)": {
    display: "none",
  },
};
