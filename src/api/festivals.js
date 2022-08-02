import axios from 'axios';
import { baseUrl } from '../config';

export const getFestivals = async () => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/festivals/`
  };
  const { data } = await axios.request(options);
  return data;
};

export const getFestivalById = async (id) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/festival/${id}`
  };
  const { data } = await axios.request(options);
  return data;
};

export const postAttending = async (review) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/post/`,
    data: review,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`
    }
  };
  const { data } = await axios.request(options);
  return data;
};

export const getFestivalByName = async (searchName) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/festivalsearch/?name=${searchName}`
  };
  const { data } = await axios.request(options);
  return data;
};
