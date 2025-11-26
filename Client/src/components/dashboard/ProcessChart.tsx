import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { useGroupedProcesses } from "@hooks/processes/useGetGroupedProcesses.ts";

const ProcessChart = () => {
  const { data } = useGroupedProcesses(30);
  return (
    <BarChart className="w-full h-full px-2" responsive data={data}>
      <Bar dataKey="amount" className="rounded-t-sm" radius={2}></Bar>
      <Tooltip />
      <XAxis
        width="auto"
        dataKey="date"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        fontSize={10}
      />
      <YAxis
        width="auto"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        fontSize={10}
      />
    </BarChart>
  );
};

export default ProcessChart;
