import axios from 'axios';
import { baseUrl } from '../config';

export const getFriendsMessages = async (friendId) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/messages/?destinationUserId=${friendId}`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`
    }
  };
  const { data } = await axios.request(options);
  return data;
};

export const sendMessage = async (text) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/message/`,
    data: text,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`
    }
  };
  const { data } = await axios.request(options);
  return data;
};

export const getMyMessages = async () => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/my-messages/`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`
    }
  };
  const { data } = await axios.request(options);
  return data;
};
