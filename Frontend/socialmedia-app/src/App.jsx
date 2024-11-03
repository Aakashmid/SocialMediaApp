import ProtectedRoute from './Components/Protectedroute';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProfileContext } from './Components/Context';
import { TOKEN,USER_ID } from './Components/constants';
import api from './Api';
import { Login, Profile, Registration, Home } from './Components/index'
import ProfilePostsPage from './Components/profile/ProfilePostsPage';
import Topbar from './Components/Topbar';
import Followers from './Components/profile/Followers';

function App() {
  const [profileData, setProfileData] = useState({})
  const token = localStorage.getItem(TOKEN);
  const user_id = localStorage.getItem(USER_ID);
  const fetchProfileData = async () => {
    if (token && user_id) {
      try {
        const res = await api.get(`api/users/${user_id}`);
        if (res.status === 200) {
          setProfileData(res.data);
          console.log(res.data);
        } else {
          console.error('Error fetching profile data:', res.status);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        Navigate('/logout')
      }
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [token])

  const Logout = () => {
    localStorage.clear()
    setProfileData({});
    return <Navigate to={'/login'} />
  }

  const RegisterAndLogout = () => {
    localStorage.clear()
    return <Registration />
  }

  return (
    <>
      <ProfileContext.Provider value={profileData}>
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
              <ProtectedRoute><Followers /></ProtectedRoute>
            } />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<RegisterAndLogout />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </Router>
      </ProfileContext.Provider>
    </>
  )
}

export default App
