import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io5';
import * as CgIcons from 'react-icons/cg';
import * as MdIcons from 'react-icons/md';
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
            <FaIcons.FaBars onClick={showsidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showsidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <IoIcons.IoCloseCircleOutline />
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
                    <MdIcons.MdLogout />
                    <span>Logout</span>
                  </a>
                </li>
              </div>
            ) : (
              <div>
                <li className='nav-text'>
                  <Link to='/login/'>
                    <CgIcons.CgLogIn />
                    <span>Login</span>
                  </Link>
                </li>
                <li className='nav-text'>
                  <Link to='/register/'>
                    <CgIcons.CgLogIn />
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
