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
          {/* All protected routes go here */}
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/:id/posts/:id" element={<ProfilePostsPage />} />
          <Route path="/profile/:id/saved-posts/:id" element={<ProfilePostsPage />} />
          <Route path="/profile/:id/:str" element={<FollowersFollowings />} />
          <Route path="/profile/:username/edit" element={<EditProfile />} />
          <Route path="/post/:str/edit" element={<EditPostPage />} />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App