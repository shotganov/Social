import { Box, ButtonBase } from "@mui/material";
import { NavLink } from "react-router-dom";
import { breakpoints, colors, radius, transitions } from "@shared/styles";
import { menuItems } from "./model/menuItems";

type SideBarNavProps = {
  notificationsCount: number;
};

export const SideBarNav = ({ notificationsCount }: SideBarNavProps) => {
  return (
    <>
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <ButtonBase
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={navItemSx}
          >
            <Box sx={iconWrapSx}>
              <Icon width={24} height={24} />

              {item.path === "/notifications" && notificationsCount > 0 && (
                <Box component="span" sx={badgeSx}>
                  {notificationsCount > 99 ? "99+" : notificationsCount}
                </Box>
              )}
            </Box>
            <Box component="span" sx={{ lineHeight: 1.2, ...sxAdaptive }}>
              {item.text}
            </Box>
          </ButtonBase>
        );
      })}
    </>
  );
};

const navItemSx = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  minHeight: 60,
  gap: 1.5,
  px: 2.5,
  borderRadius: radius.md,
  color: colors.textSoft,
  fontSize: 18,
  fontWeight: 400,
  textTransform: "none",
  transition: transitions.background,
  backgroundColor: "transparent",
  "& svg": {
    display: "block",
    flexShrink: 0,
    color: "inherit",
  },
  "&.active": {
    backgroundColor: colors.activeBg,
    color: colors.accent,
  },
  "&:hover": {
    backgroundColor: colors.hoverBg,
  },
  [breakpoints.compactSidebar]: {
    width: 48,
    height: 48,
    px: 0,
    minHeight: 48,
    gap: 0,
    justifyContent: "center",
  },
  [breakpoints.mobile]: {
    width: 52,
    height: 52,
    minHeight: 52,
    borderRadius: radius.md,
  },
} as const;

const iconWrapSx = {
  position: "relative",
  width: 24,
  height: 24,
  flexShrink: 0,
} as const;

const badgeSx = {
  position: "absolute",
  top: -7,
  right: -3,
  minWidth: 16,
  height: 16,
  px: 0.5,
  borderRadius: radius.pill,
  border: `1px solid ${colors.surface}`,
  backgroundColor: colors.like,
  color: colors.surface,
  fontSize: 11,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as const;

const sxAdaptive = {
  [breakpoints.compactSidebar]: {
    display: "none",
  },
};
