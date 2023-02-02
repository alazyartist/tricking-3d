import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
const ExecutionAverageGaugeChart = ({ data }) => {
  const svgRef = useRef();
  const [piRef, dimensions] = useMeasure();
  useEffect(() => {
    const margin = { top: 30, left: 30, right: 30, bottom: 30 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;
    if (svgRef.current !== undefined) {
      const svg = d3
        .select(svgRef.current)
        .join("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("transform", `translate(${margin.left}px,${margin.top})px`);

      console.log(data);
      const arcGen = d3
        .arc()
        .innerRadius(dimensions.height / 5)
        .outerRadius(dimensions.height / 2 - 0.5);
      const piGen = d3
        .pie()
        .startAngle(Math.PI * -0.5)
        .endAngle(Math.PI * 0.5)
        .sort(null);
      let ea =
        data
          .map((d) => d.executionAverage)
          .filter((d) => d !== 0)
          .reduce((sum, b) => sum + b, 0) /
        data.map((d) => d.executionAverage).filter((d) => d !== 0).length;

      //   const instructions = piGen(ea);
      const instructions = piGen([ea, 1 - ea]);
      let emptyInstructions = piGen([0, 1]);
      console.log(ea, instructions);
      const arc = svg
        .selectAll("path")
        .data(instructions)
        .attr("class", "slice")
        .join("path")
        .attr("stroke", "black")
        .style("fill", (instruction, index) =>
          index === 0 ? "yellow" : "#eee"
        )
        .style("opacity", (instruction, index) => (index === 0 ? 1 : 0.4))
        .style(
          "transform",
          `translate(${dimensions.width / 2}px , ${
            dimensions.height / 2 + margin.top
          }px)`
        )
        .transition()
        .duration(2000)
        .attrTween("d", function (nextI) {
          //@ts-ignore
          const interpolator = d3.interpolate(this?.lastI, nextI);
          //@ts-ignore
          this.lastI = interpolator(0);
          return function (t) {
            //@ts-ignore
            return arcGen(interpolator(t));
          };
        });
      svg
        .selectAll("text")
        .data(instructions)
        .style("transform", function (d) {
          //@ts-ignore
          let c = arcGen.centroid(d);
          return `translate(${
            dimensions.width / 2 + c[0] - 7
          }px , ${dimensions.height / 2 + margin.top + c[1] + 3}px)`;
        })
        .join("text")
        .text((d, i) => (i === 0 ? d.value.toFixed(2) : ""))
        .style("color", "#d4d4d4")
        .style("font-size", "10px");
    }

    console.log(dimensions);
  }, [data, dimensions]);
  return (
    <div ref={piRef} className="h-full max-h-[200px] min-h-[110px] w-full">
      <svg key={"pichartKey"} className="h-full w-full" ref={svgRef} />
    </div>
  );
};

export default ExecutionAverageGaugeChart;
