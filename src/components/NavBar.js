import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { CgLogIn } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';
import { BiHomeHeart } from 'react-icons/bi';
import { NarbarItems } from './NavbarItems';
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = React.useState(false);
  const [menu, setMenu] = React.useState(true);

  function showsidebar() {
    setSidebar(!sidebar);
    setMenu(!menu);
  }
  // let location = useLocation();
  const navigate = useNavigate();
  const loggedIn = window.sessionStorage.getItem('token');

  const logout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  //gothreebars
  return (
    <>
      <IconContext.Provider value={{ color: 'white' }}>
        <div className={menu ? 'navbar' : 'navbar-disabled'}>
          <Link to='#'>
            <FaBars onClick={showsidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showsidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <IoCloseCircleOutline />
              </Link>
            </li>
            {loggedIn ? (
              <div>
                {NarbarItems.map((item, index) => {
                  return (
                    <li key={index} className={item.class}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
                <li className='nav-text' onClick={logout}>
                  <a href='#'>
                    <MdLogout />
                    <span>Logout</span>
                  </a>
                </li>
              </div>
            ) : (
              <div>
                <li className='nav-text'>
                  <Link to='/'>
                    <BiHomeHeart />
                    <span>Home</span>
                  </Link>
                </li>
                <li className='nav-text'>
                  <Link to='/login/'>
                    <CgLogIn />
                    <span>Login</span>
                  </Link>
                </li>
                <li className='nav-text'>
                  <Link to='/register/'>
                    <CgLogIn />
                    <span>Register</span>
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
