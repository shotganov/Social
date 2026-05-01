import { useMemo, useState } from "react";
import { Box, ButtonBase, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@public/icon-search.svg?react";
import { alphaColors, breakpoints, colors, radius } from "@shared/styles";
import { SearchInput } from "@shared/ui";
import { UserCard } from "@entities/user";

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
    username: "John Doe",
    tag: "john_doe",
    avatar: "",
    bio: "",
  },
  {
    id: 2,
    username: "Anna",
    tag: "anna.design",
    avatar: "",
    bio: "",
  },
  {
    id: 3,
    username: "Max",
    tag: "max.dev",
    avatar: "",
    bio: "",
  },
  {
    id: 4,
    username: "Kate",
    tag: "kate.photo",
    avatar: "",
    bio: "",
  },
  {
    id: 5,
    username: "Mark",
    tag: "mark.developer",
    avatar: "",
    bio: "",
  },
  {
    id: 6,
    username: "John Doe",
    tag: "john_doe",
    avatar: "",
    bio: "",
  },
  {
    id: 7,
    username: "Anna",
    tag: "anna.design",
    avatar: "",
    bio: "",
  },
  {
    id: 8,
    username: "Max",
    tag: "max.dev",
    avatar: "",
    bio: "",
  },
  {
    id: 9,
    username: "Kate",
    tag: "kate.photo",
    avatar: "",
    bio: "",
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
        [breakpoints.tablet]: {
          display: "none",
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          position: "sticky",
          top: 8,
          p: 1.5,
          borderRadius: radius.lg,
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.surface,
        }}
      >
        <Stack spacing={2}>
          {!isSearchPage && (
            <Box sx={{ position: "relative" }}>
              <SearchInput
                value={query}
                onChange={setQuery}
                onSearch={handleSearch}
                onFocus={() => setIsFocused(true)}
                placeholder="Поиск..."
              />

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
                    borderRadius: radius.md,
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.surface,
                    boxShadow: alphaColors.popoverShadow,
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
                      borderRadius: radius.md,
                      fontSize: 15,
                      color: colors.iconMuted,
                      "&:hover": {
                        backgroundColor: colors.hoverBg,
                      },
                    }}
                  >
                    <SearchIcon />
                    <Box sx={{ color: colors.text }}>{query}</Box>
                  </ButtonBase>

                  <Stack>
                    {filteredUsers.map((user) => (
                      <UserCard user={user} />
                    ))}
                  </Stack>
                </Paper>
              )}
            </Box>
          )}

          <Box sx={{ fontSize: "16px", fontWeight: 700, color: colors.text }}>
            Для вас
          </Box>

          <Stack spacing={1}>
            {suggestedUsers.map((user) => (
              <UserCard key={user.id} user={user} isBorder={true} />
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
