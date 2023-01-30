import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
const PieChart = ({ data }) => {
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
      const arcGen = d3.arc().innerRadius(25).outerRadius(50);
      const piGen = d3
        .pie()
        .startAngle(Math.PI * 0.5)
        .endAngle(Math.PI * -0.5)
        .sort(null);
      let ea = [
        data
          .map((d) => d.executionAverage)
          .filter((d) => d !== 0)
          .reduce((sum, b) => sum + b, 0) /
          data.map((d) => d.executionAverage).filter((d) => d !== 0).length,
        1,
      ];
      const instructions = piGen(ea);
      console.log(ea, instructions);
      const arc = svg
        .selectAll("path")
        .data(instructions)
        .attr("class", "slice")
        .join("path")
        .attr("stroke", "black")
        .style("fill", (instruction, index) =>
          index !== 0 ? "yellow" : "#eee"
        )
        .style("opacity", (instruction, index) => (index !== 0 ? 1 : 0.4))
        .style(
          "transform",
          `translate(${dimensions.width / 2}px , ${
            dimensions.height / 2 + margin.top
          }px)`
        )
        .attr("d", (instruction) => arcGen(instruction))
        .append("text")
        .style("fill", "#d4d4d4")
        .style("font-size", "12px")
        .attr("text-anchor", "middle")
        .text("test");
    }
    console.log(dimensions);
  }, [data, dimensions]);
  return (
    <div ref={piRef} className="h-[110px] w-[110px]">
      <svg key={"pichartKey"} className="h-full w-full" ref={svgRef} />
    </div>
  );
};

export default PieChart;
