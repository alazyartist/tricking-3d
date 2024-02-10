import { whichLeg } from "@old_pages/comboMaker/components/ArrayDisplay";
import { trpc } from "@utils/trpc";
import React, { useEffect, useRef } from "react";
import * as terms from "../../../data//Glossary.json";
import * as d3 from "d3";
import useMeasure from "react-use-measure";

const StancesV0 = () => {
  const { data: stances } = trpc.trick.findAllStances.useQuery();
  return (
    <>
      <div className="h-full w-[80vw] grid-cols-3 place-content-center place-items-center gap-2 rounded-xl bg-zinc-800 bg-opacity-70 text-zinc-300">
        <div>Stances</div>
        <StanceSvg stances={stances} />
        {/* <div className="flex h-full w-full flex-col place-content-center place-items-center gap-2">
          {stances?.map((stance) => (
            <div
              key={stance.stance_id}
              className={
                "w-fit min-w-[125px] rounded-md bg-zinc-600 bg-opacity-40 p-2"
              }
            >
              <div>{stance.name}</div>
              <div>{whichLeg(stance.leg)}</div>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default StancesV0;

const StanceSvg = ({ stances }) => {
  const svgRef = useRef(null!);
  const [piRef, dimensions] = useMeasure();
  const [piOverlayData, setPiOverlayData] = React.useState(null);
  useEffect(() => {
    if (!stances) return;
    const margin = { top: 30, left: 10, right: 10, bottom: 10 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;
    const dataThreshold = 0.009;
    if (svgRef.current !== undefined) {
      const svg = d3
        .select(svgRef.current)
        .join("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style(
          "transform",
          `translate(${margin.left}px,${dimensions.height / 2 + margin.top})px`
        );

      let radius = d3.min([height, width]);
      const arcGen = d3
        .arc()
        .innerRadius(radius / 8)
        .outerRadius(radius / 2 - 0.5);
      const piGen = d3
        .pie()
        .startAngle(Math.PI / 4)
        .endAngle(2 * Math.PI + Math.PI / 4)
        .sort(null);
      const filteredStances = stances.filter(
        (s) =>
          s.name !== "Backside" &&
          s.name !== "Frontside" &&
          s.name !== "Inside" &&
          s.name !== "Outside"
      );
      const baseStances = stances
        .map(
          (s) =>
            (s.name === "Backside" ||
              s.name === "Inside" ||
              s.name === "Frontside" ||
              s.name === "Outside") &&
            s
        )
        .filter((t) => t !== false)
        .sort((a, b) => {
          //sort by [Backside, Inside,Frontside, Outside]
          return (
            ["Outside", "Frontside", "Inside", "Backside"].indexOf(a.name) -
            ["Outside", "Frontside", "Inside", "Backside"].indexOf(b.name)
          );
        });
      let stancePercent = filteredStances?.map((t, i) => 45);
      let baseStancePercent = baseStances?.map((t, i) => 90);
      const instructions = piGen(stancePercent);
      const instructions2 = piGen(baseStancePercent);
      console.log(instructions2, piOverlayData);
      const colors = d3
        .scaleSequential(d3.interpolateRgbBasis(["#50d9f0", "#ff4b9f"]))
        .domain([0, stances.length + 1]);
      const arcGroup = svg.selectAll("g").data(instructions2).join("g");

      const arc = arcGroup
        .selectAll("path")
        .data(instructions2)
        .attr("class", "slice")
        .join("path")
        .on("click", function (e: React.MouseEvent, d: any) {
          setPiOverlayData(d);
          e.preventDefault();
          const path = d3.select(this);
          const pathNode = path.node() as SVGPathElement;
          pathNode.parentNode.appendChild(pathNode);

          path.transition().attrTween("d", function (d: d3.DefaultArcObject) {
            console.log(d);
            let i, i2;

            if (d.endAngle - d.startAngle < Math.PI) {
              i = d3.interpolate(
                d.startAngle + 0.01,
                d.startAngle - Math.PI / 4
              );
              i2 = d3.interpolate(d.endAngle - 0.01, d.endAngle + Math.PI / 4);
              d.startAngle = d.startAngle - Math.PI / 4;
              d.endAngle = d.endAngle + Math.PI / 4;
            } else {
              i = d3.interpolate(
                d.startAngle + 0.01,
                d.startAngle + Math.PI / 4
              );
              i2 = d3.interpolate(d.endAngle - 0.01, d.endAngle - Math.PI / 4);
              d.startAngle = d.startAngle + Math.PI / 4;
              d.endAngle = d.endAngle - Math.PI / 4;
            }

            return function (t) {
              d.startAngle = i(t);
              d.endAngle = i2(t);
              return arcGen(d as unknown as d3.DefaultArcObject);
            };
          });
        })
        .attr("stroke", "#18181b")
        .style("fill", (d, i) => colors(i))
        .style(
          "transform",
          `translate(${dimensions.width / 2}px , ${dimensions.height / 2}px)`
        )
        .transition()
        .duration(500)
        .attrTween("d", function (d) {
          const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
          return function (t) {
            d.endAngle = i(t);
            return arcGen(d as unknown as d3.DefaultArcObject);
          };
        });

      const text = svg
        .selectAll("text")
        .data(instructions2)
        .join("text")
        .text(function (d, i) {
          // console.log(d, i, tricksArray[i][0]);
          return baseStances[i].name;
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("transform", function (d, i) {
          //put legend in left top corner
          let c = arcGen.centroid(d as unknown as d3.DefaultArcObject);
          return `translate(${
            dimensions.width / 2 + c[0]
          }px , ${dimensions.height / 2 + c[1]}px)`;
        })
        .style("fill", (d, i) => "#27272e")
        .style("font-size", 20);

      //draw item in center circle
      // const center = svg
      //   .selectAll("circle")
      //   .data([1])
      //   .join("circle")
      //   .attr("r", 8)
      //   .attr("cx", 0)
      //   .attr("cy", 0)
      //   .style("fill", "red")
      //   .style(
      //     "transform",
      //     `translate(${dimensions.width / 2}px , ${dimensions.height / 2}px)`
      //   );

      // draw line from text to arc center
      // const polyline = svg
      //   .selectAll("polyline")
      //   .data(instructions2)
      //   .join("polyline")
      //   .attr("stroke", "white")
      //   .style("fill", "none")
      //   .style("stroke-width", "1px")
      //   .attr("points", function (d) {
      //     let c = arcGen.centroid(d as unknown as d3.DefaultArcObject);
      //     let half = dimensions.width / 2;
      //     let x = half + c[0] > half ? half + c[0] + 70 : half + c[0] - 70;
      //     let y = dimensions.height / 2 + c[1];
      //     if (d.data > dataThreshold) {
      //       return `${x},${dimensions.height / 2 + c[1]} ${half + c[0]},${
      //         dimensions.height / 2 + c[1]
      //       } ${half + c[0] * 0.8},${y - 4}`;
      //     }
      //   });
    }

    return () => {
      if (svgRef.current) {
        d3.select(svgRef.current).selectAll("*").remove();
      }
    };
  }, [dimensions, stances]);
  const [leg, setLeg] = React.useState("Both");
  return (
    <div className="relative h-[60vh] min-h-[24vh] w-full" ref={piRef}>
      <svg key={"CHMSPieChart"} className={"h-full  w-full"} ref={svgRef} />
      <div
        onClick={() =>
          setLeg((l) => {
            if (l === "Both") return "Left";
            if (l === "Left") return "Right";
            if (l === "Right") return "Both";
          })
        }
        className={`absolute left-0 top-0 flex h-[48px] w-[48px] place-content-center place-items-center fill-zinc-500`}
        style={{
          transform: `translate(${dimensions.width / 2 - 24}px, ${
            dimensions.height / 2 - 24
          }px)`,
        }}
      >
        {whichLeg(leg)}
      </div>
    </div>
  );
};
