import { AxisBottom, AxisLeft, AxisRight } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { GridColumns, GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar, LinePath } from "@visx/shape";

const barData = {
  "2023-09-01": 50,
  "2023-09-02": 75,
  "2023-09-03": 25,
  "2023-09-04": 90,
};

const lineData = {
  "2023-09-01": 8000,
  "2023-09-02": 7900,
  "2023-09-03": 9000,
  "2023-09-04": 8600,
};

const transformedLineData = Object.entries(lineData).map(([date, value]) => ({
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
const xPadding = 0.6;

export default function BarLineGrouped() {
  const xScale = scaleBand({
    domain: Object.keys(barData),
    padding: xPadding,
    range: [margin.left, width - margin.right],
  });

  const yScaleBars = scaleLinear({
    domain: [
      Math.min(...Object.values(barData), 0),
      Math.max(...Object.values(barData)),
    ],
    range: [height - margin.bottom, margin.top],
  });

  const yScaleLine = scaleLinear({
    domain: [
      Math.min(...Object.values(lineData)),
      Math.max(...Object.values(lineData)),
    ],
    range: [height - margin.bottom, margin.top],
  });

  return (
    <div>
      <h2>BarLineGrouped</h2>
      <svg height={height} width={width}>
        <Group>
          <GridRows
            scale={yScaleBars}
            stroke="#E9ECF0"
            width={width - margin.right - margin.left}
            numTicks={6}
            left={margin.left}
            tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          />
          <GridColumns
            scale={xScale}
            stroke="#E9ECF0"
            height={height - margin.bottom - margin.top}
            top={margin.top}
          />

          {Object.entries(barData).map(([date, value]) => {
            return (
              <Bar
                key={date}
                x={xScale(date)}
                y={yScaleBars(value)}
                width={xScale.bandwidth()}
                height={height - margin.bottom - yScaleBars(value)}
                fill="#33A3E3"
              />
            );
          })}

          <LinePath
            data={transformedLineData}
            x={(d) => (xScale(d.date) ?? 0) + xScale.bandwidth() / 2}
            y={(d) => yScaleLine(d.value)}
            stroke="#D256F1"
            strokeWidth={2}
            curve={curveMonotoneX}
          />

          <AxisLeft
            scale={yScaleLine}
            left={margin.left}
            hideAxisLine
            hideTicks
            label="Line Chart"
            numTicks={5}
          />
          <AxisRight
            scale={yScaleBars}
            left={width - margin.right}
            hideAxisLine
            hideTicks
            label="Bar Chart"
            numTicks={5}
          />
          <AxisBottom scale={xScale} top={height - margin.bottom} />
        </Group>
      </svg>
    </div>
  );
}
