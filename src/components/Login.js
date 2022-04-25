import React from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        await loginUser(user);

        navigate(`/festivals`);
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };
    getData();
  }

  return (
    <div className='background'>
      <div className='square'>
        <div className='top-heading'>
          <div className='logo' style={{ backgroundImage: `url(${logo})` }}>
            <h1 className='my-title'>Login</h1>
          </div>
        </div>
        <form className='my-form' onSubmit={handleSubmit}>
          <div className='field'>
            <label htmlFor='email' className='label'>
              Email
            </label>
            <div className='control'>
              <input
                placeholder='Email'
                name='email'
                type='text'
                className='input'
                id='email'
                value={user.email}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className='field'>
            <label htmlFor='password' className='label'>
              Password
            </label>
            <div className='control'>
              <input
                placeholder='Password'
                name='password'
                type='password'
                className='input'
                id='password'
                value={user.password}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <p className='error'>{errorMessage}</p>
          <button type='submit' className='button-style'>
            Login
          </button>
          <p>
            Dont have an account?
            <a className='link' href='/register'>
              Register now
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
