import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
import { tricks } from "@prisma/client";

const TrickPieChart = ({ data, group_by }) => {
  const svgRef = useRef(null!);
  const [piRef, dimensions] = useMeasure();
  useEffect(() => {
    if (!data) return;
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
        .startAngle(0)
        .endAngle(2 * Math.PI)
        .sort(null);
      let tricksArray = Array.from(
        d3.group(data, (d: tricks) => d?.[group_by])
      );
      let trickPercent = tricksArray?.map((t, i) => t[1]?.length / data.length);
      const instructions = piGen(trickPercent);
      const colors = d3
        .scaleSequential(d3.interpolateRgbBasis(["#50d9f0", "#ff4b9f"]))
        .domain([0, tricksArray.length + 1]);

      const arc = svg
        .selectAll("path")
        .data(instructions)
        .attr("class", "slice")
        .join("path")
        .on("click", function (e, d) {
          console.log(e, d, tricksArray[d.index][0]);
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
        .data(instructions)
        .join("text")
        .text(function (d, i) {
          // console.log(d, i, tricksArray[i][0]);
          if (d.data > dataThreshold) {
            return tricksArray[i][0];
          }
        })
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .style("transform", function (d) {
          let c = arcGen.centroid(d as unknown as d3.DefaultArcObject);
          let half = dimensions.width / 2;
          return `translate(${
            half + c[0] > half ? half + c[0] + 70 : half + c[0] - 70
          }px,${dimensions.height / 2 + c[1]}px)`;
        })
        .style("font-size", 10);

      //draw line from text to arc center
      const polyline = svg
        .selectAll("polyline")
        .data(instructions)
        .join("polyline")
        .attr("stroke", "white")
        .style("fill", "none")
        .style("stroke-width", "1px")
        .attr("points", function (d) {
          let c = arcGen.centroid(d as unknown as d3.DefaultArcObject);
          let half = dimensions.width / 2;
          let x = half + c[0] > half ? half + c[0] + 70 : half + c[0] - 70;
          let y = dimensions.height / 2 + c[1];
          if (d.data > dataThreshold) {
            return `${x},${dimensions.height / 2 + c[1]} ${half + c[0]},${
              dimensions.height / 2 + c[1]
            } ${half + c[0] * 0.8},${y - 4}`;
          }
        });
    }

    return () => {
      if (svgRef.current) {
        d3.select(svgRef.current).selectAll("*").remove();
      }
    };
  }, [dimensions, data, group_by]);

  return (
    <div className="h-full min-h-[24vh] w-full" ref={piRef}>
      <svg key={"trickPieChart"} className={"h-full  w-full"} ref={svgRef} />
    </div>
  );
};
export default TrickPieChart;
