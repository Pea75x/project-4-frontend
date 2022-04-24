import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

function Navbar() {
  let location = useLocation();
  const navigate = useNavigate();
  const loggedIn = window.sessionStorage.setItem('token', data.token);

  const logout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };
  function openNav() {
    document.getElementById('mySidepanel').style.width = '250px';
  }

  function closeNav() {
    document.getElementById('mySidepanel').style.width = '0';
  }

  return (
    <>
      <div className='navbar'>
        <Link to='#'>
          <FaBars />
        </Link>
      </div>
    </>
  );
}

export default Navbar;
