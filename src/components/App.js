import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FestivalSearch from './FestivalSearch';
import FestivalPage from './FestivalPage';
import '../styles/style.scss';
import Register from './Register';
import Login from './Login.js';
import PublicProfile from './publicProfile';
import Messages from './Messages';
import AllMessages from './AllMessages';
//import Navbar from './NavBar';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/festivals' element={<FestivalSearch />} />
      <Route path='/festival/:id' element={<FestivalPage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/user/:id' element={<PublicProfile />} />
      <Route path='/messages/:id' element={<Messages />} />
      <Route path='/messages/' element={<AllMessages />} />
    </Routes>
  </BrowserRouter>
);

export default App;
