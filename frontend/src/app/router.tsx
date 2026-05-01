import { Route, Routes } from "react-router-dom";
import { PrivateRouter } from "@features/auth";
import { AuthPage } from "@pages/AuthPage";
import { ChatPage } from "@pages/ChatPage";
import { FeedPage } from "@pages/FeedPage";
import { NotificationsPage } from "@pages/NotificationsPage";
import { PostPage } from "@pages/PostPage";
import { ProfilePage } from "@pages/ProfilePage";
import { SearchPage } from "@pages/SearchPage";
import { MainLayout } from "./MainLayout";

export const AppRouter = () => (
  <Routes>
    <Route path="/auth" element={<AuthPage />} />
    <Route
      path="/"
      element={
        <PrivateRouter>
          <MainLayout />
        </PrivateRouter>
      }
    >
      <Route index element={<FeedPage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="notifications" element={<NotificationsPage />} />
      <Route path="chats" element={<ChatPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="post/:id" element={<PostPage />} />
    </Route>
  </Routes>
);
