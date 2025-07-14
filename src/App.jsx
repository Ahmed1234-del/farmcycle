import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup'
import Home from './components/Home'
import Marketplace from './components/Marketplace';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <Router>
      <div>

        
        <nav className="bg-sky-300 p-4">
        <div className='flex justify-start'><Link to="/"> <FontAwesomeIcon icon={faHouse} className='mr-1' />Home</Link></div>
        <div className='flex justify-end'>
        <Link to="/About" className="mx-2">About</Link>
          <Link to="/Login" className="mx-2">Login</Link>
          <Link to="/Signup" className="mx-2">Register</Link></div>
        
         
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
