import { Box, ButtonBase } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { clearToken } from "@features/auth";
import { clearUser } from "@entities/user";
import { selectUser } from "@entities/user";
import { CreatePostModal } from "@features/posts";
import {
  alphaColors,
  breakpoints,
  colors,
  radius,
  transitions,
} from "@shared/styles";
import { Title } from "@shared/ui";
import SocialIcon from "@public/icon-social.svg?react";
import { SideBarNav } from "./SideBarNav";
import { SideBarProfile } from "./SideBarProfile";

type Props = {
  isChatsPage: boolean;
};

export const SideBar = ({ isChatsPage }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  if (!user) return null;
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const notificationsCount = 3;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(clearToken());
    dispatch(clearUser());
    setIsProfileMenuOpen(false);
    navigate("/auth");
  };

  return (
    <Box sx={rootSx}>
      <Box
        sx={{
          ...panelSx,
          borderRadius: isChatsPage ? "16px 0px 0px 16px" : 4,
        }}
      >
        <Box sx={topSectionSx}>
          <Box sx={logoSx}>
            <SocialIcon width={48} height={48} />
            <Box component="span" sx={sxAdaptive}>
              <Title text="Social" fontSize={22} />
            </Box>
          </Box>

          <SideBarNav notificationsCount={notificationsCount} />

          <ButtonBase
            type="button"
            onClick={() => setIsCreatePostOpen(true)}
            sx={createPostButtonSx}
          >
            <Box component="span" sx={sxAdaptive}>
              Пост
            </Box>
            <Box component="span" sx={createPostIconSx} />
          </ButtonBase>
        </Box>

        <SideBarProfile
          isOpen={isProfileMenuOpen}
          onLogout={handleLogout}
          onToggle={() => setIsProfileMenuOpen((current) => !current)}
          user={user}
        />
      </Box>

      {isCreatePostOpen && <CreatePostModal setIsEdit={setIsCreatePostOpen} />}
    </Box>
  );
};

const rootSx = {
  maxWidth: 300,
  width: "100%",
  height: "100vh",
  position: "sticky",
  top: 0,
  py: 1,
  alignSelf: "flex-start",
  [breakpoints.compactSidebar]: {
    width: 72,
    maxWidth: 72,
  },
  [breakpoints.mobile]: {
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
} as const;

const panelSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  px: 1.5,
  py: 1.5,
  border: `1px solid ${colors.border}`,
  backgroundColor: colors.surface,
  height: "100%",
  width: "100%",
  [breakpoints.compactSidebar]: {
    alignItems: "center",
    px: 1,
  },
  [breakpoints.mobile]: {
    flexDirection: "row",
    justifyContent: "center",
    px: 1.5,
    py: 1,
    borderRadius: 0,
    borderLeft: 0,
    borderRight: 0,
    borderBottom: 0,
    boxShadow: alphaColors.bottomBarShadow,
  },
} as const;

const topSectionSx = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  [breakpoints.compactSidebar]: {
    alignItems: "center",
    gap: 1.25,
  },
  [breakpoints.mobile]: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 0.5,
  },
} as const;

const logoSx = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 1.5,
  px: 1.5,
  pb: 2,
  [breakpoints.compactSidebar]: {
    px: 0,
    pb: 0,
    width: 48,
    height: 48,
    justifyContent: "center",
    mb: 1,
  },
  [breakpoints.mobile]: {
    display: "none",
  },
} as const;

const createPostButtonSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 52,
  mx: 1,
  mt: 1,
  px: 2,
  borderRadius: radius.md,
  backgroundColor: colors.accent,
  color: colors.surface,
  fontSize: 17,
  fontWeight: 700,
  transition: transitions.background,
  "&:hover": {
    backgroundColor: colors.accentHover,
  },
  [breakpoints.compactSidebar]: {
    width: 48,
    height: 48,
    minHeight: 48,
    mx: 0,
    mt: 0.5,
    px: 0,
    borderRadius: "50%",
  },
  [breakpoints.mobile]: {
    display: "none",
  },
} as const;

const createPostIconSx = {
  display: "none",
  position: "relative",
  width: 20,
  height: 20,
  [breakpoints.compactSidebar]: {
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
} as const;

const sxAdaptive = {
  [breakpoints.compactSidebar]: {
    display: "none",
  },
};
