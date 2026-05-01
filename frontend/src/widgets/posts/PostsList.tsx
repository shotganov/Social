import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PostComponent, type Post } from "@entities/post";
import { PostActions } from "@features/posts";

type PostsListProps = {
  posts: Post[];
  embedded?: boolean;
  showReport?: boolean;
  commentsDisabled?: boolean;
};

export const PostsList = ({
  posts,
  embedded = false,
  showReport = true,
  commentsDisabled = false,
}: PostsListProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      {posts.map((post) => (
        <PostComponent
          key={post.id}
          post={post}
          embedded={embedded}
          actions={
            <PostActions
              likes={post.likes}
              comments={post.comments}
              showReport={showReport && !embedded}
              onCommentsClick={() => {
                if (!commentsDisabled) navigate(`/post/${post.id}`);
              }}
            />
          }
        />
      ))}
    </Box>
  );
};
