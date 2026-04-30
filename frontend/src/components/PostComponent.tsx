import { Box, ButtonBase } from "@mui/material";
import CommentIcon from "../../public/icon-comment.svg?react";
import HeartIcon from "../../public/icon-like.svg?react";
import ReportIcon from "../../public/icon-report.svg?react";
import SocialIcon from "../../public/icon-social.svg";
import { type Post } from "../types/Post";
import type { User } from "../types/User";
import { useState } from "react";
import { ModalWindowPostComments } from "./ModalWindowPostComments";
import { ImagePreviewModal } from "./ImagePreviewModal";
import { PostPage } from "../pages/PostPage";
import { useNavigate } from "react-router-dom";
import { ReportPostModal } from "./ReportPostModal";

const user: User = {
  id: 1,
  tag: "john.doe",
  username: "John Doe",
  avatar: SocialIcon,
  bio: "Just launched my new project!",
};

const defaultPost: Post = {
  id: 1,
  user,
  content: "Люблю гулять и есть фрукты",
  likes: 5,
  comments: 11,
};

type PostComponentProps = {
  post?: Post;
  embedded?: boolean;
  commentsDisabled?: boolean;
};

export const PostComponent = ({
  post = defaultPost,
  embedded = false,
  commentsDisabled = false,
}: PostComponentProps) => {
  const navigate = useNavigate();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const images = post.images?.slice(0, 4) ?? [];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        p: 2,
        pb: 1,
        mt: embedded ? 0 : 2,
        borderRadius: embedded ? 0 : 4,
        backgroundColor: "#ffffff",
        border: embedded ? 0 : "1px solid #e2e8f0",
      }}
    >
      <Box
        component="img"
        src={post.user.avatar}
        alt=""
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          minWidth: 0,
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ fontSize: 17, fontWeight: 500, lineHeight: 1.2 }}>
            {post.user.username}
          </Box>
        </Box>

        <Box sx={{ fontSize: 15, lineHeight: 1.5, color: "#334765" }}>
          {post.content}
        </Box>

        {images.length > 0 && (
          <PostImages images={images} onImageClick={setPreviewIndex} />
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#334765",
            justifyContent: "space-between",
            mt: -0.5,
            ml: -0.8,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ButtonBase
              sx={{
                px: 1,
                pl: 0.5,
                py: 0.5,
                borderRadius: 3,
                fontSize: 14,
                fontWeight: 500,
                display: "flex",
                color: "#64748b",
                alignItems: "center",
                transition: "background-color 180ms ease",
                "&:hover": {
                  color: "#fb2c36",
                  backgroundColor: "rgba(251, 44, 54, 0.12)",
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
              {post.likes}
            </ButtonBase>

            <ButtonBase
              onClick={() => {
                if (!commentsDisabled) {
                  setIsCommentsOpen(true);
                  navigate(`/post/${post.id}`);
                }
              }}
              sx={{
                px: 1,
                pl: 0.5,
                py: 0.5,
                borderRadius: 3,
                fontSize: 14,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                color: "#64748b",
                transition: "background-color 180ms ease",
                "&:hover": {
                  color: "#2b7fff",
                  backgroundColor: "rgba(43, 127, 255, 0.12)",
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
              {post.comments}
            </ButtonBase>
          </Box>

          {!embedded && (
            <ButtonBase
              onClick={() => setIsReportOpen(true)}
              sx={{
                width: 24,
                height: 24,
                mr: -0.25,
                borderRadius: "50%",
                color: "#64748b",
                transition: "background-color 180ms ease, color 180ms ease",
                "&:hover": {
                  color: "#2563ff",
                  backgroundColor: "rgba(43, 127, 255, 0.12)",
                },
              }}
            >
              <Box
                component={ReportIcon}
                sx={{ width: 17.5, height: 17.5 , color: "inherit" }}
              />
            </ButtonBase>
          )}
        </Box>
      </Box>

      {previewIndex !== null && (
        <ImagePreviewModal
          images={images}
          index={previewIndex}
          setIndex={setPreviewIndex}
          onClose={() => setPreviewIndex(null)}
        />
      )}

      {isReportOpen && (
        <ReportPostModal onClose={() => setIsReportOpen(false)} />
      )}
    </Box>
  );
};

type PostImagesProps = {
  images: string[];
  onImageClick: (index: number) => void;
};

const PostImages = ({ images, onImageClick }: PostImagesProps) => {
  const imageCount = images.length;

  if (imageCount === 1) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={images[0]}
          alt=""
          onClick={() => onImageClick(0)}
          sx={{
            display: "block",
            height: "auto",
            maxHeight: 510,
            "@media (max-width: 800px)": {
              maxHeight: "none",
            },
            borderRadius: 3,
            objectFit: "contain",
            cursor: "pointer",
          }}
        />
      </Box>
    );
  }

  const imageGridSx = {
    2: {
      aspectRatio: "2 / 1",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr",
    },
    3: {
      aspectRatio: "1.6 / 1",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr",
    },
    4: {
      aspectRatio: "1 / 0.7",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr",
    },
  }[imageCount];

  return (
    <Box
      sx={{
        display: "grid",
        gap: 0.5,
        width: "100%",
        overflow: "hidden",
        borderRadius: 3,
        ...imageGridSx,
      }}
    >
      {images.map((image, index) => (
        <Box
          key={`${image}-${index}`}
          component="img"
          src={image}
          alt=""
          onClick={() => onImageClick(index)}
          sx={{
            width: "100%",
            height: "100%",
            minHeight: 0,
            objectFit: "cover",
            display: "block",
            gridRow: imageCount === 3 && index === 0 ? "span 2" : "auto",
            cursor: "pointer",
          }}
        />
      ))}
    </Box>
  );
};
