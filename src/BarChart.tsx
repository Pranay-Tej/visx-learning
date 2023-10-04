import { scaleLinear, scaleBand } from "@visx/scale";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Bar } from "@visx/shape";
import { Grid } from "@visx/grid";
const data = {
  "2023-09-01": 50,
  "2023-09-02": 75,
  "2023-09-03": 25,
  "2023-09-04": 90,
};

const height = 300;
const width = 500;
const margin = {
  top: 20,
  bottom: 20,
  left: 60,
  right: 20,
};

export default function BarChart() {
  const xScale = scaleBand({
    domain: Object.keys(data),
    range: [margin.left, width - margin.right],
    padding: 0.6,
  });

  const yScale = scaleLinear({
    domain: [0, 100],
    range: [height - margin.bottom, margin.top],
  });

  return (
    <>
      <h2>Bar Chart</h2>
      <svg height={height} width={width}>
        <Group>
          <Grid
          xScale={xScale}
          yScale={yScale}
          width={width - margin.right}
          height={height - margin.bottom}
          numTicksRows={0} // This ensures no horizontal grid lines are drawn.
          stroke="#E9ECF0" // This gives a light-colored line. Adjust the color as needed.
          strokeWidth={1}
          // strokeDasharray="4,2" // Optional: makes the line dashed.
          // columnTickValues={transformedData.map((d) => d.date)} // Provide tickValues to Grid
          rowTickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          />
          {Object.entries(data).map(([date, value]) => (
            <Bar
              key={date}
              x={xScale(date)}
              y={yScale(value)}
              width={xScale.bandwidth()}
              height={height - margin.bottom - yScale(value)}
              fill="black"
            />
          ))}
          <AxisBottom
            top={height - margin.bottom}
            scale={xScale}
            tickLabelProps={() => ({
              fill: "black",
              fontSize: 12,
              textAnchor: "middle",
            })}
          />
          <AxisLeft
            left={margin.left}
            scale={yScale}
            // tickLabelProps={() => ({
            //   fill: "black",
            //   fontSize: 12,
            //   textAnchor: "end",
            // })}
            tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          />
        </Group>
      </svg>
    </>
  );
}
