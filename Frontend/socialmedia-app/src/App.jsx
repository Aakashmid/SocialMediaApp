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

function App() {


  return (
    <>
      <Router>
        <header>
          <ProtectedRoute>
            <Topbar />
          </ProtectedRoute>
        </header>

        <Routes>
          {/* <Route path="/" element={
            <ProtectedRoute> <Home /></ProtectedRoute>
          } /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Registration />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
