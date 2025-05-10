import { createCampaign, dashboard, logout, payment, profile, withdraw, vote } from '../assets';

export const navlinks = [
  {
    name: 'Home',
    imgUrl: dashboard,
    link: '/',
    id: 0
  },
  {
    name: 'Add Disaster',
    imgUrl: createCampaign,
    link: '/add-disaster',
    id: 1
  },
  {
    name: 'Profile',
    imgUrl: profile,
    link: '/profile',
    id: 4
  },
  {
    name: 'Logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
    id: 5
  },
  {
    name: 'Proposal Voting',
    imgUrl: vote,
    link: '/proposal-voting',
    id: 8

  }
];
