import React, { useContext, createContext } from 'react';
import contractAddress from '../contract/address.json'
import abi from '../contract/abi.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAddress, useContract, useMetamask, useContractWrite, ChainId } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract, isLoading, error } = useContract(contractAddress,abi);
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      
      const data = await createCampaign({args:[
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime() , // deadline,
        form.image
      ]})
      
      toast.success('Campaign created successfully.');
      console.log("contract call success", data)
    } catch (error) {
      toast.error('Error while creating Campaign, please try again');
      console.log("contract call failure", error)
    }
  }

  const updateCampaign = async (form) => {
    try {
      const data = await contract.call('updateCampaign', [
        form.id, // campaign id
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime() , // deadline,
        form.image
      ])
      toast.success('Campaign updated successfully.');
      console.log("contract call success", data)
    } catch (error) {
      toast.error('Error while creating Campaign, please try again');
      console.log("contract call failure", error)
    }
  }


  const deleteCampaign = async (pId) => {
    try {
      const data = await contract.call('deleteCampaign', [pId])
      
      toast.success('Campaign deleted successfully.');
      console.log("contract call success", data)
      return data;
    } catch (error) {
      toast.error('Error while deleting Campaign, please try again');
      console.log("contract call failure", error)
    }
  }

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));

    return parsedCampaings;
  }
    //Dropdown 查詢使用
    const getDisasters = async (status) => {
      let rawdisasters;
      if (status === 'Active') {
        rawdisasters = await contract.call("getOngoingDisaster");
      } else if (status === 'Expired') {
        rawdisasters = await contract.call("getDueDisaster");
      } else if (status === 'Votable') {
        rawdisasters = await contract.call("getVotableDisaster", [address]);
      }

        console.log("[getDisaster] Fetched disasterIds:", rawdisasters); 
        const disasters = rawdisasters.map((d) => ({
            id: d[0].toString(),   // BigNumber to string
            name: d[1]
          }));
        return disasters;
    };

    //小卡用
    const getProposals = async(disasterId, status) =>{
        let proposalIds;
        if (status == "Ongoing"){
            proposalIds = await contract.call("getOngoingProposal", [disasterId]);
        }
        else if(status == "Votable"){
            proposalIds = await contract.call("getVotableDisaster", [disasterId] )
        }
        else if( status == "Voted"){
            proposalIds = await contract.call("getVotedProposal", [disasterId])
        }

        if (!proposalIds || proposalIds.length === 0) {
            return [];
        }

        const proposals = await Promise.all(
            proposalIds.map(async (id) => {
              const p = await contract.call("proposals", [id]);

              return {
                proposal_id: id.toString(),
                title: p[2],
                photoCid: p[3],
                description: p[4],
                amount: p[6].toString(),
                proposer_addr: p[7],
                dueDate : p[11].toNumber()
              };
            })
          );

          return proposals;
    }

    //proposal投票用
    const getDetailedProposal = async(proposalId) =>{
        const p = await contract.call("proposals", [proposalId]);
        return {
                propodal_id: proposalId.toString(),
                disasterId: p[1].toString(),
                title: p[2],
                photoCid: p[3],
                description: p[4],
                proofCid: p[5],
                amount: p[6].toString(),
                proposer_addr: p[7],
                approved: p[8],
                approveVotes: p[9].toString(),
                rejectVotes: p[10].toString(),
                dueDate : p[11].toNumber(),
              }; 
    }

    const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    try{
      const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});
      toast.success('Campaign funded successfully. Thansk for your collaboration');
      return data;
    } catch (err) {
      console.log("Error occured while making donation", err);
    }
  }

  const payOutToCampaignTeam = async (pId) => {
    try {
      const data = await contract.call('payOutToCampaignTeam', [pId]);
      toast.success('Campaign funds successfully withdrawed.');
      return data;
    } catch(err) {
      toast.error("Error occured while withdrawing funds.");
      console.log("Error occured while withdrawing funds", err);
    }
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        payOutToCampaignTeam,
        updateCampaign,
        deleteCampaign,
        getDisaster: getDisasters,
        getProposals,
        getDetailedProposal,
      }}
    >
      <ToastContainer />
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
