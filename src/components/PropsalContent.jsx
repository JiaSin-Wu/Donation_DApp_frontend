import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader, VotePieChart } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';
import CountdownTimer from '../components/CountdownTimer';
import { toast } from 'react-toastify';
import { UpdateCampaign } from '../pages'

const ProposalContent = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { donate, payOutToCampaignTeam, deleteCampaign, udpateCampaign, getDonations, contract, address } = useStateContext();

    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [donators, setDonators] = useState([]);

    const remainingDays = daysLeft(state.deadline);

    const fetchDonators = async () => {
        const data = await getDonations(state.pId);

        setDonators(data);
    }


    useEffect(() => {
        if (contract) fetchDonators();
    }, [contract, address])

    const handleDonate = async () => {
        setIsLoading(true);

        await donate(state.pId, amount);

        navigate('/')
        setIsLoading(false);
    }

    const handleWithdraw = async () => {
        setIsLoading(true);

        await payOutToCampaignTeam(state.pId);

        navigate('/')
        setIsLoading(false);
    }

    const handleUpdate = async () => {
        setIsLoading(true);
        navigate(`/campaign-update/${state.pId}`)
        setIsLoading(false);
    }

    const handleDelete = async () => {
        setIsLoading(true);

        await deleteCampaign(state.pId);

        navigate('/')
        setIsLoading(false);
    }


    const compareAmounts = () => {
        const collected = parseFloat(ethers.utils.parseEther(state.amountCollected));
        const target = parseFloat(ethers.utils.parseEther(state.target));
        return (collected <= target)
    }

    return (
        <div>
            {isLoading && <Loader />}
            <h1 className="font-epilogue font-bold text-[28px] text-white mb-2">
                {state.title}
            </h1>
            <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">

                {/*圖片顯示處*/}
                <div className="flex-1 flex-col">
                    <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl" />
                    <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
                        <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%' }}>
                        </div>
                    </div>
                </div>
                {/*上右側顯示欄*/}
                <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
                    <CountdownTimer title="Left" targetDate={state.deadline} />
                    {/* <CountBox title="Days Left" value={remainingDays} /> */}
                    <CountBox title={`Required ETH`} value={state.amountCollected} />
                    <VotePieChart supportCount={20} rejectCount={20} totalEligible={100} />
                </div>
            </div>

            <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
                <div className="flex-[2] flex flex-col gap-[40px]">
                    <div>
                        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

                        <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                            <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                                <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
                            </div>
                            <div>
                                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>

                        <div className="mt-[20px]">
                            <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
                        </div>
                    </div>

                </div>


                {/*start*/}
                <div className="flex-1">
                    <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Finalize Proposal	</h4>
                    {/*Finalize*/}
                    <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                        
                        <div className="mt-[30px]">
                            {remainingDays >= 0 && compareAmounts() ? (
                                <input
                                    type="number"
                                    placeholder="ETH 0.1"
                                    step="0.01"
                                    className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />) : (<h1></h1>)}

                            <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Disclaimer</h4>
                                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">You can only receive the funds if one day has passed since the proposal was created, more than 1% of users have voted, and over 50% have agreed.
                                    Otherwise, the proposal will be automatically rejected and you will not receive any ETH.</p>
                            </div>
                            <CustomButton
                                btnType="button"
                                title="Finalize"
                                styles="w-full bg-[#8c6dfd]"
                                handleClick={() => {
                                    if (remainingDays >= 0 && compareAmounts()) handleDonate()
                                    if (state.owner == address) {
                                        if ((remainingDays == 0 || !compareAmounts())) handleWithdraw()
                                    }
                                }}
                            /> <br /><br />
                            {state.owner == address ?
                                (
                                    <CustomButton
                                        btnType="button"
                                        title={remainingDays >= 0 && compareAmounts() ?
                                            "Edit" : ""}
                                        styles="w-full bg-[#8c6dfd]"
                                        handleClick={() => {
                                            if (state.owner == address) handleUpdate()
                                        }}
                                    />
                                ) : ""
                            } <br /><br />
                            {state.owner == address ?
                                (
                                    <CustomButton
                                        btnType="button"
                                        title={remainingDays >= 0 && compareAmounts() ?
                                            "Delete" : ""}
                                        styles="w-full bg-[#8c6dfd]"
                                        handleClick={() => {
                                            if (state.owner == address) handleDelete(state.pId)
                                        }}
                                    />
                                ) : ""
                            }
                        </div>
                    </div>
                </div>
                {/*end*/}
            </div>
        </div>
    )
}

export default ProposalContent


