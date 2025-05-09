import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProposalStructure = ({ children }) => {
    const containerRef = useRef();
    const [position, setPosition] = useState({ left: 0, top: 0, height: 0, width: 0 });

    useEffect(() => {
        const updatePosition = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setPosition({
                    left: rect.left,
                    top: rect.top,
                    height: rect.height,
                    width: rect.width,
                });
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
            {/* 固定左按鈕 */}
            <button
                className="fixed transform -translate-y-1/2 p-3 bg-white/20 rounded-full z-50"
                style={{
                    top: position.top + position.height / 2,
                    left: position.left - 40,
                }}
            >
                <ChevronLeft size={24} />
            </button>

            {/* 固定右按鈕 */}
            <button
                className="fixed transform -translate-y-1/2 p-3 bg-white/20 rounded-full z-50"
                style={{
                    top: position.top + position.height / 2,
                    left: position.left + position.width + 8,
                }}
            >
                <ChevronRight size={24} />
            </button>

            {/* Support Reject 按鈕*/}
            <button
                className='fixed transform -translate-x-1/2 z-50'
            > Support </button>
            <button> Reject </button>

            {/* 中心內容 */}
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

