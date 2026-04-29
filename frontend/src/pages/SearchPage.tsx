import { useMemo, useState } from "react";
import { Box, ButtonBase, InputBase, Paper } from "@mui/material";
import SearchIcon from "../../public/icon-search.svg?react";
import SocialIcon from "../../public/icon-social.svg?react";
import { PostComponent } from "../components/PostComponent";
import { useSearchParams } from "react-router-dom";

type SearchMode = "users" | "posts";

type SearchUser = {
  id: number;
  username: string;
  tag: string;
};

type SearchPost = {
  id: number;
  author: string;
  content: string;
};

const users: SearchUser[] = [
  {
    id: 1,
    username: "Maria",
    tag: "marianovikova",
  },
  {
    id: 2,
    username: "Masha",
    tag: "masha.desktop",
  },
  {
    id: 3,
    username: "Mediana",
    tag: "mediana.dev",
  },
  {
    id: 4,
    username: "Misha",
    tag: "misha.lopasti",
  },
  {
    id: 5,
    username: "Noshpa",
    tag: "nospa.chemistry",
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

const Posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
          borderRadius: 4,
          border: "1px solid #e2e8f0",
          backgroundColor: "#ffffff",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.75,
            py: 1.25,
            borderRadius: 3,
            border: "1px solid #dbe4f0",
            backgroundColor: "#f8fafc",
            color: "#8FA1BF",
            transition: "background-color 180ms ease, border-color 180ms ease",

            "&:focus-within": {
              backgroundColor: "#eef2f7",
              borderColor: "#c6d2e1",
            },
          }}
        >
          <SearchIcon />
          <InputBase
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск пользователей и постов..."
            sx={{
              width: "100%",
              fontSize: 15,
              color: "#0f172a",
            }}
          />
        </Paper>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 2,
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
                borderRadius: 999,
                border:
                  mode === filter.value
                    ? "1px solid transparent"
                    : "1px solid #dbe4f0",
                backgroundColor: mode === filter.value ? "#edf4ff" : "#ffffff",
                color: mode === filter.value ? "#2563ff" : "#334765",
                fontSize: 14,
                lineHeight: 1.2,
                transition: "background-color 180ms ease, color 180ms ease",
                "&:hover": {
                  backgroundColor:
                    mode === filter.value ? "#e4efff" : "#f8fafc",
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
            borderRadius: 4,
            border: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              fontSize: 18,
              fontWeight: 600,
              color: "#0f172a",
              mb: 1,
            }}
          >
            Ничего не найдено
          </Box>
          <Box
            sx={{
              fontSize: 14,
              lineHeight: 1.5,
              color: "#64748b",
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
                    color: "#0f172a",
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
                      borderRadius: 4,
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
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
                            color: "#0f172a",
                            lineHeight: 1.2,
                          }}
                        >
                          {user.username}
                        </Box>

                        <Box
                          sx={{
                            fontSize: 15,
                            lineHeight: 1.5,
                            color: "#334765",
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
                    color: "#0f172a",
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
                {Posts.map((_, index) => (
                  <PostComponent key={index}></PostComponent>
                ))}
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
