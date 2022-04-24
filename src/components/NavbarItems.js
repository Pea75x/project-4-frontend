import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';

export const NarbarItems = [
  {
    title: 'Home',
    path: '/',
    icon: <BiIcons.BiHomeHeart />,
    class: 'nav-text'
  },
  {
    title: 'Events',
    path: '/festivals/',
    icon: <BsIcons.BsCalendar3Event />,
    class: 'nav-text'
  },
  {
    title: 'Messages',
    path: '/messages/',
    icon: <AiIcons.AiOutlineMessage />,
    class: 'nav-text'
  }
];
