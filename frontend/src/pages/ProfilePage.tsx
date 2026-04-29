import { Box, ButtonBase } from "@mui/material";
import ProfileCoverImage from "../../public/profile-background.jpg";
import SocialIcon from "../../public/icon-social.svg";
import { PostComponent } from "../components/PostComponent";
import { useState } from "react";
import { ModalWindow } from "../components/ModalWindow";
import { selectUser } from "../store/selectors";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../public/icon-back.svg?react";

export const ProfilePage = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const Posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleNavigateBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        position: "relative",
        py: 1,
      }}
    >
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
            color: "#ffffff",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            transition: "background-color 180ms ease",
            "&:hover": {
              backgroundColor: "rgba(0, 0,  0, 0.75)",
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
            border: "1px solid #e2e8f0",
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
          border: "1px solid #e2e8f0",
          borderTop: "0px solid #e2e8f0",
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
            border: "1px solid #e2e8f0",
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
              border: "1px solid #e2e8f0",
              backgroundColor: "white",
              borderRadius: 4,
              color: "#334765",
              transition: "background-color 180ms ease",
              "&:hover": {
                backgroundColor: "#f8fafc",
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
          <Box sx={{ fontSize: 15, color: "#64748b" }}>
            @{user.tag ? user.tag : "first.user"}
          </Box>
        </Box>

        <Box sx={{ fontSize: 15 }}>{user.bio}</Box>

        <Box sx={{ display: "flex", gap: 1, fontSize: 14 }}>
          <Box>0 подписок</Box>
          <Box>0 подписчиков</Box>
        </Box>
      </Box>

      {isEdit && <ModalWindow setIsEdit={setIsEdit} user={user} />}

      <Box>
        <Box
          sx={{
            pl: 3,
            pt: 2,
            fontSize: "22px",
            fontWeight: "700",
          }}
        >
          Посты
        </Box>
        <Box sx={{ overflow: "auto" }}>
          {Posts.map((_, index) => (
            <PostComponent key={index}></PostComponent>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
