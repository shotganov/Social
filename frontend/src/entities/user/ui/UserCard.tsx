import { Box, ButtonBase } from "@mui/material";
import { colors } from "@shared/styles";
import { Avatar } from "@shared/ui";
import type { User } from "@shared/model";
import SocialIcon from "@public/icon-social.svg";

type Props = {
  user: User;
  isBorder?: boolean;
};

export const UserCard = ({ user, isBorder = false }: Props) => {
  return (
    <ButtonBase
      key={user.id}
      sx={{
        width: "100%",
        p: 1,
        borderRadius: 2.5,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 1.25,
        minWidth: 0,
        border: isBorder ? `1px solid ${colors.border}` : "none",
        backgroundColor: "#ffffff",
        transition: "background-color 180ms ease",
        "&:hover": {
          backgroundColor: colors.hoverBg,
        },
      }}
    >
      <Avatar src={user.avatar ? user.avatar : SocialIcon} size={38} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            maxWidth: 220,
            fontSize: 14,
            fontWeight: 500,
            color: colors.text,
            lineHeight: 1.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {user.username}
        </Box>

        <Box
          sx={{
            maxWidth: 220,
            mt: 0.25,
            fontSize: 13,
            lineHeight: 1.35,
            color: colors.textMuted,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          @{user.tag}
        </Box>
      </Box>
    </ButtonBase>
  );
};
