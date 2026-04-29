// import { useMemo, useState } from "react";
// import { Box, ButtonBase, InputBase, Paper, Stack } from "@mui/material";
// import SocialIcon from "../../public/icon-social.svg?react";
// import SearchIcon from "../../public/icon-search.svg?react";

// type SearchUser = {
//   id: number;
//   username: string;
//   tag: string;
// };

// type SearchPost = {
//   id: number;
//   author: string;
//   content: string;
// };

// const users: SearchUser[] = [
//   {
//     id: 1,
//     username: "John Doe",
//     tag: "john_doe",
//   },
//   {
//     id: 2,
//     username: "Anna",
//     tag: "anna.design",
//   },
//   {
//     id: 3,
//     username: "Max",
//     tag: "max.dev",
//   },
//   {
//     id: 4,
//     username: "Kate",
//     tag: "kate.photo",
//   },
//   {
//     id: 5,
//     username: "Mark",
//     tag: "mark.developer",
//   },
// ];

// type Props = {
//   isSearchPage: boolean;
// };

// export const SearchPanel = ({ isSearchPage }: Props) => {
//   const [query, setQuery] = useState("");

//   const normalizedQuery = query.trim().toLowerCase();

//   const filteredUsers = useMemo(() => {
//     if (!normalizedQuery) {
//       return users;
//     }

//     return users.filter(
//       (user) =>
//         user.username.toLowerCase().includes(normalizedQuery) ||
//         user.tag.toLowerCase().includes(normalizedQuery),
//     );
//   }, [normalizedQuery]);

//   return (
//     <Box
//       sx={{
//         width: 320,
//         flexShrink: 0,
//       }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           position: "sticky",
//           top: 8,
//           p: 2,
//           borderRadius: 4,
//           border: "1px solid #e2e8f0",
//           backgroundColor: "#ffffff",
//         }}
//       >
//         <Stack spacing={2}>
//           {!isSearchPage && (
//             <Paper
//               elevation={0}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//                 px: 1.5,
//                 py: 1,
//                 borderRadius: 3,
//                 border: "1px solid #dbe4f0",
//                 backgroundColor: "#f8fafc",
//                 color: "#8FA1BF",
//                 transition:
//                   "background-color 180ms ease, border-color 180ms ease",
//                 "&:focus-within": {
//                   backgroundColor: "#eef2f7",
//                   borderColor: "#c6d2e1",
//                 },
//               }}
//             >
//               <SearchIcon />
//               <InputBase
//                 value={query}
//                 onChange={(event) => setQuery(event.target.value)}
//                 placeholder="Поиск..."
//                 sx={{
//                   width: "100%",
//                   fontSize: 15,
//                   color: "#0f172a",
//                 }}
//               />
//             </Paper>
//           )}
//           <Box sx={{ fontSize: "16px", fontWeight: "700" }}>Для вас</Box>
//           <Stack spacing={1.25}>
//             {filteredUsers.map((user) => (
//               <ButtonBase
//                 key={user.id}
//                 sx={{
//                   p: 1.5,
//                   borderRadius: 3,
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   gap: 1.5,
//                   minWidth: 0,
//                   // backgroundColor: "#f8fafc",
//                   border: "1px solid #edf2f7",
//                   transition: "background-color 180ms ease",
//                   "&:hover": {
//                     backgroundColor: "#f6f8fc",
//                   },
//                 }}
//               >
//                 <Box sx={{ flexShrink: 0 }}>
//                   <SocialIcon width={40} height={40} />
//                 </Box>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "flex-start",
//                     minWidth: 0,
//                   }}
//                 >
//                   <Box sx={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
//                     {user.username}
//                   </Box>
//                   <Box
//                     sx={{
//                       mt: 0.5,
//                       fontSize: 13,
//                       lineHeight: 1.45,
//                       color: "#64748b",
//                     }}
//                   >
//                     @{user.tag}
//                   </Box>
//                 </Box>
//               </ButtonBase>
//             ))}

//             {filteredUsers.length === 0 && (
//               <Box sx={{ fontSize: 14, color: "#64748b" }}>
//                 Пользователи не найдены.
//               </Box>
//             )}
//           </Stack>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };

import { useMemo, useState } from "react";
import { Box, ButtonBase, InputBase, Paper, Stack } from "@mui/material";
import SocialIcon from "../../public/icon-social.svg?react";
import SearchIcon from "../../public/icon-search.svg?react";
import { useNavigate } from "react-router-dom";

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
    username: "John Doe",
    tag: "john_doe",
  },
  {
    id: 2,
    username: "Anna",
    tag: "anna.design",
  },
  {
    id: 3,
    username: "Max",
    tag: "max.dev",
  },
  {
    id: 4,
    username: "Kate",
    tag: "kate.photo",
  },
  {
    id: 5,
    username: "Mark",
    tag: "mark.developer",
  },
  {
    id: 6,
    username: "John Doe",
    tag: "john_doe",
  },
  {
    id: 7,
    username: "Anna",
    tag: "anna.design",
  },
  {
    id: 8,
    username: "Max",
    tag: "max.dev",
  },
  {
    id: 9,
    username: "Kate",
    tag: "kate.photo",
  },
];

type Props = {
  isSearchPage: boolean;
};

export const SearchPanel = ({ isSearchPage }: Props) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const filteredUsers = useMemo(() => {
    if (!normalizedQuery) return [];

    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(normalizedQuery) ||
        user.tag.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const suggestedUsers = useMemo(() => {
    return users.slice(0, 5);
  }, []);

  const handleSearch = () => {
    const nextQuery = query.trim();
    if (!nextQuery) return;

    setIsFocused(false);
    setQuery("");

    navigate({
      pathname: "/search",
      search: `?q=${encodeURIComponent(nextQuery)}`,
    });
  };

  return (
    <Box
      sx={{
        width: 320,
        flexShrink: 0,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          position: "sticky",
          top: 8,
          p: 1.5,
          borderRadius: 4,
          border: "1px solid #e2e8f0",
          backgroundColor: "#ffffff",
        }}
      >
        <Stack spacing={2}>
          {!isSearchPage && (
            <Box sx={{ position: "relative" }}>
              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  py: 1,
                  borderRadius: 3,
                  border: "1px solid #dbe4f0",
                  backgroundColor: "#f8fafc",
                  color: "#8FA1BF",
                  transition:
                    "background-color 180ms ease, border-color 180ms ease",
                  "&:focus-within": {
                    backgroundColor: "#eef2f7",
                    // borderColor: "#2563ff",
                    // color: "#2563ff",
                  },
                }}
              >
                <SearchIcon />

                <InputBase
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Поиск..."
                  sx={{
                    width: "100%",
                    fontSize: 15,
                    color: "#0f172a",
                  }}
                  onFocus={() => setIsFocused(true)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && query.trim()) {
                      handleSearch();
                    }
                  }}
                />
              </Paper>

              {isSearching && isFocused && (
                <Paper
                  elevation={0}
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: "calc(100% + 8px)",
                    zIndex: 20,
                    p: 0.75,
                    borderRadius: 3,
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.14)",
                    overflow: "hidden",
                  }}
                >
                  <ButtonBase
                    onClick={() => handleSearch()}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      width: "100%",
                      gap: 2,
                      py: 1.5,
                      pl: 2,
                      borderRadius: 3,
                      fontSize: 15,
                      color: "#8FA1BF",
                      "&:hover": {
                        backgroundColor: "#f6f8fc",
                      },
                    }}
                  >
                    <SearchIcon></SearchIcon>
                    <Box sx={{ color: "#0f172a" }}>{query}</Box>
                  </ButtonBase>

                  <Stack>
                    {filteredUsers.map((user) => (
                      <ButtonBase
                        key={user.id}
                        sx={{
                          width: "100%",
                          p: 1,
                          borderRadius: 2.5,
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: 1.25,
                          minWidth: 0,
                          transition: "background-color 180ms ease",
                          "&:hover": {
                            backgroundColor: "#f6f8fc",
                          },
                        }}
                      >
                        <Box sx={{ flexShrink: 0 }}>
                          <SocialIcon width={38} height={38} />
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            minWidth: 0,
                          }}
                        >
                          <Box
                            sx={{
                              maxWidth: 220,
                              fontSize: 14,
                              fontWeight: 700,
                              color: "#0f172a",
                              lineHeight: 1.2,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {user.username}
                          </Box>

                          <Box
                            sx={{
                              maxWidth: 220,
                              mt: 0.25,
                              fontSize: 13,
                              lineHeight: 1.35,
                              color: "#64748b",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            @{user.tag}
                          </Box>
                        </Box>
                      </ButtonBase>
                    ))}
                  </Stack>
                </Paper>
              )}
            </Box>
          )}

          <Box sx={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>
            Для вас
          </Box>

          <Stack spacing={1}>
            {suggestedUsers.map((user) => (
              <ButtonBase
                key={user.id}
                sx={{
                  width: "100%",
                  p: 1,
                  borderRadius: 3,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 1.5,
                  minWidth: 0,
                  border: "1px solid #edf2f7",
                  transition: "background-color 180ms ease",
                  "&:hover": {
                    backgroundColor: "#f6f8fc",
                  },
                }}
              >
                <Box sx={{ flexShrink: 0 }}>
                  <SocialIcon width={40} height={40} />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    minWidth: 0,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: 210,
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#0f172a",
                      lineHeight: 1.2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.username}
                  </Box>

                  <Box
                    sx={{
                      maxWidth: 210,
                      mt: 0.5,
                      fontSize: 13,
                      lineHeight: 1.45,
                      color: "#64748b",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    @{user.tag}
                  </Box>
                </Box>
              </ButtonBase>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
