import ProtectedRoute from './Components/Protectedroute';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProfileContext } from './Components/Context';
import { TOKEN, USER_ID } from './Components/constants';
import api from './Api';
import { Login, Profile, Registration, Home } from './Components/index'
import ProfilePostsPage from './Components/profile/ProfilePostsPage';
import Topbar from './Components/Topbar';
import Followers from './Components/profile/Followers';
import { fetchUserProfile } from './Components/apiService';

function App() {
  const [profileData, setProfileData] = useState({})
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem(TOKEN);
  const user_id = localStorage.getItem(USER_ID);
  const fetchProfileData = async () => {
    if (token && user_id) {
      setLoading(true);  // show loading while fetching data from server
      try {
        const data = await fetchUserProfile(user_id);
        setProfileData(data);
      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false);
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
