import { useState, type ReactNode } from "react";
import { Box } from "@mui/material";
import { Avatar, ImagePreviewModal } from "@shared/ui";
import { colors } from "@shared/styles";
import type { Post } from "../model/types";
import { defaultPost } from "../model/mock";
import { PostHeader } from "./PostHeader";
import { PostImages } from "./PostImages";

type PostComponentProps = {
  post?: Post;
  embedded?: boolean;
  actions?: ReactNode;
};

export const PostComponent = ({
  post = defaultPost,
  embedded = false,
  actions,
}: PostComponentProps) => {
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
        backgroundColor: colors.surface,
        border: embedded ? 0 : `1px solid ${colors.border}`,
      }}
    >
      <Avatar src={post.user.avatar} size={48} />

      <Box sx={postBodySx}>
        <PostHeader username={post.user.username} tag={post.user.tag} />

        <Box
          sx={{
            fontSize: 15,
            lineHeight: 1.3,
            wordBreak: "break-word",
          }}
        >
          {post.content}
        </Box>

        {images.length > 0 && (
          <PostImages images={images} onImageClick={setPreviewIndex} />
        )}

        {actions}
      </Box>

      {previewIndex !== null && (
        <ImagePreviewModal
          images={images}
          index={previewIndex}
          setIndex={setPreviewIndex}
          onClose={() => setPreviewIndex(null)}
        />
      )}
    </Box>
  );
};

const postBodySx = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  minWidth: 0,
  flex: 1,
} as const;
