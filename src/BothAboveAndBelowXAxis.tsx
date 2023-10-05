import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar, Line, LinePath } from "@visx/shape";

const data = {
  "2023-09-01": 50,
  "2023-09-02": 75,
  "2023-09-03": -25,
  "2023-09-04": -40,
};
const linePathData = Object.entries(data).map(([date, value]) => ({
  date,
  value,
}));
const height = 300;
const width = 500;
const margin = {
  top: 20,
  bottom: 40,
  left: 60,
  right: 60,
};

export default function BothAboveAndBelowXAxis() {
  const xScale = scaleBand({
    domain: Object.keys(data),
    range: [margin.left, width - margin.right],
    padding: 0.6,
  });
  const yScale = scaleLinear({
    domain: [Math.min(...Object.values(data), 0) - 20, 100],
    range: [height - margin.bottom, margin.top],
  });

  return (
    <div style={{ border: "1px solid hsl(0, 0%, 60%)", padding: "1.5rem" }}>
      <h2>BothAboveAndBelowXAxis</h2>
      <div>
        <svg width={width} height={height}>
          <Group>
            {Object.entries(data).map(([date, value]) => (
              <Bar
                key={date}
                x={xScale(date)}
                y={value > 0 ? yScale(value) : yScale(0)} // start from 0 on y-axis if value is negative
                width={xScale.bandwidth()}
                height={Math.abs(yScale(value) - yScale(0))} // absolute height from the starting point and extend height amount in bottom direction
                fill="black"
              />
            ))}

            {/* fake x-axis at y=0 */}
            <Line
              from={{ x: margin.left, y: yScale(0) }}
              to={{ x: width - margin.right, y: yScale(0) }}
              stroke="hsl(0, 0%, 60%)"
              strokeWidth={1.5}
            />

            <AxisLeft scale={yScale} left={margin.left} />
            <AxisBottom scale={xScale} top={height - margin.bottom} />
          </Group>
        </svg>
      </div>

      <div>
        <svg width={width} height={height}>
          <Group>
            <LinePath
              data={linePathData}
              x={(d) => (xScale(d.date) ?? 0) + xScale.bandwidth() / 2}
              y={(d) => yScale(d.value)}
              stroke="#D256F1"
              strokeWidth={2}
              curve={curveMonotoneX}
            />

            {/* fake x-axis at y=0 */}

            <Line
              from={{ x: margin.left, y: yScale(0) }}
              to={{ x: width - margin.right, y: yScale(0) }}
              stroke="hsl(0, 0%, 60%)"
              strokeWidth={1.5}
            />

            <AxisLeft scale={yScale} left={margin.left} />
            <AxisBottom scale={xScale} top={height - margin.bottom} />
          </Group>
        </svg>
      </div>
    </div>
  );
}
