import ProtectedRoute from './Components/Protectedroute';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Login, Profile, Registration, Home } from './Components/index'
import ProfilePostsPage from './Components/profile/ProfilePostsPage';
import { ProfileDataContext } from './Components/Contexts/ProfileContext';
import FollowersFollowings from './Components/profile/FollowersFollowings';
import EditProfile from './Components/profile/EditProfile';

function App() {
  const { profileData, setProfileData } = useContext(ProfileDataContext);
  const Logout = () => {
    useEffect(() => {
      localStorage.clear();
      setProfileData({});
    }, [setProfileData]);

    // return <Navigate to="/login" replace />;
    return <Navigate to="/login" />;
  };

  const RegisterAndLogout = () => {
    localStorage.clear();
    return <Registration />;
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/profile/:id' element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path='/profile/:id/posts/:id' element={
            <ProtectedRoute><ProfilePostsPage /></ProtectedRoute>
          } />
          <Route path='/profile/:id/:str' element={
            <ProtectedRoute><FollowersFollowings /></ProtectedRoute>
          } />
          <Route path='/profile/:username/edit' element={
            <ProtectedRoute><EditProfile /></ProtectedRoute>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<RegisterAndLogout />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
