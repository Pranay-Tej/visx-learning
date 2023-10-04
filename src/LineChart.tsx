import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { Grid } from "@visx/grid";

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

export default function LineChart() {
  const xScale = scaleTime({
    domain: [xMin, xMax],
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear({
    domain: [0, 100],
    range: [height - margin.bottom, margin.top],
  });

  return (
    <>
      <h2>Line Chart</h2>
      <svg width={width} height={height}>
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
    </>
  );
}
