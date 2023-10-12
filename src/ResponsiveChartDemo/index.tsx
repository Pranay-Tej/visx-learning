import { ParentSize } from "@visx/responsive";
import ResponsiveChart from "./ResponsiveChart";

export default function ResponsiveChartDemo() {
  return (
    <div
      style={{
        border: "1px solid hsl(0, 0%, 60%)",
        padding: "1.5rem",
      }}
    >
      <h2>Responsive Chart</h2>
      <ParentSize>
        {({ width }) => <ResponsiveChart width={width} />}
      </ParentSize>
    </div>
  );
}
