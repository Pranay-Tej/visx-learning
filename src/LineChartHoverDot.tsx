import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Circle, LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { TooltipWithBounds, defaultStyles, useTooltip } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { useState } from "react";

const data: {
  [key: string]: number;
} = {
  "2023-09-01": 50,
  "2023-09-02": 75,
  "2023-09-03": 25,
  "2023-09-04": 90,
};
const dates = Object.keys(data);

const transformedData = Object.entries(data).map(([date, value]) => ({
  date,
  value,
}));

const height = 300;
const width = 500;
const margin = {
  top: 20,
  bottom: 40,
  left: 60,
  right: 20,
};
const xPadding = 0;
const tooltipStyles = {
  ...defaultStyles,
};

export default function LineChartHoverDot() {
  const {
    hideTooltip,
    showTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  } = useTooltip();

  const [hoverDate, setHoverDate] = useState<string | null>(null);

  const xScale = scaleBand({
    domain: Object.keys(data),
    range: [margin.left, width - margin.right],
    padding: xPadding,
  });

  const yScale = scaleLinear({
    domain: [0, 100],
    range: [height - margin.bottom, margin.top],
  });

  const firstDateXPosition = xScale.range()[0] + xPadding * xScale.step();

  const handleMouseMove = (e: React.MouseEvent) => {
    const { x, y } = localPoint(e) ?? { x: 0, y: 0 };
    if (x < 0 || y < 0) return;

    const index = Math.floor((x - firstDateXPosition) / xScale.step());
    const date = dates[index];
    if (!date) {
      setHoverDate(null);
      return;
    }
    setHoverDate(date);

    showTooltip({
      tooltipLeft: x,
      tooltipTop: y,
      tooltipData: {
        date,
        value: yScale.invert(y).toFixed(0),
      },
    });
  };

  return (
    // position relative is required to position the tooltip
    <div style={{ position: "relative" }}>
      <h2>LineChartHoverDot</h2>
      <svg
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          hideTooltip();
        }}
      >
        <Group>
          <LinePath
            data={transformedData}
            x={(d) => (xScale(d.date) ?? 0) + xScale.bandwidth() / 2}
            y={(d) => yScale(d.value) ?? 0}
            stroke="black"
            strokeWidth={1.5}
            fill="none"
            curve={curveMonotoneX}
          />

          {/* Dots */}
          {transformedData.map((d) => {
            return (
              <Circle
                key={d.date}
                cx={(xScale(d.date) ?? 0) + xScale.bandwidth() / 2}
                cy={yScale(d.value)}
                r={4} // radius of the circle, adjust as needed
                fill="red" // color of the circle, adjust as needed
              />
            );
          })}

          {/* Hover dot */}
          {hoverDate && (
            <Circle
              cx={(xScale(hoverDate) ?? 0) + xScale.bandwidth() / 2}
              cy={yScale(data[hoverDate])}
              r={6} // radius of the circle, adjust as needed
              fill="blue"
            />
          )}

          <AxisLeft
            scale={yScale}
            left={margin.left}
            tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          />
          <AxisBottom
            scale={xScale}
            top={height - margin.bottom}
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
