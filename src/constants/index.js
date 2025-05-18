import { createCampaign, dashboard, logout, payment, profile, withdraw, vote } from '../assets';

export const navlinks = [
  {
    name: 'Introduction',
    imgUrl: dashboard,
    link: '/introduction',
    id: 11
  },
  {
    name: 'Donate Now',
    imgUrl: payment,
    link: '/donate-now',
    id: 12
  },
  {
    name: 'Request Funds',
    imgUrl: createCampaign,
    link: '/application',
    id: 2
  },
  {
    name: 'Proposal Voting',
    imgUrl: vote,
    link: '/proposal-voting',
    id: 8
  },
  {
    name: 'Add Disaster',
    imgUrl: createCampaign,
    link: '/add-disaster',
    id: 1
  },
  {
    name: 'Disaster Voting',
    imgUrl: vote,
    link: '/disaster-voting',
    id: 3
  },
  {
    name: 'My Donation',
    imgUrl: payment,
    link: '/donation-lookup',
    id: 10

  }
];
