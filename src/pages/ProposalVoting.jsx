import React, { useState, useEffect } from 'react';
import { DisplayProposal } from '../components';
import { useStateContext } from '../context';

const ProposalVoting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
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

  return (
    <DisplayProposal 
      title="All Proposals"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default ProposalVoting;

