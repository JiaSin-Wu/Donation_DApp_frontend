import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { CustomButton, FormField, Loader } from '../components';
import { money } from '../assets';

const STAKE_AMOUNT = 0.1; // ETH
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const SEVEN_DAYS_MS = 7 * ONE_DAY_MS;

const AddDisaster = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: ''
  });

  const deadlineTimestamp = Date.now() + ONE_DAY_MS;
  const voteDeadlineTimestamp = Date.now() + SEVEN_DAYS_MS;
  const voteDeadlineString = new Date(voteDeadlineTimestamp).toLocaleString();

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = window.confirm(
      `請確認以下資訊：\n` +
      `災難名稱：${form.name}\n` +
      `描述：${form.description}\n` +
      `質押金額：${STAKE_AMOUNT} ETH\n` +
      `投票截止時間：${voteDeadlineString}\n\n` +
      `是否送出？`
    );

    if (!confirm) return;

    setIsLoading(true);

    const payload = {
      name: form.name,
      description: form.description,
      deadline: deadlineTimestamp,
      stakeAmount: STAKE_AMOUNT
    };

    console.log('Submitting disaster:', payload);

    // 模擬 API 呼叫
    setTimeout(() => {
      alert('Disaster submitted successfully!');
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Add Disaster
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <FormField
          labelName="Disaster Name *"
          placeholder="e.g., Red Cross"
          inputType="text"
          value={form.name}
          handleChange={(e) => handleFormFieldChange('name', e)}
        />

        <FormField
          labelName="Description *"
          placeholder="Describe the disaster and needed relief"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] min-h-[120px] rounded-[10px] flex-col gap-2">
          <div className="flex items-center">
            <img src={money} alt="money" className="w-[40px] h-[40px] object-contain mr-3" />
            <h4 className="font-epilogue font-bold text-[18px] text-white">
              You will stake <span className="text-yellow-300">{STAKE_AMOUNT} ETH</span>
            </h4>
          </div>
          <p className="text-white text-sm mt-2">
            投票將於 <span className="text-green-400 font-semibold">{voteDeadlineString}</span> 截止
          </p>
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit Disaster"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default AddDisaster;
