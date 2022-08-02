import React from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { BiHomeHeart } from 'react-icons/bi';
import { BsCalendar3Event } from 'react-icons/bs';

export const NarbarItems = [
  {
    title: 'Home',
    path: '/',
    icon: <BiHomeHeart />,
    class: 'nav-text'
  },
  {
    title: 'Events',
    path: '/festivals/',
    icon: <BsCalendar3Event />,
    class: 'nav-text'
  },
  {
    title: 'Messages',
    path: '/messages/',
    icon: <AiOutlineMessage />,
    class: 'nav-text'
  }
];
