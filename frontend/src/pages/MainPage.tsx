import { Outlet, useLocation } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import { Box, Container } from "@mui/material";
import { SearchPanel } from "../components/SearchPanel";

export const MainPage = () => {
  const { pathname } = useLocation();
  const isChatsPage = pathname === "/chats";
  const isSearchPage = pathname === "/search";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: isChatsPage ? 0 : 3,
        px: 3,
        pb: 0,
        minHeight: "100vh",
        "@media (max-width: 800px)": {
          px: 0,
          pb: 9,
          "body.chat-dialog-open &": {
            pb: 0,
          },
        },
      }}
    >
      <SideBar isChatsPage={isChatsPage} />

      <Container
        maxWidth={false}
        disableGutters
        sx={{
          m: 0,
          maxWidth: isChatsPage ? "968px" : "600px",
          "@media (max-width: 800px)": {
            maxWidth: "100%",
          },
        }}
      >
        <Outlet />
      </Container>

      {!isChatsPage && <SearchPanel isSearchPage={isSearchPage} />}
    </Box>
  );
};
