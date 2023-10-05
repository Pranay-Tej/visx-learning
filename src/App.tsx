import BarChart from "./BarChart";
import LineChart from "./LineChart";
import BarChartToolTip from "./BarChartToolTip";
import LineChartTooltip from "./LineChartTooltip";
import LineChartDots from "./LineChartDots";
import BarChartsTwoGrouped from "./BarChartsTwoGrouped";
import LineChartHoverDot from "./LineChartHoverDot";

export default function App() {
  return (
    <>
      <BarChart />
      <LineChart />

      <BarChartToolTip />
      <LineChartTooltip />

      <LineChartDots />

      <BarChartsTwoGrouped />

      <LineChartHoverDot />
    </>
  );
}
