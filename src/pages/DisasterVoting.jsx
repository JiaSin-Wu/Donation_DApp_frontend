import React, { useState } from 'react';
import ConfirmModal from '../components/ConfirmModal';

const VoteDisaster = () => {
  const [voted, setVoted] = useState({});
  const [modalInfo, setModalInfo] = useState({ open: false, disasterId: null, disasterName: '', vote: null });

  const dummyDisasters = [
    {
      id: 1,
      title: "Turkey Earthquake",
      description: "Major earthquake in southern Turkey",
      deadline: Date.now() + 1000 * 60 * 60 * 24, // +1 day
    },
    {
      id: 2,
      title: "Flood in India",
      description: "Severe flooding in northern India",
      deadline: Date.now() + 1000 * 60 * 60 * 12, // +12 hours
    },
  ];

  const handleVoteClick = (disasterId, disasterName, vote) => {
    setModalInfo({ open: true, disasterId, disasterName, vote });
  };

  const confirmVote = () => {
    const { disasterId, vote } = modalInfo;
    setVoted(prev => ({ ...prev, [disasterId]: vote }));
    setModalInfo({ open: false, disasterId: null, disasterName: '', vote: null });
  };

  return (
    <div className="p-8">
      <h1 className="text-white text-2xl font-bold mb-6">Vote on Disasters</h1>

      {dummyDisasters.filter(d => d.deadline > Date.now()).map(disaster => (
        <div key={disaster.id} className="bg-[#1c1c24] text-white p-6 rounded-lg mb-4">
          <h2 className="text-xl font-semibold">{disaster.title}</h2>
          <p className="text-sm my-2">{disaster.description}</p>
          <div className="flex gap-4 mt-3">
            <button
              disabled={voted[disaster.id]}
              onClick={() => handleVoteClick(disaster.id, disaster.title, "accept")}
              className={`px-4 py-2 rounded ${voted[disaster.id] ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'}`}
            >
              👍 Agree
            </button>
            <button
              disabled={voted[disaster.id]}
              onClick={() => handleVoteClick(disaster.id, disaster.title, "reject")}
              className={`px-4 py-2 rounded ${voted[disaster.id] ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'}`}
            >
              👎 Disagree
            </button>
          </div>
        </div>
      ))}

      <ConfirmModal
        isOpen={modalInfo.open}
        onClose={() => setModalInfo({ open: false, disasterId: null, disasterName: '', vote: null })}
        onConfirm={confirmVote}
        title={`You sure you want to vote for disaster #${modalInfo.disasterId} ${modalInfo.disasterName} to be「${modalInfo.vote === "accept" ? "Agree" : "Disagree"}」?`}
      />
    </div>
  );
};

export default VoteDisaster;
