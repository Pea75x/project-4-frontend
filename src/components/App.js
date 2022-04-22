import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FestivalSearch from './FestivalSearch';
import FestivalPage from './FestivalPage';
import '../styles/style.scss';
// import Register from './Register';
// import Login from './Login.js';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/festivals' element={<FestivalSearch />} />
      <Route path='/festival/:id' element={<FestivalPage />} />
      {/* <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
