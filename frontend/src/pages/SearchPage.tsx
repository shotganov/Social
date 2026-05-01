import { useMemo, useState } from "react";
import { Box, ButtonBase, Paper } from "@mui/material";
import SocialIcon from "@public/icon-social.svg?react";
import { useSearchParams } from "react-router-dom";
import { colors, radius, transitions } from "@shared/styles";
import { SearchInput } from "@shared/ui";
import { mockPosts } from "@entities/post";
import { PostsList } from "@widgets/posts";

type SearchMode = "users" | "posts";

type SearchUser = {
  id: number;
  username: string;
  tag: string;
  avatar: string;
  bio: string;
};

const users: SearchUser[] = [
  {
    id: 1,
    username: "Maria",
    tag: "marianovikova",
    avatar: "",
    bio: "",
  },
  {
    id: 2,
    username: "Masha",
    tag: "masha.desktop",
    avatar: "",
    bio: "",
  },
  {
    id: 3,
    username: "Mediana",
    tag: "mediana.dev",
    avatar: "",
    bio: "",
  },
  {
    id: 4,
    username: "Misha",
    tag: "misha.lopasti",
    avatar: "",
    bio: "",
  },
  {
    id: 5,
    username: "Noshpa",
    tag: "nospa.chemistry",
    avatar: "",
    bio: "",
  },
];

// const posts: SearchPost[] = [
//   {
//     id: 1,
//     author: "john_doe",
//     content: "Just launched my new project and published the first demo build.",
//   },
//   {
//     id: 2,
//     author: "anna.design",
//     content:
//       "Collected references for a new feed redesign and cleaner search flow.",
//   },
//   {
//     id: 3,
//     author: "max.dev",
//     content:
//       "Testing a posts search panel with local filtering before API integration.",
//   },
//   {
//     id: 4,
//     author: "kate.photo",
//     content: "Uploaded a new photo series from the city night walk.",
//   },
// ];

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [mode, setMode] = useState<SearchMode>("posts");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredUsers = useMemo(() => {
    if (!normalizedQuery) return users;

    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(normalizedQuery) ||
        user.tag.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  // const filteredPosts = useMemo(() => {
  //   if (!normalizedQuery) return posts;

  //   return posts.filter(
  //     (post) =>
  //       post.author.toLowerCase().includes(normalizedQuery) ||
  //       post.content.toLowerCase().includes(normalizedQuery),
  //   );
  // }, [normalizedQuery]);

  const handleSearch = () => {
    const nextQuery = query.trim();
    if (!nextQuery) return;
  };

  const filters: { label: string; value: SearchMode }[] = [
    { label: "Посты", value: "posts" },
    { label: "Люди", value: "users" },
  ];

  const showUsers = mode === "users";
  const showPosts = mode === "posts";
  const isEmpty = showUsers && filteredUsers.length === 0; //&&
  // showPosts &&
  // filteredPosts.length === 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        py: 1,
        gap: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: radius.lg,
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.surface,
        }}
      >
        <SearchInput
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          placeholder={
            mode === "users" ? "Поиск пользователей..." : "Поиск постов..."
          }
          px={1.75}
          py={1.25}
        />
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 1.5,
            flexWrap: "wrap",
          }}
        >
          {filters.map((filter) => (
            <ButtonBase
              key={filter.value}
              onClick={() => setMode(filter.value)}
              sx={{
                px: 1.5,
                py: 0.9,
                borderRadius: radius.pill,
                border:
                  mode === filter.value
                    ? "1px solid transparent"
                    : `1px solid ${colors.inputBorder}`,
                backgroundColor:
                  mode === filter.value ? colors.activeBg : colors.surface,
                color: mode === filter.value ? colors.accent : colors.textSoft,
                fontSize: 14,
                lineHeight: 1.2,
                transition: transitions.backgroundAndColor,
                "&:hover": {
                  backgroundColor:
                    mode === filter.value
                      ? colors.activeHoverBg
                      : colors.inputBg,
                },
              }}
            >
              {filter.label}
            </ButtonBase>
          ))}
        </Box>
      </Paper>

      {isEmpty ? (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: radius.lg,
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.surface,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              fontSize: 18,
              fontWeight: 600,
              color: colors.text,
              mb: 1,
            }}
          >
            Ничего не найдено
          </Box>
          <Box
            sx={{
              fontSize: 14,
              lineHeight: 1.5,
              color: colors.textMuted,
            }}
          >
            Попробуй изменить запрос или выбрать другой фильтр
          </Box>
        </Paper>
      ) : (
        <>
          {showUsers && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 0.5,
                }}
              >
                <Box
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: colors.text,
                  }}
                >
                  Пользователи
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  mt: 2,
                }}
              >
                {filteredUsers.map((user) => (
                  <Paper
                    key={user.id}
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: radius.lg,
                      border: `1px solid ${colors.border}`,
                      backgroundColor: colors.surface,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                      }}
                    >
                      <Box sx={{ flexShrink: 0 }}>
                        <SocialIcon width={48} height={48} />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.75,
                          minWidth: 0,
                          flex: 1,
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: 17,
                            fontWeight: 500,
                            color: colors.text,
                            lineHeight: 1.2,
                          }}
                        >
                          {user.username}
                        </Box>

                        <Box
                          sx={{
                            fontSize: 15,
                            lineHeight: 1.5,
                            color: colors.textSoft,
                          }}
                        >
                          @{user.tag}
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}

          {showPosts && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 0.5,
                  mt: showUsers ? 1 : 0,
                }}
              >
                <Box
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: colors.text,
                  }}
                >
                  Посты
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                }}
              >
                <PostsList posts={mockPosts} />
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
