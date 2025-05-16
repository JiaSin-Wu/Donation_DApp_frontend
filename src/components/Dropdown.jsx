import React from 'react';
import { toast } from 'react-toastify';
import { useStateContext } from '../context';




const Dropdown = ({ label, options, selectedValue, onChange }) => {
    const statusOptions = options?.status || [];
    const disasterOptions = options?.disaster || [];
    const { address } = useStateContext();
    const isLoggedIn = !!address;
    const handleChange = (e) => {
        const value = e.target.value;

        if (value === 'votable' && !isLoggedIn) {
            toast.warning('Please connect your wallet before selecting "Votable".');
            onChange({ ...selectedValue, status: '', disaster: '' });
            return; 
        }

        onChange({ ...selectedValue, status: value, disaster: '' });
    };

    return (
        <div className="flex flex-col gap-2">
            { /*label && <label className="text-white text-sm mb-1">{label}</label>*/}

            <div className="flex gap-8 items-end">
                {/* 狀態下拉選單 */}
                <div className="flex flex-col gap-1" style={{ textAlignLast: 'center' }}>
                    <label className="text-sm text-gray-300">Status</label>
                    <select
                        value={selectedValue.status}
                        onChange={handleChange}
                        className="bg-[#2c2f32] text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">-- Select Status --</option>
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                        <option value="votable">Votable</option>
                    </select>
                </div>

                {/* 災害下拉選單 */}
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm text-gray-300" style={{ textAlignLast: 'center' }}>Disaster Category</label>
                    <select
                        value={selectedValue.disaster}
                        style={{ textAlignLast: 'center' }}
                        // onChange={(e) =>
                        //     onChange({ ...selectedValue, disaster: e.target.value })
                        // }
                        disabled={!selectedValue.status}
                        className={`bg-[#2c2f32] text-white p-2 rounded-md border ${selectedValue.status ? 'border-gray-600' : 'border-gray-800 opacity-50'
                            } focus:outline-none focus:ring-2 focus:ring-green-500`}
                    >
                        <option value="" disabled hidden>
                            -- Select a disaster --
                        </option>
                        {disasterOptions.map((option, index) => (
                            <option key={index} value={option.value || option}>
                                {option.label || option}
                            </option>
                        ))}
                    </select>

                </div>
            </div>
        </div>
    );
};

export default Dropdown;

