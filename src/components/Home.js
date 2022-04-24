import React from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

function Home() {
  const loggedIn = window.sessionStorage.getItem('token');
  console.log(loggedIn);
  return (
    <div className='background'>
      <div className='square'>
        <div className='home-page' style={{ backgroundImage: `url(${logo})` }}>
          <h1 className='main-logo'>Friend Finding App</h1>

          {loggedIn ? (
            <div>
              <p>Find your event</p>
              <Link to='/festivals/'>
                <button className='button-style'>Events</button>
              </Link>
            </div>
          ) : (
            <div>
              <p>Log in to find friends</p>
              <Link to='/login/'>
                <button className='button-style'>Login</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
