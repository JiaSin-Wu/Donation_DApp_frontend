import React, { useContext, createContext } from 'react';
import {contractAddress} from '../abis/contract-address.json';
import {abi} from '../abis/contractAbi.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAddress, useContract, useMetamask, useContractWrite, ChainId } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();


export const StateContextProvider = ({ children }) => {
    const getProposals = async() => {
        const disasters = await contract.call()
    }

}
export const useStateContext = () => useContext(StateContext);

