import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Topbar from './Components/Topbar';
import Home from './pages/Home';

function App() {


  return (
    <>
      <Router>
        <header>
          <Topbar/>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
