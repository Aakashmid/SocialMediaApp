import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Topbar from './Components/Topbar';
import Home from './pages/Home';
import ProtectedRoute from './Components/Protectedroute';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {

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
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Topbar />
              <Home />
            </ProtectedRoute>
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
