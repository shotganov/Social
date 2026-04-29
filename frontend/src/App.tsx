import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthPage } from "./pages/AuthPage";
import { PrivateRouter } from "./components/PrivateRouter";
import { MainPage } from "./pages/MainPage";
import { FeedPage } from "./pages/FeedPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ChatsPage } from "./pages/ChatsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SearchPage } from "./pages/SearchPage";
import { PostPage } from "./pages/PostPage";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />}></Route>
      <Route
        path="/"
        element={
          <PrivateRouter>
            <MainPage />
          </PrivateRouter>
        }
      >
        <Route index element={<FeedPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="chats" element={<ChatsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="post/:id" element={<PostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
