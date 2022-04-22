import axios from 'axios';
const baseUrl = 'https://project4-priya.herokuapp.com';

export const registerUser = async (user) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/register/`,
    data: user
  };
  const { data } = await axios.request(options);

  return data;
};

export const loginUser = async (credentials) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/login/`,
    data: credentials
  };

  const { data } = await axios.request(options);
  if (data.token) {
    window.sessionStorage.setItem('token', data.token);
  } else {
    window.sessionStorage.removeItem('token');
  }
  console.log('login data', data);
  return data;
};

export const getUser = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/credentials/`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getPublicUser = async (id) => {
  try {
    const { data } = await axios.get(`${baseUrl}/user/${id}/`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
