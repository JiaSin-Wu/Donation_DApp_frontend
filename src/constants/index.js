import { createCampaign, dashboard, logout, payment, profile, withdraw, vote } from '../assets';
import abi from '../contract/abi.json'
import contractAddress from '../contract/address.json'

export const navlinks = [
  {
    name: 'Introduction',
    imgUrl: dashboard,
    link: '/introduction',
    id: 1
  },
  {
    name: 'Add Disaster',
    imgUrl: createCampaign,
    link: '/add-disaster',
    id: 2
  },
  {
    name: 'Disaster Voting',
    imgUrl: vote,
    link: '/disaster-voting',
    id: 3
  },
  {
    name: 'Donation',
    imgUrl: payment,
    link: '/donation',
    id: 4
  },
  {
    name: 'Donation Record',
    name: 'My Donation',
    imgUrl: payment,
    link: '/donation-lookup',
    id: 10
  },
  {
    name: 'Application',
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
];

export const DisasterResponseAddress = contractAddress.contractAddress;
export const DisasterResponseABI = abi;
