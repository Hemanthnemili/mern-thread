import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import userAtom from "./atoms/userAtom";
import { useRecoilValue } from "recoil";
import Logoutbtn from "./components/Logoutbtn";
import UpProfile from "./pages/UpProfile";
import CreatePost from "./components/CreatePost";

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/update"
          element={user ? <UpProfile /> : <Navigate to="/auth" />}
        />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>

      {user && <Logoutbtn />}
      {user && <CreatePost />}
    </Container>
  );
}

export default App;
