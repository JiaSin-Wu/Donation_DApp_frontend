import { createCampaign, dashboard, logout, payment, profile, withdraw, vote } from '../assets';
import abi from '../contract/abi.json'
import contractAddress from '../contract/address.json'

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
    name: 'Application',
    imgUrl: createCampaign,
    link: '/application',
    id: 2
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
  },
  {
    name: 'Donation',
    imgUrl: payment,
    link: '/donation',
    id: 9
  },
  {
    name: 'Donation Record',
    name: 'My Donation',
    imgUrl: payment,
    link: '/donation-lookup',
    id: 10
  }
];

export const DisasterResponseAddress = contractAddress.contractAddress;
export const DisasterResponseABI = abi;
