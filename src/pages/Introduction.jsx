import React from 'react';
import { CustomButton } from '../components';
import { useNavigate } from 'react-router-dom';

const Introduction = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#13131a] min-h-screen flex flex-col items-center p-4 sm:p-10">
      <div className="max-w-[1080px] w-full bg-[#1c1c24] rounded-[20px] p-6 sm:p-10 shadow-xl">
        <h1 className="font-epilogue font-bold text-[30px] sm:text-[40px] text-white text-center mb-8 bg-gradient-to-r from-[#8c6dfd] to-[#1dc071] bg-clip-text text-transparent">
          Project Introduction
        </h1>

        <div className="space-y-8">
          {/* About Section */}
          <section className="border-b border-[#3a3a43] pb-6">
            <h2 className="font-epilogue font-bold text-[24px] text-white mb-4">About Donation DApp</h2>
            <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-7">
              Donation DApp is a decentralized application built on blockchain technology with the goal of bringing 
              transparency and trust to the world of charitable giving. Our platform allows donors to track exactly 
              how their contributions are utilized and ensures that funds reach those who need them most.
            </p>
          </section>

          {/* Mission Section */}
          <section className="border-b border-[#3a3a43] pb-6">
            <h2 className="font-epilogue font-bold text-[24px] text-white mb-4">Our Mission</h2>
            <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-7">
              We aim to revolutionize how donations work by eliminating middlemen and ensuring full transparency 
              through blockchain technology. Every transaction is recorded on the blockchain, making it immutable 
              and publicly verifiable.
            </p>
          </section>

          {/* How It Works Section */}
          <section className="border-b border-[#3a3a43] pb-6">
            <h2 className="font-epilogue font-bold text-[24px] text-white mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="bg-[#13131a] p-4 rounded-[10px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-7">
                  If you discover a new disaster that is not yet listed on our platform, you can submit a request 
                  to add it. Our internal reviewers will assess the evidence and determine whether the disaster 
                  qualifies for fundraising.
                </p>
              </div>
              <div className="bg-[#13131a] p-4 rounded-[10px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-7">
                  As a donor, you can choose to contribute to any verified disaster campaign and, in return, 
                  receive voting rights proportional to your donations. As a responder, you may submit proof of 
                  your relief efforts through a proposal. Whether your proposal is approved will be determined 
                  through a Web3-based DAO voting mechanism, in which donors participate. Once a proposal meets 
                  the required conditions, funds will be disbursed to the responder in cryptocurrency.
                </p>
              </div>
            </div>
          </section>

          {/* Join Community Section */}
          <section>
            <h2 className="font-epilogue font-bold text-[24px] text-white mb-4">Join Our Community</h2>
            <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-7 mb-6">
              By participating in Donation DApp, you become part of a global community committed to making 
              positive change through transparent giving. Your contributions can make a real difference, 
              and you'll always know exactly how your funds are being used.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <CustomButton 
                btnType="button"
                title="Explore Campaigns"
                styles="bg-[#1dc071] hover:bg-[#0aa55a] transition-all"
                handleClick={() => navigate('/')}
              />
              <CustomButton 
                btnType="button"
                title="Add New Disaster"
                styles="bg-[#8c6dfd] hover:bg-[#7357d6] transition-all"
                handleClick={() => navigate('/add-disaster')}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
