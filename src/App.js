
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Popular from './pages/Popular';
import NowPlaying from './pages/NowPlaying';
import TopRated from './pages/TopRated';
import Sign from './pages/Sign';
import Upcoming from './pages/Upcoming';
import MovieDetail from './components/MovieDetail';
import Header from './components/Header';
import Login from './pages/Login';

function App() {
    return (
        <div className="root-wrap">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign" element={<Sign />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/popular" element={<Popular />} />
                    <Route path="/now-playing" element={<NowPlaying />} />
                    <Route path="/top-rated" element={<TopRated />} />
                    <Route path="/upcoming" element={<Upcoming />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;


/*import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Popular from './pages/Popular';
import NowPlaying from './pages/NowPlaying';
import TopRated from './pages/TopRated';
import Sign from './pages/Sign';
import Upcoming from './pages/Upcoming';
import MovieDetail from './components/MovieDetail';
import Header from './components/Header';
import Login from './pages/Login';

function App() {
    return (
        <div className="root-wrap">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign" element={<Sign />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/popular" element={<Popular />} />
                    <Route path="/now playing" element={<NowPlaying />} />
                    <Route path="/top rated" element={<TopRated />} />
                    <Route path="/upcoming" element={<Upcoming />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;*/
