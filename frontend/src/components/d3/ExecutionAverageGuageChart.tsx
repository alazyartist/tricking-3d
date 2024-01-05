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
      let radius = d3.min([dimensions.height, dimensions.width]);
      const arcGen = d3
        .arc()
        .innerRadius(radius / 5)
        .outerRadius(radius / 2 - 0.5);
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

      const colors = d3
        .scaleSequential(d3.interpolateRgbBasis(["#fce100", "#f7630c"]))
        .domain([0, 1]);

      //   const instructions = piGen(ea);
      const instructions = piGen([ea, 1 - ea]);
      let emptyInstructions = piGen([0, 1]);
      if (Number.isNaN(instructions[0].data)) {
        svg
          .selectAll("text3")
          .data([0])
          .join("text")
          .text("No Data")
          .attr("text-anchor", "middle")
          .style(
            "transform",
            `translate(${dimensions.width / 2}px, ${dimensions.height / 2}px)`
          )
          .style("font-size", "16px")
          .style("fill", "#d4d4d8");

        svg
          .selectAll("text4")
          .data([0])
          .join("text")
          .text(" update combos to see data")
          .attr("text-anchor", "middle")
          .style(
            "transform",
            `translate(${dimensions.width / 2}px, ${
              dimensions.height / 2 + 20
            }px)`
          )
          .style("font-size", "10px")
          .style("fill", "#d4d4d8");
      } else {
        const arc = svg
          .selectAll("path")
          .data(instructions)
          .attr("class", "slice")
          .join("path")
          .attr("stroke", "black")
          .style("fill", (instruction, index) =>
            index === 0 ? colors(instruction.data) : "#eee"
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
          .join("text")
          .text((d, i) => (i === 0 ? `${(d.value * 100).toFixed(0)}%` : ""))
          .attr("text-anchor", "middle")
          .style("transform", function (d) {
            //@ts-ignore
            let c = arcGen.centroid(d);
            return `translate(${
              dimensions.width / 2 + c[0] + 3
            }px , ${dimensions.height / 2 + margin.top + c[1] + 3}px)`;
          })
          .style("font-family", "Inter")
          .style("font-weight", "bold")
          .style("font-size", "10px")
          .style("fill", "#18181b");

        //add text "Execution Average" underneath chart
      }
      svg
        .selectAll("text2")
        .data([0])
        .join("text")
        .text("Execution Average")
        .attr("text-anchor", "middle")
        .style(
          "transform",
          `translate(${dimensions.width / 2}px, ${dimensions.height}px)`
        )
        .style("font-size", "12px")
        .style("fill", "#d4d4d8");
    }

    return () => {
      if (svgRef.current) {
        d3.select(svgRef.current).selectAll("*").remove();
      }
    };
  }, [data, dimensions]);
  return (
    <div ref={piRef} className="h-full max-h-[200px] min-h-[110px] w-full">
      <svg key={"executionAverageKey"} className="h-full w-full" ref={svgRef} />
    </div>
  );
};

export default ExecutionAverageGaugeChart;
