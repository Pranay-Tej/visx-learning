import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { useContext } from "react";
import { BrushChartContext } from "./BrushChartContext";
import { data } from "./constants";
import { AxisBottom, AxisLeft } from "@visx/axis";

const margin = {
  top: 40,
  bottom: 40,
  left: 60,
  right: 60,
};
const height = 300;
const width = 1000;

export default function FilteredChart() {
  const { selectedDates } = useContext(BrushChartContext);

  const selectedDatesFromScrubber = selectedDates ?? [];
  const dataForLinePath =
    selectedDatesFromScrubber?.map((date) => ({
      date,
      value: data[date],
    })) ?? [];

  const xScale = scaleBand({
    domain: selectedDatesFromScrubber ?? [],
    range: [margin.left, width - margin.right],
    padding: 0.5,
  });

  const yValues = selectedDatesFromScrubber.map((date) => data[date]);

  const yScale = scaleLinear({
    domain: [Math.min(...yValues) - 10, Math.max(...yValues) + 10],
    range: [height - margin.bottom, margin.top],
  });
  return (
    <>
      <div style={{ position: "relative" }}>
        <svg height={height} width={width}>
          <Group>
            <LinePath
              data={dataForLinePath}
              x={(d) => (xScale(d.date) ?? 0) + xScale.bandwidth() / 2}
              y={(d) => yScale(d.value)}
              stroke="black"
              strokeWidth={1}
            />

            <AxisBottom scale={xScale} top={height - margin.bottom} />
            <AxisLeft scale={yScale} left={margin.left} />
          </Group>
        </svg>
      </div>
    </>
  );
}
