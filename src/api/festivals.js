import axios from 'axios';
const baseUrl = 'https://project4-priya.herokuapp.com';

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

export const postAttending = async () => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/post/`
  };
  const { data } = await axios.request(options);
  return data;
};
