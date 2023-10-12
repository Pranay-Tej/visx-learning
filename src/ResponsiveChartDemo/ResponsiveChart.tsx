import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { useMemo } from "react";

const data = {
  "2023-09-01": 50,
  "2023-09-02": 75,
  "2023-09-03": 25,
  "2023-09-04": 90,
};

const margin = {
  top: 40,
  bottom: 40,
  left: 60,
  right: 60,
};

const height = 300;

export default function ResponsiveChart(props: { width: number }) {
  const xScale = useMemo(
    () =>
      scaleBand({
        domain: Object.keys(data),
        range: [margin.left, props.width - margin.right],
        padding: 0.5,
      }),
    [props.width]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: [
          Math.min(...Object.values(data)) - 10,
          Math.max(...Object.values(data)) + 10,
        ],
        range: [margin.top, height - margin.bottom],
      }),
    []
  );

  return (
    <svg height={height} width={props.width}>
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

        <AxisBottom scale={xScale} top={height - margin.top} />
        <AxisLeft scale={yScale} left={margin.left} />
      </Group>
    </svg>
  );
}
