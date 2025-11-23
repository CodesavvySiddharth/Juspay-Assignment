
// src/data/mockData.js
import nataliCraig from '../assets/images/profiles/natali-craig.png';
import drewCano from '../assets/images/profiles/drew-cano.png';
import orlandoDiggs from '../assets/images/profiles/orlando-diggs.png';
import andiLane from '../assets/images/profiles/andi-lane.png';
import kateMorrison from '../assets/images/profiles/kate-morrison.png';
import korayOkumus from '../assets/images/profiles/koray-okumus.png';

import profile1 from '../assets/images/profiles/profile1.png';
import profile2 from '../assets/images/profiles/profile2.png';
import profile3 from '../assets/images/profiles/profile3.png';
import profile4 from '../assets/images/profiles/profile4.png';
import profile5 from '../assets/images/profiles/profile5.png';

export const contacts = [
  { name: 'Natali Craig', avatar: nataliCraig },
  { name: 'Drew Cano', avatar: drewCano },
  { name: 'Orlando Diggs', avatar: orlandoDiggs },
  { name: 'Andi Lane', avatar: andiLane },
  { name: 'Kate Morrison', avatar: kateMorrison },
  { name: 'Koray Okumus', avatar: korayOkumus }
];

export const activities = [
  { user: 'You', action: 'have a bug that needs...', time: 'Just now', avatar: profile1 },
  { user: 'Released', action: 'a new version', time: '59 minutes ago', avatar: profile2 },
  { user: 'Submitted', action: 'a bug', time: '12 hours ago', avatar: profile3 },
  { user: 'Modified', action: 'a data in Page X', time: 'Today, 11:59 AM', avatar: profile4 },
  { user: 'Deleted', action: 'a page in Project X', time: 'Feb 2, 2023', avatar: profile5 }
];

export const topSellingProducts = [
  { name: 'ASOS Ridley High Waist', price: '$79.49', quantity: 82, amount: '$6,518.18' },
  { name: 'Marco Lightweight Shirt', price: '$128.50', quantity: 37, amount: '$4,754.50' },
  { name: 'Half Sleeve Shirt', price: '$39.99', quantity: 64, amount: '$2,559.36' },
  { name: 'Lightweight Jacket', price: '$20.00', quantity: 184, amount: '$3,680.00' },
  { name: 'Marco Shoes', price: '$79.49', quantity: 64, amount: '$1965.81' },
];

export const revenueByLocation = [
  { city: 'New York', amount: 72 }, 
  { city: 'San Francisco', amount: 39 },
  { city: 'Sydney', amount: 25 },
  { city: 'Singapore', amount: 61 },
];


export const totalSalesData = [
  { type: 'Direct', amount: '$300.56', color: 'bg-gray-800' },
  { type: 'Affiliate', amount: '$135.18', color: 'bg-blue-500' },
  { type: 'Sponsored', amount: '$154.02', color: 'bg-green-400' },
  { type: 'E-mail', amount: '$48.96', color: 'bg-purple-400' }
];


