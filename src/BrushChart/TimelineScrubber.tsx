import { scaleBand, scaleLinear } from "@visx/scale";
import { data, dataForLinePath } from "./constants";
import { Group } from "@visx/group";
import { Brush } from "@visx/brush";
import { AreaClosed } from "@visx/shape";
import { PatternLines } from "@visx/pattern";
import { useContext, useMemo, useRef, useState } from "react";
import BaseBrush from "@visx/brush/lib/BaseBrush";
import { BrushHandleRenderProps } from "@visx/brush/lib/BrushHandle";
import { Bounds } from "@visx/brush/lib/types";
import { BrushChartContext } from "./BrushChartContext";

// const margin = {
//   top: 20,
//   bottom: 20,
//   left: 60,
//   right: 60,
// };
const height = 60;
const width = 1000;

// We need to manually offset the handles for them to be rendered at the right position
function BrushHandle({ x, height, isBrushActive }: BrushHandleRenderProps) {
  const pathWidth = 8;
  const pathHeight = 15;
  if (!isBrushActive) {
    return null;
  }
  return (
    <Group left={x + pathWidth / 2} top={(height - pathHeight) / 2}>
      <path
        fill="#f2f2f2"
        d="M -4.5 0.5 L 3.5 0.5 L 3.5 15.5 L -4.5 15.5 L -4.5 0.5 M -1.5 4 L -1.5 12 M 0.5 4 L 0.5 12"
        stroke="#999999"
        strokeWidth="1"
        style={{ cursor: "ew-resize" }}
      />
    </Group>
  );
}

export default function TimelineScrubber() {
  const brushRef = useRef<BaseBrush | null>(null);
  const [selectedRegionData, setSelectedRegionData] = useState<Bounds | null>(
    null
  );
  const { selectedDates, setSelectedDates } = useContext(BrushChartContext);

  const xScale = useMemo(
    () =>
      scaleBand({
        domain: Object.keys(data),
        range: [0, width],
      }),
    []
  );
  // const xBrushScale = scaleLinear({
  //   domain: [margin.left, width - margin.right],
  //   range: [margin.left, width - margin.right],
  // });

  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: [
          Math.min(...Object.values(data)) - 10,
          Math.max(...Object.values(data)) + 10,
        ],
        range: [height, 0],
      }),
    []
  );
  return (
    <>
      <h2>TODO: Fix margins</h2>

      <div
        style={{
          position: "relative",
          border: "1px solid hsl(0, 0%, 80%)",
          borderRadius: "4px",
          padding: "0.5rem",
        }}
      >
        <svg height={height} width={width}>
          <Group>
            {/* <LinePath
              data={dataForLinePath}
              x={(d) => (xScale(d.date) ?? 0) + xScale.bandwidth() / 2}
              // x={(d) => (xScale(d.date) ?? 0)}
              y={(d) => yScale(d.value)}
              stroke="#D8DCE3"
              strokeWidth={1}
              fill="#EBECEF"
            /> */}
            <AreaClosed
              yScale={yScale}
              data={dataForLinePath}
              x={(d) => (xScale(d.date) ?? 0) + xScale.bandwidth() / 2}
              // x={(d) => (xScale(d.date) ?? 0)}
              y={(d) => yScale(d.value)}
              stroke="#D8DCE3"
              strokeWidth={1}
              fill="#EBECEF"
            />
            <PatternLines
              id="pattern-id"
              height={8}
              width={8}
              stroke="grey"
              strokeWidth={1}
              orientation={["diagonal"]}
            />
            <Brush
              innerRef={brushRef}
              height={height}
              width={width}
              // margin={margin}
              xScale={xScale}
              // xScale={xBrushScale}
              yScale={yScale}
              handleSize={8}
              resizeTriggerAreas={["left", "right"]}
              brushDirection="horizontal"
              useWindowMoveEvents
              // onBrushEnd={(bounds) => {
              //   console.log("end", bounds);
              // }}
              onChange={(bounds) => {
                console.log("change", bounds);
                setSelectedRegionData(bounds);
                const dates =
                  (bounds?.xValues?.filter((x) => x) as string[]) ?? [];
                if (dates.length > 1) {
                  setSelectedDates(dates);
                }
              }}
              selectedBoxStyle={{
                stroke: "blue",
                fill: `url(#pattern-id)`,
              }}
              renderBrushHandle={(props) => <BrushHandle {...props} />}
            />
          </Group>
        </svg>
      </div>

      <div>Selected Region: {JSON.stringify(selectedRegionData, null, 2)}</div>
      <div>Selected dates: {selectedDates?.toString()}</div>
    </>
  );
}
