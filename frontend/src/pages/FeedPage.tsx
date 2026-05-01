import { useState } from "react";
import { Box } from "@mui/material";
import { mockPosts } from "@entities/post";
import { CreatePost } from "@features/posts";
import { PostsList } from "@widgets/posts";
import { FeedHeader, type FeedMode } from "@widgets/feed";

const feedTabs = [
  { label: "Обзор", value: "forYou" as const },
  { label: "Подписки", value: "following" as const },
];

export const FeedPage = () => {
  const [feedMode, setFeedMode] = useState<FeedMode>("forYou");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", pb: 1 }}>
      <FeedHeader
        tabs={feedTabs}
        activeMode={feedMode}
        onModeChange={setFeedMode}
      />
      <CreatePost />
      <PostsList posts={feedMode === "forYou" ? mockPosts : [mockPosts[0]]} />
    </Box>
  );
};
