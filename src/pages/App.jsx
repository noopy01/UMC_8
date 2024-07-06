import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import UserProfile from './UserProfile';

function App() {
   
    return (
        <div className="App">

        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<UserProfile />} />
            </Routes>
        </Router>
        </div>
    );
}

export default App;
