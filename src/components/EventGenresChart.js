import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#487dac', '#ffd54f', '#6a7b95', '#8bc34a', '#82b8d6'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// EventGenresChart component
const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);
  // genres array
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
  // getData function, returns data array, each element contains name and value
  const getData = () => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter((event) =>
        event.summary.includes(genre)
      );
      return { name: genre, value: filteredEvents.length };
    });
    // filters data array, returns elements with value greater than 0
    return data.filter((genreData) => genreData.value > 0);
  };

  // useEffect hook, sets data state to getData() function
  useEffect(() => {
    setData(getData());
  }, [events]);

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={130}
          fill="#8884d8"
          fontSize={18}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
