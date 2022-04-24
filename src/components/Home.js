import React from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='background'>
      <div className='square'>
        <div className='home-page' style={{ backgroundImage: `url(${logo})` }}>
          <h1 className='main-logo'>Friend Finding App</h1>
          <p>Log in to find friends</p>
          <Link to='/login/'>
            <button className='make-bigger'>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
