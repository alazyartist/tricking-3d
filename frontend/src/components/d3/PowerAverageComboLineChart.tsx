import React, { useEffect, useRef } from "react";
import useMeasure from "react-use-measure";
import * as d3 from "d3";
const PowerAverageComboLineChart = ({ data }) => {
  const svgRef = useRef();
  const [lRef, dimensions] = useMeasure();

  useEffect(() => {
    const margin = { top: 0, left: 0, right: 0, bottom: 0 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;
    if (svgRef.current !== undefined) {
      const svg = d3
        .select(svgRef.current)
        .join("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .style(
          "transform",
          `translate(${margin.left}px,${dimensions.height / 2 + margin.top})px`
        );
      const max = d3.max(data, (d: any) => d.ClipLabel.pointValue);
      const xScale = d3
        .scaleLinear()
        .domain([0, data.length + 1])
        .range([0, width]);
      const yScale = d3.scaleLinear().domain([0, 30]).range([height, 0]);

      svg
        .append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", 30)
        .selectAll("stop")
        .data([
          { offset: "0%", color: "#ff4b9f" },
          { offset: "80%", color: "#50d9f0" },
          { offset: "100%", color: "#50d9f0" },
        ])
        .enter()
        .append("stop")
        .attr("offset", function (d) {
          return d.offset;
        })
        .attr("stop-color", function (d) {
          return d.color;
        });
      // console.log("datum", data);
      let line = svg
        .datum([
          { ClipLabel: { pointValue: 0 } },
          ...data,
          { ClipLabel: { pointValue: 0 } },
        ])
        .append("path");

      line
        .attr("fill", "none")
        .attr("stroke", "url(#line-gradient)")
        .attr("stroke-width", 1.7)
        .attr(
          "d",
          d3
            .line()
            .x((d, i) => xScale(i))
            .y((d: any, i) => {
              // let a = `x:${xScale(i)} y:${yScale(d.ClipLabel.pointValue)}`;
              return yScale(d.ClipLabel.pointValue);
            })
            .curve(d3.curveCatmullRom)
        );
    }
    // console.log("paclc", data);
  }, [data, dimensions]);

  return (
    <div ref={lRef} className="h-full w-full">
      <svg key={Math.random()} className="h-full w-full" ref={svgRef} />
    </div>
  );
};

export default PowerAverageComboLineChart;
