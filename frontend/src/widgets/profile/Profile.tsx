import { Box, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileCoverImage from "@shared/assets/images/profile-background.jpg";
import SocialIcon from "@shared/assets/icons/icon-social.svg";
import BackIcon from "@shared/assets/icons/icon-back.svg?react";
import { alphaColors, colors, transitions } from "@shared/styles";
import type { User } from "@shared/model";
import { EditProfileModal } from "@features/profile";

type Props = {
  user: User;
};

export const Profile = ({ user }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const handleNavigateBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Box>
        <ButtonBase
          onClick={handleNavigateBack}
          sx={{
            position: "absolute",
            top: 24,
            left: 24,
            zIndex: 1,
            width: 32,
            height: 32,
            borderRadius: "50%",
            color: colors.surface,
            backgroundColor: alphaColors.imageRemoveBg,
            transition: transitions.background,
            "&:hover": {
              backgroundColor: alphaColors.imageRemoveHoverBg,
            },
          }}
        >
          <Box
            component={BackIcon}
            sx={{
              width: 24,
              height: 24,
              color: "inherit",
              objectFit: "cover",
            }}
          />
        </ButtonBase>

        <Box
          sx={{
            width: "100%",
            height: 200,
            backgroundImage: `url(${user.coverImage ? user.coverImage : ProfileCoverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: `1px solid ${colors.border}`,
            borderBottom: 0,
            borderRadius: "16px 16px 0 0",
          }}
        />
      </Box>

      <Box
        sx={{
          position: "relative",
          p: 3,
          pb: 2,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          gap: 1.25,
          border: `1px solid ${colors.border}`,
          borderTop: `0px solid ${colors.border}`,
          borderRadius: "0px 0px 16px 16px",
        }}
      >
        <Box
          component="img"
          src={user.avatar ? user.avatar : SocialIcon}
          sx={{
            display: "flex",
            position: "absolute",
            transform: "translateY(-75%)",
            border: `1px solid ${colors.border}`,
            borderRadius: "50%",
            width: 128,
            height: 128,
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonBase
            onClick={() => setIsEdit(true)}
            sx={{
              height: "40px",
              fontSize: 14,
              p: 0.5,
              mt: -1,
              border: `1px solid ${colors.border}`,
              backgroundColor: "white",
              borderRadius: 4,
              color: colors.textSoft,
              transition: transitions.background,
              "&:hover": {
                backgroundColor: colors.inputBg,
              },
            }}
          >
            Редактировать
          </ButtonBase>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ fontSize: 22, fontWeight: "700" }}>{user.username}</Box>
          <Box sx={{ fontSize: 15, color: colors.textMuted }}>
            @{user.tag ? user.tag : "first.user"}
          </Box>
        </Box>

        <Box sx={{ fontSize: 15 }}>{user.bio}</Box>

        <Box sx={{ display: "flex", gap: 1, fontSize: 14 }}>
          <Box>0 подписок</Box>
          <Box>0 подписчиков</Box>
        </Box>
      </Box>

      {isEdit && <EditProfileModal setIsEdit={setIsEdit} user={user} />}
    </>
  );
};
