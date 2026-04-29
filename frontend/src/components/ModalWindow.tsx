import {
  Box,
  ButtonBase,
  Paper,
  InputBase,
  TextareaAutosize,
} from "@mui/material";
import ProfileCoverImage from "../../public/profile-background.jpg";
import SocialIcon from "../../public/icon-social.svg?react";
import CameraIcon from "../../public/icon-camera-new.svg";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/authSlice";
import type { User } from "../types/User";
import {
  validateProfile,
  type ProfileFormErrors,
} from "../features/profile/validator";
import { useImmer } from "use-immer";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";

type Props = {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
};

type InputFocuced = "username" | "bio";
const avatarSize = 114;

export const ModalWindow = ({ setIsEdit, user }: Props) => {
  useLockBodyScroll();

  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<User>(user);
  const [inputFocuсed, setinputFocuсed] = useState<InputFocuced | null>(null);
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
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.8)",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setIsEdit(false);
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          transform: "translateY(-100px)",
          width: 600,
          maxWidth: "calc(100vw - 32px)",
          backgroundColor: "#ffffff",
          borderRadius: 4,
          p: 2,
          py: 3,
          gap: 3,
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.18)",
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
          <ButtonBase onClick={() => setIsEdit(false)} sx={cancelBtnSx}>
            Отменить
          </ButtonBase>
          <Box
            sx={{
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Редактировать профиль
          </Box>
          <ButtonBase
            disabled={userData.username.trim().length === 0}
            onClick={() => {
              setIsEdit(false);
              dispatch(setUser(userData));
            }}
            sx={{
              ...saveBtnSx,
              "&.Mui-disabled": {
                opacity: 0.8,
                cursor: "not-allowed",
              },
            }}
          >
            Сохранить
          </ButtonBase>
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
              border: "2px solid #e2e8f0",
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
                else if (inputFocuсed === "username")
                  return "1px solid #dbe4f0";
                return "1px solid #e7edf5";
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
              onFocus={() => setinputFocuсed("username")}
              onBlur={() => setinputFocuсed(null)}
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
                else if (inputFocuсed === "bio") return "1px solid #dbe4f0";
                return "1px solid #e7edf5";
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
                color: "#1f1f20",
                paddingTop: 4,
                lineHeight: 1.5,
              }}
              value={userData.bio}
              onFocus={() => setinputFocuсed("bio")}
              onBlur={() => setinputFocuсed(null)}
              onChange={(e) => handleBioChange(e.target.value)}
            />
          </Paper>
          {errors.bio && <Box sx={errorTextSx}>{errors.bio}</Box>}
        </Box>
      </Box>
    </Box>
  );
};

const actionBtnSx = {
  fontSize: "14px",
  height: 35,
  px: 1.5,
  borderRadius: 3,
  transition: "0.2s ease",
};

const cancelBtnSx = {
  ...actionBtnSx,
  border: "1px solid #dbe4f0",
  backgroundColor: "#f8fafc",
  color: "#334765",
  "&:hover": { backgroundColor: "#eef2f7" },
};

const saveBtnSx = {
  ...actionBtnSx,
  border: "1px solid transparent",
  backgroundColor: "#8FA1BF",
  color: "#fff",
  "&:hover": { backgroundColor: "#7C92B0" },
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
  backgroundColor: "rgba(15, 23, 42, 0.5)",
  borderRadius: "50%",
  cursor: "pointer",
  zIndex: 2,
  transition: "background-color 220ms ease",
  "&:hover": { backgroundColor: "rgba(15, 23, 42, 0.45)" },
};

const fieldPaperSx = {
  display: "flex",
  flexDirection: "column",
  py: 0.5,
  px: 1.75,
  borderRadius: 3,
  border: "1px solid #dbe4f0",
  backgroundColor: "#f8fafc",
  color: "#334765",
  transition: "background-color 180ms ease",
  "&:focus-within": {
    backgroundColor: "#eef2f7",
  },
};

const errorTextSx = {
  fontSize: 12,
  color: "red",
  mt: 0.5,
  ml: 2,
};
