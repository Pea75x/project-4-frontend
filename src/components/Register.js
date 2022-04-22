import React from 'react';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

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
    <section className='section register-section'>
      <div className='container'>
        <div className='columns'>
          <form
            className='column is-half is-offset-one-quarter box'
            onSubmit={handleSubmit}
          >
            <div className='field'>
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
            </div>
            <div className='field'>
              <label className='label'>Email</label>
              <div className='control has-icons-left'>
                <input
                  className='input'
                  placeholder='Email'
                  name='email'
                  onChange={handleChange}
                  value={user.email}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-envelope'></i>
                </span>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Profile Picture</label>
              <button className='button' onClick={handleUpload}>
                {imageUploaded}
              </button>
            </div>
            <div className='field'>
              <label className='label'>Password</label>
              <div className='control has-icons-left'>
                <input
                  type='password'
                  className='input'
                  placeholder='Password'
                  name='password'
                  onChange={handleChange}
                  value={user.password}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-lock'></i>
                </span>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Password Confirmation</label>
              <div className='control has-icons-left'>
                <input
                  type='password'
                  className='input'
                  placeholder='Password Confirmation'
                  name='password_confirmation'
                  onChange={handleChange}
                  value={user.password_confirmation}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-lock'></i>
                </span>
              </div>
            </div>
            <div className='field'>
              <button type='submit' className='button is-fullwidth is-info'>
                Register Me!
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
