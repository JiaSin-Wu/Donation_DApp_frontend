import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DisasterCard from './DisasterCard';
import { loader } from '../assets';
import Dropdown from './Dropdown';

const DisplayProposal = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const [selectedDisaster, setSelectedCategory] = useState('');

  const filteredisaster = selectedDisaster
    ? campaigns.filter(c => c.category === selectedDisaster)
    : campaigns;

  const handleNavigate = (campaign) => {
    navigate(`/proposal-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <div className="mb-6">
        <Dropdown
          label="Disaster Category"
          options={['', 'California Wildfire', 'Earthquake', 'Nuclear power plant explosion']}
          selectedValue={selectedDisaster}
          onChange={setSelectedCategory}
        />
      </div>

      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({filteredisaster.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && filteredisaster.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading && filteredisaster.map((campaign, index) => (
          <DisasterCard
            key={`campaign-${index}`}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayProposal;

