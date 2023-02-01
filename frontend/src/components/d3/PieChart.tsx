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
      let emptyInstructions = piGen([0, 0]);
      console.log(ea, instructions);
      const arc = svg
        .selectAll("path")
        .data(instructions)
        .attr("class", "slice")
        .join("path")
        .attr("stroke", "black")
        .style("fill", (instruction, index) =>
          index === 0 ? "#eee" : "yellow"
        )
        .style("opacity", (instruction, index) => (index !== 0 ? 1 : 0.4))
        .style(
          "transform",
          `translate(${dimensions.width / 2}px , ${
            dimensions.height / 2 + margin.top
          }px)`
        )
        .transition()
        .duration(2000)
        .attrTween("d", function (nextI) {
          const interpolator = d3.interpolate(this?.lastI, nextI);
          this.lastI = interpolator(0);
          return function (t) {
            return arcGen(interpolator(t));
          };
        });

      svg
        .selectAll("text")
        // .style(
        //   "transform",
        //   `translate(${dimensions.width / 2}px , ${
        //     dimensions.height / 2 + margin.top
        //   }px)`
        // )
        .data(instructions)
        .join("text")
        .style("transform", function (d) {
          //@ts-ignore
          let c = arcGen.centroid(d);
          console.log(c);
          let text = `translate(${c[0]}, ${c[1]})`;
          return text;
        })
        .text((d) => d.value.toFixed(2))
        .style("color", "#d4d4d4")
        .style("font-size", "14px");
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
