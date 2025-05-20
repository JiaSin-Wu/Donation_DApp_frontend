import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import DisasterCard from './DisasterCard';
import { loader } from '../assets';
import Dropdown from './Dropdown';
import { useStateContext } from '../context';

const DisplayProposal = ({ title}) => {
  const navigate = useNavigate();
  const [selectedDisasterId, setSelectedDisasterId] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const {getProposals} = useStateContext();
  const handleNavigate = (proposal) => {
    navigate(`/proposal-details/${proposal. proposal_id}`);
  };


    useEffect(() => {
      if (selectedDisasterId) {
        setLoading(true);

        getProposals(selectedDisasterId, "Ongoing").then((result) => {
          setProposals(result);
          setLoading(false);
        });
      }
    }, [selectedDisasterId]);

  return (
    <div>
      <div className="mb-6">
         
        <Dropdown
          onSelect={({ disasterId }) => {
          setSelectedDisasterId(disasterId);
          
        }}        /> 
        
      </div>

      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({proposals.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && proposals.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading && proposals.map((proposal, index) => (
          <DisasterCard
            key={`campaign-${index}`}
            {...proposal}
            handleClick={() => handleNavigate(proposal)}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayProposal;

