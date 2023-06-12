import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";


const Chart = (props) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
    <LineChart
 
    data={props.data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date"  fontSize={10}>
      {/* <Label value="pv of page" angle={-90}  position="insideLeft"></Label> */}
      </XAxis> 
    <YAxis >
    {/* <Label value="Pages of my website" offset={0} position="insideBottomRight" /> */}
    </YAxis>
    <Tooltip />
    <Legend />
    <Line
      type="monotone"
      dataKey="symbol"
      stroke="#8884d8"
      activeDot={{ r: 8 }}
    />
  </LineChart>
  </ResponsiveContainer>
  )
}

export default Chart;