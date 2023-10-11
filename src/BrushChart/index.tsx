import { BrushChartContextProvider } from "./BrushChartContext";
import FilteredChart from "./FilteredChart";
import TimelineScrubber from "./TimelineScrubber";

export default function BrushChart() {
  return (
    <BrushChartContextProvider>
      <div style={{ border: "1px solid hsl(0, 0%, 60%)", padding: "1.5rem" }}>
        <h2>Brush Chart</h2>

        <FilteredChart />
        <hr />
        <TimelineScrubber />
      </div>
    </BrushChartContextProvider>
  );
}
