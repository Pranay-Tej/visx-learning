import BarChart from "./BarChart";
import LineChart from "./LineChart";
import BarChartToolTip from "./BarChartToolTip";
import LineChartTooltip from "./LineChartTooltip";
import LineChartDots from "./LineChartDots";
import BarChartsTwoGrouped from "./BarChartsTwoGrouped";
import LineChartHoverDot from "./LineChartHoverDot";
import BarLineGrouped from "./BarLineGrouped";
import BothAboveAndBelowXAxis from "./BothAboveAndBelowXAxis";
import BrushChart from "./BrushChart";

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

      <BothAboveAndBelowXAxis />

      <BarLineGrouped />

      <BrushChart />
    </>
  );
}
