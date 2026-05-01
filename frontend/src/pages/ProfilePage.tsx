import { Box } from "@mui/material";
import { selectUser } from "@entities/user/model/selectors";
import { useAppSelector } from "@app/hooks";
import { mockPosts } from "@entities/post";
import { PostsList } from "@widgets/posts";
import { Profile } from "@widgets/profile";

export const ProfilePage = () => {
  const user = useAppSelector(selectUser);
  if (!user) return null;

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
      <Profile user={user} />

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
        <PostsList posts={mockPosts} />
      </Box>
    </Box>
  );
};
