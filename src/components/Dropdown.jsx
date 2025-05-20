import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useStateContext } from '../context';




const Dropdown = ({ onSelect }) => { 
    const [status, setStatus] = useState('');
    const [disaster, setDisaster] = useState('');
    const [disasterOptions, setDisasterOptions] = useState([]);  

    // API
    const { address, getDisaster } = useStateContext();

    const isLoggedIn = !!address;

    const handleChange = async (e) => {
        const value = e.target.value;

        if (value === 'votable' && !isLoggedIn) {
            toast.warning('Please connect your wallet before selecting "Votable".');
            setStatus('');
            setDisaster('');
            setDisasterOptions([]);            
            return; 
        }
        setStatus(value);
        setDisaster('');

        if (value) {
            const disasters = await getDisaster(value);
            console.log("Fetched disasters:", disasters);
            setDisasterOptions(disasters); 
        } else {
            setDisasterOptions([]);
        }
    };

    
    const handleDisasterChange = (e) => {
        const id = e.target.value;
        setDisaster(id);

        // ✅ 主動通知父層
        if (onSelect) {
            onSelect({ disasterId: id });
        }
    };

    return (
        <div className="flex flex-col gap-2">
            

            <div className="flex gap-8 items-end">
                {/* 狀態下拉選單 */}
                <div className="flex flex-col gap-1" style={{ textAlignLast: 'center' }}>
                    <label className="text-sm text-gray-300">Status</label>
                    <select
                        value={status}
                        onChange={handleChange}
                        className="bg-[#2c2f32] text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">-- Select Status --</option>
                        <option value="Active">Active</option>
                        <option value="Expired">Expired</option>
                        <option value="Votable">Votable</option>
                    </select>
                </div>

                {/* 災害下拉選單 */}
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm text-gray-300" style={{ textAlignLast: 'center' }}>Disaster Category</label>
                    <select
                        value={disaster}
                        style={{ textAlignLast: 'center' }}
                        onChange={handleDisasterChange}
                        disabled={!status}
                        className={`bg-[#2c2f32] text-white p-2 rounded-md border ${status ? 'border-gray-600' : 'border-gray-800 opacity-50'
                            } focus:outline-none focus:ring-2 focus:ring-green-500`}
                    >
                        <option value="" disabled hidden>
                            -- Select a disaster --
                        </option>
                        {disasterOptions.map((option, index) => (
                            <option key={index} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>

                </div>
            </div>
        </div>
    );
};

export default Dropdown;

