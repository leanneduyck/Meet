import { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const COLORS = '#487dac';

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
    // eslint-disable-next-line
  }, [allLocations, events]);

  const getData = () => {
    const data = allLocations.map((location) => {
      const count = events.filter(
        (event) => event.location === location
      ).length;
      // splits location string by ', ' or ' - '
      const city = location.split(/, | - /)[0];
      // calculates size based on count
      const size = Math.sqrt(count) * 100; // Adjust the multiplier to control the size scaling
      // returns city, count, and size of the dot
      return { city, count, size };
    });
    return data;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 40,
          bottom: 80,
          left: -30,
        }}
      >
        <CartesianGrid stroke="#487dac" />
        <XAxis
          type="category"
          dataKey="city"
          name="City"
          angle={60}
          interval={0}
          tick={{ dx: 20, dy: 40, fontSize: 18, fill: COLORS }}
        />
        <YAxis
          type="number"
          dataKey="count"
          name="Number of events"
          allowDecimals={false}
          tick={{ fontSize: 18, fill: COLORS }}
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter
          name="Events"
          data={data}
          fill={COLORS}
          shape="circle"
          dataKey="size"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
