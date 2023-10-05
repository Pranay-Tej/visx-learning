import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { Grid } from "@visx/grid";
import { TooltipWithBounds, defaultStyles, useTooltip } from "@visx/tooltip";
import { localPoint } from "@visx/event";

const data = {
  "2023-09-01": 50,
  "2023-09-02": 75,
  "2023-09-03": 25,
  "2023-09-04": 90,
};

const transformedData = Object.entries(data).map(([date, value]) => ({
  date: new Date(date),
  value,
}));
const oneDayInMs = 24 * 60 * 60 * 1000;
const xMin =
  Math.min(...transformedData.map((d) => d.date.getTime())) - oneDayInMs;
const xMax =
  Math.max(...transformedData.map((d) => d.date.getTime())) + oneDayInMs;

const height = 300;
const width = 500;
const margin = {
  top: 20,
  bottom: 40,
  left: 60,
  right: 20,
};
const tooltipStyles = {
  ...defaultStyles,
};

export default function LineChartTooltip() {
  const {
    hideTooltip,
    showTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  } = useTooltip();

  const xScale = scaleTime({
    domain: [xMin, xMax],
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear({
    domain: [0, 100],
    range: [height - margin.bottom, margin.top],
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { x, y } = localPoint(e) ?? { x: 0, y: 0 };
    if (x < 0 || y < 0) return;

    // // Define a threshold for the tooltip to appear, adjust as needed.
    // const threshold = 10;

    // // Filter the data points to check if the x value is within the threshold of any of them.
    // const nearbyPoint = transformedData.find((d) => {
    //   const scaledX = xScale(d.date);
    //   return Math.abs(scaledX - x) < threshold;
    // });

    // if (!nearbyPoint) {
    //   hideTooltip();
    //   return;
    // }

    showTooltip({
      tooltipLeft: x,
      tooltipTop: y,
      tooltipData: {
        // date: new Date(nearbyPoint.date).toDateString(),
        // value: nearbyPoint.value.toFixed(0),
        date: new Date(xScale.invert(x)).toDateString(),
        value: yScale.invert(y).toFixed(0),
      },
    });
  };

  return (
    // position relative is required to position the tooltip
    <div style={{ position: "relative" }}>
      <h2>Line Chart</h2>
      <svg
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => hideTooltip()}
      >
        <Group>
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={width - margin.right}
            height={height - margin.bottom}
            // numTicksRows={0} // This ensures no horizontal grid lines are drawn.
            stroke="#E9ECF0" // This gives a light-colored line. Adjust the color as needed.
            strokeWidth={1}
            // strokeDasharray="4,2" // Optional: makes the line dashed.
            columnTickValues={transformedData.map((d) => d.date)} // Provide tickValues to Grid
            rowTickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          />
          <LinePath
            data={transformedData}
            x={(d) => xScale(d.date)}
            y={(d) => yScale(d.value)}
            stroke="black"
            strokeWidth={1.5}
            fill="none"
            curve={curveMonotoneX}
          />
          <AxisLeft
            scale={yScale}
            left={margin.left}
            tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          />
          <AxisBottom
            scale={xScale}
            top={height - margin.bottom}
            tickFormat={(date) => {
              if (date instanceof Date) {
                return new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                }).format(date);
              }
              return "";
            }}
            tickValues={transformedData.map((d) => d.date)}
          />
        </Group>
      </svg>

      {tooltipOpen && (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div>{JSON.stringify(tooltipData, null, 2)}</div>
        </TooltipWithBounds>
      )}
    </div>
  );
}
