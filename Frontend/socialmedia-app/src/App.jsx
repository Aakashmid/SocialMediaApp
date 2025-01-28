import ProtectedRoute from './routes/Protectedroute';
import {
  Routes,
  Route
} from 'react-router-dom';

import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Login, Profile, Registration, Home } from './Components/index'


import FollowersFollowings from './Components/profile/FollowersFollowings';
import EditProfile from './Components/profile/EditProfile';
import { ProfileDataContext } from './Contexts/ProfileContext';
import ProfilePostsPage from './Components/profile/ProfilePostsPage';
import NotFound from './Components/NotFound';
import EditPostPage from './Components/post/EditPostPage';
import SearchResultPage from './pages/SearchResultPage';
import ChatPage from './pages/ChatPage';
import Topbar from './Components/common/Topbar';
import { PostProvider } from './Contexts/PostContext';
import ServerErrorPage from './pages/ServerErrorPage';

function App() {
  const { setProfileData } = useContext(ProfileDataContext);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [serverStatus, setServerStatus] = useState({
    isChecking: true,
    isError: false,
  });

  const Logout = () => {
    useEffect(() => {
      localStorage.clear();
      setProfileData({});
    }, [setProfileData]);

    return <Navigate to="/auth/login" />;
  };

  const RegisterAndLogout = () => {
    localStorage.clear();
    return <Registration />;
  };

  const isAuthRoute = window.location.pathname.startsWith('/auth');
  // const isServerErrorRoute = window.location.pathname === '/server-error';
  return (
    <>
      {(!isAuthRoute && !serverStatus.isChecking && !serverStatus.isError && isAuthorized) && (
        <header>
          <Topbar />
        </header>
      )}
      <Routes>
        <Route element={<ProtectedRoute serverProps={[serverStatus, setServerStatus]} authorizationProps={[isAuthorized, setIsAuthorized]} />} >
          {/* Protected routes */}
          <Route path="/" element={<Home />} />
          <Route path="/search/:query?" element={<SearchResultPage />} />
          {/* here str is profile username */}
          <Route path="/profile/*" element={
            <PostProvider>
              <Routes>
                <Route path=":username/post/:str/edit" element={<EditPostPage />} />
                <Route path=":username" element={<Profile />} />
                <Route path=":username/edit" element={<EditProfile />} />
                <Route path=":username/posts/:id" element={<ProfilePostsPage />} />
                <Route path=":username/saved-posts/:id?" element={<ProfilePostsPage />} />
                <Route path=":username/:str" element={<FollowersFollowings />} />
              </Routes>
            </PostProvider>
          }

          />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:slug" element={<ChatPage />} />
        </Route>

        {/* Auth routes */}
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterAndLogout />} />
          <Route path="logout" element={<Logout />} />
        </Route>


        <Route path="/server-error" element={<ServerErrorPage />} />
        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes >
    </>
  )
}

export default App