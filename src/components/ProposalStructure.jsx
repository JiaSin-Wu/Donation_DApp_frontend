import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Dropdown from './Dropdown';
import { toast } from 'react-toastify';
import { useStateContext } from '../context';

const ProposalStructure = ({ children }) => {
    const containerRef = useRef();
    const [position, setPosition] = useState({
        left: 0,
        top: 0,
        height: 0,
        width: 0,
    });
    const { address } = useStateContext();
    const [showActionButtons, setShowActionButtons] = useState(false);
    const handleAction = (action) => {
      if (!address) {
        alert("Please connect your wallet first.");
        return;
      }

      // 如果已登入，執行支援或拒絕的邏輯
      if (action === "support") {
        // doSupport()
      } else if (action === "reject") {
        // doReject()
      }
    };



    useEffect(() => {
        const updatePosition = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const absoluteTop = rect.top + window.scrollY;

                setPosition({
                    left: rect.left,
                    top: absoluteTop,           // ✅ 修正後的 top
                    height: rect.height,
                    width: rect.width,
                });

                const midpoint = rect.top + rect.height / 3 * 2;
                setShowActionButtons(midpoint < window.innerHeight);
            }
        };

        updatePosition();
        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
        };
    }, []);


    return (
        <div className="bg-[#121212] text-white min-h-screen">
            <div className="mb-6">
                <Dropdown
                    label="Disaster Category"
                    options={['', 'California Wildfire', 'Earthquake', 'Nuclear power plant explosion']}
                    selectedValue= ""
                    onChange={() => {}}                
                />
            </div>
            {/* 左箭頭 */}
            <button
                className="fixed transform -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full z-50"
                style={{
                    top: position.top + innerHeight / 3,
                    left: Math.max(position.left - 40, 8),
                }}
            >
                <ChevronLeft size={24} />
            </button>

            {/* 右箭頭 */}
            <button
                className="fixed transform -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full z-50"
                style={{
                    top: position.top + innerHeight / 3,
                    left: Math.min(position.left + position.width + 8, window.innerWidth - 48),
                }}
            >
                <ChevronRight size={24} />
            </button>

            {/* Support / Reject 按鈕：容器正下方中央 */}
            {showActionButtons && (
                <div
                    className="fixed flex gap-4 z-50"
                    style={{
                        top: window.innerHeight - 80, // ✅ container 下方 20px
                        left: position.left + position.width / 2,  // ✅ container 中心
                        transform: 'translateX(-50%)',
                    }}
                >
                    <button 
                        className="bg-[#1dc071] hover:bg-green-700 px-6 py-2 rounded-full font-semibold"
                        onClick={() => handleAction("support")}
                    >
                        Support
                    </button>
                    <button 
                        className="bg-[#f04438] hover:bg-red-700 px-6 py-2 rounded-full font-semibold"
                        onClick={() => handleAction("reject")}
                    >
                        Reject
                    </button>
                </div>
            )}

            {/* 中央內容容器 */}
            <div
                ref={containerRef}
                className="relative w-full max-w-5xl mx-auto bg-[#1e1e1e] p-10 rounded-lg"
            >
                {children}
            </div>
        </div>
    );
};

export default ProposalStructure;

