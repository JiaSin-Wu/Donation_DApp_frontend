import React from 'react';

const ProposalStructure = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default ProposalStructure;

