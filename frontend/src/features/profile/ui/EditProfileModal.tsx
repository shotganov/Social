import { Box, Paper, InputBase, TextareaAutosize } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ProfileCoverImage from "@public/profile-background.jpg";
import SocialIcon from "@public/icon-social.svg?react";
import CameraIcon from "@public/icon-camera-new.svg";
import { useAppDispatch } from "@app/hooks";
import { setUser } from "@entities/user";
import type { User } from "@shared/model";
import { Modal, ModalActionButton, ModalContent } from "@shared/ui";
import { alphaColors, colors, radius, transitions } from "@shared/styles";
import { validateProfile, type ProfileFormErrors } from "../validator";

type Props = {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
};

type InputFocused = "username" | "bio";
const avatarSize = 114;

export const EditProfileModal = ({ setIsEdit, user }: Props) => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<User>(user);
  const [inputFocused, setInputFocused] = useState<InputFocused | null>(null);
  const [errors, setErrors] = useState<ProfileFormErrors>({});
  const avatarBlobUrlRef = useRef<string | null>(null);
  const coverBlobUrlRef = useRef<string | null>(null);

  const handleFileIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (avatarBlobUrlRef.current) {
      URL.revokeObjectURL(avatarBlobUrlRef.current);
    }
    const url = URL.createObjectURL(file);
    avatarBlobUrlRef.current = url;
    setUserData((prev) => ({ ...prev, avatar: url }));
  };

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (coverBlobUrlRef.current) {
      URL.revokeObjectURL(coverBlobUrlRef.current);
    }
    const url = URL.createObjectURL(file);
    coverBlobUrlRef.current = url;
    setUserData((prev) => ({ ...prev, coverImage: url }));
  };

  const handleUsernameChange = (value: string) => {
    const next = { ...userData, username: value };
    setUserData(next);
    setErrors(validateProfile(next));
  };

  const handleBioChange = (value: string) => {
    const next = { ...userData, bio: value };
    setUserData(next);
    setErrors(validateProfile(next));
  };

  useEffect(() => {
    return () => {
      if (avatarBlobUrlRef.current) {
        URL.revokeObjectURL(avatarBlobUrlRef.current);
      }
      if (coverBlobUrlRef.current) {
        URL.revokeObjectURL(coverBlobUrlRef.current);
      }
    };
  }, []);

  return (
    <Modal zIndex={10} onClose={() => setIsEdit(false)}>
      <ModalContent
        width={600}
        maxWidth="calc(100vw - 32px)"
        sx={{
          transform: "translateY(-100px)",
          border: "none",
          p: 2,
          py: 3,
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ModalActionButton
            variant="secondary"
            onClick={() => setIsEdit(false)}
          >
            Отменить
          </ModalActionButton>
          <Box
            sx={{
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Редактировать профиль
          </Box>
          <ModalActionButton
            variant="primary"
            disabled={userData.username.trim().length === 0}
            onClick={() => {
              setIsEdit(false);
              dispatch(setUser(userData));
            }}
          >
            Сохранить
          </ModalActionButton>
        </Box>

        <Box
          sx={{
            position: "relative",
            height: "200px",
            backgroundImage: `url(${userData.coverImage ? userData.coverImage : ProfileCoverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            mx: -2,
            width: "calc(100% + 32px)",
          }}
        >
          <Box>
            <Box
              component="label"
              htmlFor="profile-image-upload"
              sx={cameraOverlaySx}
            >
              <Box
                component="img"
                src={CameraIcon}
                sx={{ width: 24, height: 24 }}
              />
            </Box>

            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              hidden
              onChange={handleBackgroundImageChange}
            />
          </Box>

          <Box
            sx={{
              position: "absolute",
              left: 0,
              bottom: 0,
              transform: "translate(15%, 30%)",
              width: avatarSize,
              height: avatarSize,
              flexShrink: 0,
              border: `2px solid ${colors.border}`,
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            {userData.avatar ? (
              <Box
                component="img"
                src={userData.avatar}
                alt="Profile preview"
                sx={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <SocialIcon width={avatarSize} height={avatarSize} />
            )}

            <Box
              component="label"
              htmlFor="profile-icon-upload"
              sx={cameraOverlaySx}
            >
              <Box
                component="img"
                src={CameraIcon}
                sx={{ width: 24, height: 24 }}
              />
            </Box>

            <input
              id="profile-icon-upload"
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileIconChange}
            />
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Paper
            elevation={0}
            sx={{
              ...fieldPaperSx,
              border: () => {
                if (errors.username) return "1px solid red";
                else if (inputFocused === "username")
                  return `1px solid ${colors.inputBorder}`;
                return `1px solid ${colors.border}`;
              },
            }}
          >
            <Box
              sx={{
                fontSize: 12,
              }}
            >
              Имя
            </Box>
            <InputBase
              value={userData.username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              sx={{
                width: "100%",
                fontSize: 15,
              }}
              onFocus={() => setInputFocused("username")}
              onBlur={() => setInputFocused(null)}
            />
          </Paper>
          {errors.username && <Box sx={errorTextSx}>{errors.username}</Box>}
        </Box>

        <Box>
          <Paper
            elevation={0}
            sx={{
              ...fieldPaperSx,
              border: () => {
                if (errors.bio) return "1px solid red";
                else if (inputFocused === "bio")
                  return `1px solid ${colors.inputBorder}`;
                return `1px solid ${colors.border}`;
              },
            }}
          >
            <Box
              sx={{
                fontSize: 12,
              }}
            >
              Биография
            </Box>
            <TextareaAutosize
              minRows={3}
              maxRows={3}
              style={{
                fontSize: "15px",
                width: "100%",
                outline: "none",
                resize: "none",
                color: colors.text,
                paddingTop: 4,
                lineHeight: 1.5,
              }}
              value={userData.bio}
              onFocus={() => setInputFocused("bio")}
              onBlur={() => setInputFocused(null)}
              onChange={(e) => handleBioChange(e.target.value)}
            />
          </Paper>
          {errors.bio && <Box sx={errorTextSx}>{errors.bio}</Box>}
        </Box>
      </ModalContent>
    </Modal>
  );
};

const cameraOverlaySx = {
  position: "absolute",
  right: "50%",
  bottom: "50%",
  transform: "translate(50%, 50%)",
  width: 42,
  height: 42,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alphaColors.cameraOverlayBg,
  borderRadius: "50%",
  cursor: "pointer",
  zIndex: 2,
  transition: "background-color 220ms ease",
  "&:hover": { backgroundColor: alphaColors.cameraOverlayHoverBg },
};

const fieldPaperSx = {
  display: "flex",
  flexDirection: "column",
  py: 0.5,
  px: 1.75,
  borderRadius: radius.md,
  border: `1px solid ${colors.inputBorder}`,
  backgroundColor: colors.inputBg,
  color: colors.textSoft,
  transition: transitions.background,
  "&:focus-within": {
    backgroundColor: colors.inputFocusBg,
  },
};

const errorTextSx = {
  fontSize: 12,
  color: "red",
  mt: 0.5,
  ml: 2,
};
