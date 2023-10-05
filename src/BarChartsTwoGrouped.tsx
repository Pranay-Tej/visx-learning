import { AxisBottom, AxisLeft } from "@visx/axis";
import { localPoint } from "@visx/event";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { TooltipWithBounds, useTooltip } from "@visx/tooltip";

type SalesData = {
  [key: string]: number;
};

const bikeSalesData: SalesData = {
  "2023-09-01": 50,
  "2023-09-02": 75,
  "2023-09-03": 25,
  "2023-09-04": 90,
};
const carSalesData: SalesData = {
  "2023-09-01": 80,
  "2023-09-02": 60,
  "2023-09-03": 40,
  "2023-09-04": 80,
};

const dates = Object.keys(bikeSalesData);

const height = 300;
const width = 500;
const xPadding = 0.6;
const margin = {
  top: 20,
  bottom: 40,
  left: 60,
  right: 20,
};

export default function BarChartsTwoGrouped() {
  const {
    hideTooltip,
    showTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  } = useTooltip();

  const xScale = scaleBand({
    domain: Object.keys(bikeSalesData),
    range: [margin.left, width - margin.right],
    padding: xPadding,
  });

  const yScale = scaleLinear({
    domain: [0, 100],
    range: [height - margin.bottom, margin.top],
  });

  const firstBarXPosition = xScale.range()[0] + xPadding * xScale.step();

  const handleMouseMove = (e: React.MouseEvent) => {
    const { x, y } = localPoint(e) ?? { x: 0, y: 0 };

    if (x < 0 || y < 0) return;

    // console.log(xScale(x));

    const index = Math.floor((x - firstBarXPosition) / xScale.step());

    const date = dates[index];

    if (!date) return;

    showTooltip({
      tooltipLeft: x,
      tooltipTop: y,
      tooltipData: {
        date,
        bikeSales: bikeSalesData[date],
        carSales: carSalesData[date],
      },
    });
  };

  return (
    // position relative is required for the tooltip
    <div style={{ position: "relative" }}>
      <svg
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => hideTooltip()}
      >
        <Group>
          {Object.entries(bikeSalesData).map(([date, value]) => (
            <Bar
              key={date}
              x={xScale(date)}
              y={yScale(value)}
              width={xScale.bandwidth() / 2}
              height={height - margin.bottom - yScale(value)}
              fill="black"
            />
          ))}

          {Object.entries(carSalesData).map(([date, value]) => (
            <Bar
              key={`car-${date}`}
              x={(xScale(date) ?? 0) + xScale.bandwidth() / 2}
              y={yScale(value)}
              width={xScale.bandwidth() / 2}
              height={height - margin.bottom - yScale(value)}
              fill="grey"
            />
          ))}
          <AxisLeft scale={yScale} left={margin.left} />
          <AxisBottom scale={xScale} top={height - margin.bottom} />
        </Group>
      </svg>

      {tooltipOpen && (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          <div>{JSON.stringify(tooltipData)}</div>
        </TooltipWithBounds>
      )}
    </div>
  );
}
