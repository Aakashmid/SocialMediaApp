import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Topbar from './Components/Topbar';

function App() {


  return (
    <>
      <Router>
        <header>
          <Topbar/>
        </header>

        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
