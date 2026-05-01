import { Outlet, useLocation } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { SideBar } from "@widgets/sidebar";
import { SearchPanel } from "@features/search";
import { breakpoints, colors } from "@shared/styles";

export const MainLayout = () => {
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
        backgroundColor: colors.pageBg,
        [breakpoints.mobile]: {
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
          [breakpoints.mobile]: {
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
