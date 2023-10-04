import { scaleLinear, scaleBand } from "@visx/scale";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Bar } from "@visx/shape";
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
            tickLabelProps={() => ({
              fill: "black",
              fontSize: 12,
              textAnchor: "middle",
            })}
            tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          />
        </Group>
      </svg>
    </>
  );
}
