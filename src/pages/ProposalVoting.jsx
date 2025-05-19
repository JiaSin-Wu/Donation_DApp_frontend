import React, { useState, useEffect } from 'react';
import { DisplayProposal } from '../components';
import { useStateContext } from '../context';
import { daysLeft } from '../utils';

const ProposalVoting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [displayType, setDisplayType] = useState('active'); // 'active', 'expired', or 'votable'
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  // Filter campaigns based on their status
  const activeCampaigns = campaigns.filter(campaign => parseInt(daysLeft(campaign.deadline)) > 0);
  const expiredCampaigns = campaigns.filter(campaign => parseInt(daysLeft(campaign.deadline)) <= 0);
  // For votable, we assume these are campaigns that the current user can vote on (active and not created by them)
  const votableCampaigns = activeCampaigns.filter(campaign => campaign.owner !== address);

  // Determine which campaigns to display based on the selected display type
  const getDisplayCampaigns = () => {
    switch (displayType) {
      case 'active':
        return activeCampaigns;
      case 'expired':
        return expiredCampaigns;
      case 'votable':
        return votableCampaigns;
      default:
        return campaigns;
    }
  };

  // Get title based on display type
  const getTitle = () => {
    switch (displayType) {
      case 'active':
        return "Active Proposals";
      case 'expired':
        return "Expired Proposals";
      case 'votable':
        return "Votable Proposals";
      default:
        return "All Proposals";
    }
  };

  return (
    <div>
      {/* Status filter tabs */}
      <div className="flex justify-start mb-5">
        <div className="flex bg-[#1c1c24] rounded-[10px] overflow-hidden">
          <button 
            className={`px-4 py-2 font-epilogue font-semibold text-[14px] leading-[22px] ${displayType === 'active' ? 'bg-[#4acd8d] text-white' : 'bg-[#28282e] text-[#808191]'}`}
            onClick={() => setDisplayType('active')}
          >
            Active
          </button>
          <button 
            className={`px-4 py-2 font-epilogue font-semibold text-[14px] leading-[22px] ${displayType === 'expired' ? 'bg-[#4acd8d] text-white' : 'bg-[#28282e] text-[#808191]'}`}
            onClick={() => setDisplayType('expired')}
          >
            Expired
          </button>
          <button 
            className={`px-4 py-2 font-epilogue font-semibold text-[14px] leading-[22px] ${displayType === 'votable' ? 'bg-[#4acd8d] text-white' : 'bg-[#28282e] text-[#808191]'}`}
            onClick={() => setDisplayType('votable')}
          >
            Votable
          </button>
        </div>
      </div>

      <DisplayProposal 
        title={getTitle()}
        isLoading={isLoading}
        campaigns={getDisplayCampaigns()}
      />
    </div>
  );
};

export default ProposalVoting;

