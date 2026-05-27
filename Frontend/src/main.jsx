import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './components/style.css';

import App from './App.jsx';
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx';
import UserManager from './components/UserManager.jsx';

createRoot(document.getElementById('root')).render(

    <BrowserRouter>

        <Routes>

            <Route
                path='/'
                element={<App />}
            />

            <Route
                path='/home'
                element={<Home />}
            />

            <Route
                path='/profile'
                element={<Profile />}
            />

            <Route
                path='/users'
                element={<UserManager />}
            />

        </Routes>

    </BrowserRouter>

);