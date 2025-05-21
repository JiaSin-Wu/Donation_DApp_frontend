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
  const [displayType, setDisplayType] = useState('Ongoing');
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
        {/* Status filter tabs */}
          <div className="flex justify-start mb-5">
            
            <div className="flex bg-[#1c1c24] rounded-[10px] overflow-hidden">
              <button 
                className={`px-4 py-2 font-epilogue font-semibold text-[14px] leading-[22px] ${displayType === 'All' ? 'bg-[#4acd8d] text-white' : 'bg-[#28282e] text-[#808191]'}`}

                onClick={() => setDisplayType('All')}
              >
                All Proposal
              </button>
              <button 
                className={`px-4 py-2 font-epilogue font-semibold text-[14px] leading-[22px] ${displayType === 'Votable' ? 'bg-[#4acd8d] text-white' : 'bg-[#28282e] text-[#808191]'}`}
                onClick={() => setDisplayType('Votable')}
              >
                Votable Proposal
              </button>
              <button 
                className={`px-4 py-2 font-epilogue font-semibold text-[14px] leading-[22px] ${displayType === 'Ongoing' ? 'bg-[#4acd8d] text-white' : 'bg-[#28282e] text-[#808191]'}`}

                onClick={() => setDisplayType('Ongoing')}
              >
                Ongoing Proposal
              </button>
              
              <button 
                className={`px-4 py-2 font-epilogue font-semibold text-[14px] leading-[22px] ${displayType === 'Voted' ? 'bg-[#4acd8d] text-white' : 'bg-[#28282e] text-[#808191]'}`}
                onClick={() => setDisplayType('Voted')}
              >
                Voted Proposal
              </button>
            </div>
            <div className="flex items-center ml-8">
                <h1 className="font-epilogue font-semibold text-[18px] text-white text-center">
                {proposals.length} proposals found
                  </h1>
            </div>
          </div>

      

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && proposals.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
          Please select a disater first!
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

