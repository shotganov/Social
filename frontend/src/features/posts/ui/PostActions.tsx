import { useState } from "react";
import { Box, ButtonBase } from "@mui/material";
import CommentIcon from "@shared/assets/icons/icon-comment.svg?react";
import HeartIcon from "@shared/assets/icons/icon-like.svg?react";
import ReportIcon from "@shared/assets/icons/icon-report.svg?react";
import { alphaColors, colors, transitions, radius } from "@shared/styles";
import { ReportPostModal } from "./ReportPostModal";

type PostActionsProps = {
  likes: number;
  comments: number;
  showReport?: boolean;
  onCommentsClick?: () => void;
};

export const PostActions = ({
  likes,
  comments,
  showReport = true,
  onCommentsClick,
}: PostActionsProps) => {
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: colors.textSoft,
          justifyContent: "space-between",
          mt: -0.5,
          ml: -0.8,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ButtonBase
            sx={{
              ...postActionButtonSx,
              "&:hover": {
                color: colors.like,
                backgroundColor: alphaColors.likeHoverBg,
              },
            }}
          >
            <Box
              component={HeartIcon}
              sx={{
                width: 24,
                height: 18,
                flexShrink: 0,
                color: "inherit",
                display: "block",
              }}
            />
            {likes}
          </ButtonBase>

          <ButtonBase
            onClick={onCommentsClick}
            sx={{
              ...postActionButtonSx,
              "&:hover": {
                color: colors.comment,
                backgroundColor: alphaColors.accentHoverBg,
              },
            }}
          >
            <Box
              component={CommentIcon}
              sx={{
                width: 23,
                height: 19,
                flexShrink: 0,
                color: "inherit",
                display: "block",
              }}
            />
            {comments}
          </ButtonBase>
        </Box>

        {showReport && (
          <ButtonBase
            onClick={() => setIsReportOpen(true)}
            sx={{
              width: 24,
              height: 24,
              mr: -0.25,
              borderRadius: "50%",
              color: colors.textMuted,
              transition: transitions.backgroundAndColor,
              "&:hover": {
                color: colors.accent,
                backgroundColor: alphaColors.accentHoverBg,
              },
            }}
          >
            <Box
              component={ReportIcon}
              sx={{ width: 17.5, height: 17.5, color: "inherit" }}
            />
          </ButtonBase>
        )}
      </Box>

      {isReportOpen && (
        <ReportPostModal onClose={() => setIsReportOpen(false)} />
      )}
    </>
  );
};

const postActionButtonSx = {
  px: 1,
  pl: 0.5,
  py: 0.5,
  borderRadius: radius.md,
  fontSize: 14,
  fontWeight: 500,
  display: "flex",
  color: colors.textMuted,
  alignItems: "center",
  transition: transitions.background,
} as const;
