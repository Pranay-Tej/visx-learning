import BarChart from "./BarChart";
import LineChart from "./LineChart";
import BarChartToolTip from "./BarChartToolTip";
import LineChartTooltip from "./LineChartTooltip";
import LineChartDots from "./LineChartDots";

export default function App() {
  return (
    <>
      <BarChart />
      <LineChart />

      <BarChartToolTip />
      <LineChartTooltip />

      <LineChartDots />
    </>
  );
}
