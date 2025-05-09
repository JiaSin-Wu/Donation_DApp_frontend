import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const VotePieChart = ({ supportCount, rejectCount }) => {
    const data = [
        { name: 'Support', value: supportCount },
        { name: 'Reject', value: rejectCount },
    ];

    const COLORS = ['#1dc071', '#f04438']; // 綠色支援、紅色拒絕

    return (
        <div className="w-full h-[150px]"> {/* 控制外層高度 */}
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        innerRadius="60%"
                        outerRadius="100%"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VotePieChart;

