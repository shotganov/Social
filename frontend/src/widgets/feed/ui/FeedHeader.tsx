import { Box, ButtonBase, Paper } from "@mui/material";
import { colors, radius, transitions } from "@shared/styles";
import type { FeedMode } from "../model/FeedMode";

type FeedTab = {
  label: string;
  value: FeedMode;
};

type FeedHeaderProps = {
  activeMode: FeedMode;
  onModeChange: (mode: FeedMode) => void;
  tabs: FeedTab[];
};

export const FeedHeader = ({
  activeMode,
  onModeChange,
  tabs,
}: FeedHeaderProps) => {
  return (
    <Box sx={rootSx}>
      <Paper elevation={0} sx={tabsPaperSx}>
        {tabs.map((tab) => {
          const active = activeMode === tab.value;

          return (
            <ButtonBase
              key={tab.value}
              onClick={() => onModeChange(tab.value)}
              sx={{
                ...tabButtonSx,
                fontWeight: active ? 700 : 500,
                color: active ? colors.text : colors.textMuted,
              }}
            >
              <Box
                component="span"
                sx={{
                  ...tabLabelSx,
                  "&::after": {
                    ...tabLabelUnderlineSx,
                    backgroundColor: active ? colors.accent : "transparent",
                    transform: active ? "scaleX(1)" : "scaleX(0)",
                  },
                }}
              >
                {tab.label}
              </Box>
            </ButtonBase>
          );
        })}
      </Paper>
    </Box>
  );
};

const rootSx = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  backgroundColor: colors.pageBg,
  pt: 1,
} as const;

const tabsPaperSx = {
  display: "flex",
  borderRadius: "16px 16px 0 0",
  border: `1px solid ${colors.border}`,
  backgroundColor: colors.surface,
  overflow: "hidden",
} as const;

const tabButtonSx = {
  width: "50%",
  height: 56,
  fontSize: 16,
  transition: transitions.backgroundAndColor,
  "&:hover": {
    backgroundColor: colors.inputBg,
  },
} as const;

const tabLabelSx = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  height: "100%",
} as const;

const tabLabelUnderlineSx = {
  content: '""',
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: 3,
  borderRadius: radius.pill,
  transformOrigin: "center",
  transition: "transform 180ms ease",
} as const;
