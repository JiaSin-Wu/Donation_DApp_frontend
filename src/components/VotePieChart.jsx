import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const VotePieChart = ({ supportCount, rejectCount }) => {
  const data = [
    { name: 'Support', value: supportCount },
    { name: 'Reject', value: rejectCount },
  ];
  const COLORS = ['#1dc071', '#f04438'];
  const total = supportCount + rejectCount;

  return (
    <div className="w-full h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius="60%"
            outerRadius="100%"
            dataKey="value"
            labelLine={false}
            label={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => {
              const percent = ((value / total) * 100).toFixed(1);
              return [`${value} votes (${percent}%)`, name];
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};


export default VotePieChart;

