import ProtectedRoute from './Components/Protectedroute';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProfileContext } from './Components/context';
import { TOKEN } from './Components/constants';
import api from './Api';

function App() {
  const [profileData, setProfileData] = useState({})
  const token = localStorage.getItem(TOKEN);
  const fetchProfileData = async () => {
    if (token) {
      try {
        const res = await api.get('api/profile/');
        if (res.status === 200) {
          setProfileData(res.data);
        } else {
          console.error('Error fetching profile data:', res.status);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [token])

  const Logout = () => {
    localStorage.clear()
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
