import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { useGroupedProcesses } from "@hooks/processes/useGetGroupedProcesses.ts";
import Loader from "@components/shared/loader/Loader.tsx";

const ProcessChart = () => {
  const { data } = useGroupedProcesses(30);
  if (!data || data.length === 0) return <Loader />;

  return (
    <BarChart className="w-full h-full p-2" responsive data={data}>
      <Bar dataKey="amount" radius={[2, 2, 0, 0]} fill="#74767f"></Bar>
      <Tooltip />
      <XAxis
        width="auto"
        dataKey="date"
        tickMargin={10}
        tickLine={false}
        tick={{ fill: "#74767f", fontSize: 10, fontWeight: 700 }}
        axisLine={{ stroke: "#000", strokeWidth: 1 }}
      />
      <YAxis
        width="auto"
        tickMargin={10}
        scale="linear"
        tickLine={false}
        tick={{ fill: "#74767f", fontSize: 10, fontWeight: 700 }}
        axisLine={{ stroke: "#000", strokeWidth: 1 }}
      />
    </BarChart>
  );
};

export default ProcessChart;
