import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Favorites from './pages/Favorites';

function App() {
  return ( 
    <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
            </Route>

            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App
