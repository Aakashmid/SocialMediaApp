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

function App() {
  const { setProfileData } = useContext(ProfileDataContext);
  const Logout = () => {
    useEffect(() => {
      localStorage.clear();
      setProfileData({});
    }, [setProfileData]);

    return <Navigate to="/login" />;
  };

  const RegisterAndLogout = () => {
    localStorage.clear();
    return <Registration />;
  };
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          {/* Protected routes */}
          <Route path="/" element={<Home />} />
          <Route path="/search/:query?" element={<SearchResultPage />} />
          <Route path="/profile">
            {/* here str is profile username */}
            <Route path=":username" element={<Profile />} />
            <Route path=":username/posts/:id" element={<ProfilePostsPage />} />
            <Route path=":username/saved-posts/:id?" element={<ProfilePostsPage />} />
            <Route path=":username/:str" element={<FollowersFollowings />} />
            <Route path=":username/edit" element={<EditProfile />} />
          </Route>
          <Route path="/post/:str/edit" element={<EditPostPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>

        {/* Auth routes */}
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterAndLogout />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>    </>
  )
}

export default App