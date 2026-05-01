import { Box, ButtonBase } from "@mui/material";
import MoreIcon from "@shared/assets/icons/icon-more.svg?react";
import type { User } from "@shared/model";
import { breakpoints, colors, radius, transitions } from "@shared/styles";
import { Avatar } from "@shared/ui";

type SideBarProfileProps = {
  isOpen: boolean;
  onLogout: () => void;
  onToggle: () => void;
  user: User;
};

export const SideBarProfile = ({
  isOpen,
  onLogout,
  onToggle,
  user,
}: SideBarProfileProps) => {
  const userTag = user.tag || "fsdfd";

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {isOpen && (
        <Box sx={menuSx}>
          <ButtonBase onClick={onLogout} sx={logoutButtonSx}>
            Выйти @{userTag}
          </ButtonBase>
        </Box>
      )}

      <ButtonBase onClick={onToggle} sx={profileButtonSx}>
        <Box sx={profileInfoSx}>
          <Avatar src={"http://localhost:3000/public/" + user.avatar} size={44} />

          <Box sx={sxAdaptive}>
            <Box sx={{ lineHeight: 1.2, fontSize: 17, fontWeight: 500 }}>
              {user.username}
            </Box>
            <Box sx={{ fontSize: 15, color: colors.textMuted }}>
              @{userTag}
            </Box>
          </Box>
        </Box>
        <Box sx={moreIconSx}>
          <MoreIcon />
        </Box>
      </ButtonBase>
    </Box>
  );
};

const menuSx = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: "calc(100% + 12px)",
  zIndex: 5,
  p: 1,
  borderRadius: 4,
  border: `1px solid ${colors.border}`,
  backgroundColor: colors.surface,
  color: colors.text,
  boxShadow: "0 14px 32px rgba(143, 161, 191, 0.26)",
  [breakpoints.compactSidebar]: {
    left: 0,
    right: "auto",
    width: 260,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: "50%",
    bottom: -8,
    width: 16,
    height: 16,
    borderRight: `1px solid ${colors.border}`,
    borderBottom: `1px solid ${colors.border}`,
    backgroundColor: colors.surface,
    transform: "translateX(-50%) rotate(45deg)",
    [breakpoints.compactSidebar]: {
      left: 24,
    },
  },
} as const;

const logoutButtonSx = {
  width: "100%",
  justifyContent: "flex-start",
  px: 2,
  py: 1.5,
  borderRadius: radius.md,
  color: colors.textSoft,
  fontSize: 16,
  fontWeight: 700,
  textAlign: "left",
  transition: transitions.background,
  "&:hover": {
    color: colors.text,
    backgroundColor: colors.inputBg,
  },
} as const;

const profileButtonSx = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  p: 1.5,
  borderRadius: radius.md,
  color: colors.text,
  transition: transitions.background,
  "&:hover": {
    backgroundColor: colors.inputBg,
  },
  [breakpoints.compactSidebar]: {
    width: 48,
    height: 48,
    p: 0,
    justifyContent: "center",
    "&:hover": {
      backgroundColor: colors.hoverBg,
    },
  },
  [breakpoints.mobile]: {
    display: "none",
  },
} as const;

const profileInfoSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  textAlign: "left",
} as const;

const moreIconSx = {
  color: colors.textMuted,
  [breakpoints.compactSidebar]: {
    display: "none",
  },
} as const;

const sxAdaptive = {
  [breakpoints.compactSidebar]: {
    display: "none",
  },
};
