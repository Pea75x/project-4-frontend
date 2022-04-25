import React from 'react';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';

function Register() {
  const navigate = useNavigate();
  const [imageUploaded, setImageUploaded] = React.useState('Upload an image');

  const [user, setUser] = React.useState({
    username: '',
    image: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const handleUpload = (event) => {
    event.preventDefault();

    window.cloudinary
      .createUploadWidget(
        {
          cloudName: process.env.CLOUD_NAME,
          uploadPreset: process.env.UPLOAD_PRESET,
          cropping: true
        },
        (err, result) => {
          if (result.event !== 'success') {
            return;
          }
          setUser({ ...user, image: result.info.secure_url });
          setImageUploaded('Successfully Uploaded!');
        }
      )
      .open();
  };
  console.log(user);
  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        await registerUser(user);
        navigate(`/login`);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getData();
  }

  return (
    <div className='background'>
      <div className='square'>
        <div className='top-heading'>
          <div className='logo' style={{ backgroundImage: `url(${logo})` }}>
            <h1 className='my-title'>Register</h1>
          </div>
        </div>
        <p>{errorMessage}</p>
        <form className='reg-form' onSubmit={handleSubmit}>
          <label className='label'>Username</label>
          <div className='control'>
            <input
              className='input'
              placeholder='Username'
              name='username'
              onChange={handleChange}
              value={user.username}
            />
          </div>
          <label className='label'>Email</label>
          <div className='control'>
            <input
              className='input'
              placeholder='Email'
              name='email'
              onChange={handleChange}
              value={user.email}
            />
          </div>
          <label className='label'>Profile Picture</label>
          <button className='upload button-style' onClick={handleUpload}>
            {imageUploaded}
          </button>

          <label className='label'>Password</label>
          <div className='control'>
            <input
              type='password'
              className='input'
              placeholder='Password'
              name='password'
              onChange={handleChange}
              value={user.password}
            />
          </div>

          <label className='label'>Password Confirmation</label>
          <div className='control'>
            <input
              type='password'
              className='input'
              placeholder='Password Confirmation'
              name='password_confirmation'
              onChange={handleChange}
              value={user.password_confirmation}
            />
          </div>

          <div className='field'>
            <button type='submit' className='button-style register'>
              Register Me!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
