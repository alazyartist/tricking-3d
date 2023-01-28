import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ticks } from "d3";

const RadarChart = ({ data }) => {
  const container = useRef(null);
  console.log(data);
  let byBase = Array.from(
    d3.group(data, (d) => (d.type === "Transition" ? d.name : d.base_id))
  ).filter((d) => d[0] !== undefined && d[0] !== "Hook" && d[0] !== "Round");
  console.log(byBase);
  let max = d3.max(byBase.map((b) => b[1].length));
  useEffect(() => {
    // Set the dimensions of the canvas/graph
    const margin = { top: 50, right: 20, bottom: 30, left: 175 };
    const width = 350 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = d3
      .select(container.current)
      .join("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    function angleToCoordinate(angle, value) {
      let x = Math.cos(angle) * radialScale(value);
      let y = Math.sin(angle) * radialScale(value);
      return { x: 100 + x, y: 100 - y };
    }

    let radialScale = d3.scaleLinear().domain([0, max]).range([0, 120]);
    let ticks = [];
    for (let i = 0; i <= max; i += 5) {
      ticks.push(i);
    }

    ticks.forEach((t) =>
      svg
        .append("circle")
        .attr("cx", 100)
        .attr("cy", 100)
        .attr("fill", "none")
        .attr("stroke", "#d4d4d4")
        .attr("r", radialScale(t))
    );

    ticks.forEach((t) =>
      svg
        .append("text")
        .style("fill", "#d4d4d4")
        .style("font-size", "8px")
        .attr("x", 100)
        .attr("y", 95 - radialScale(t))
        .text(t.toString())
    );

    let bases = [
      "Backflip",
      "Frontflip",
      "Insideflip",
      "Outsideflip",
      "Gainer",
      "GainerR",
      "Aerial",
      "GMS",
      "Raiz",
      "Lotus",
      "Webster",
      "Websterr",
    ];

    for (var i = 0; i < byBase.length; i++) {
      let ft_name = byBase[i][0];
      let angle = Math.PI / 2 + (2 * Math.PI * i) / byBase.length;
      let line_coordinate = angleToCoordinate(angle, max);
      let label_coordinate = angleToCoordinate(angle, max + 0.75);
      // for (var i = 0; i < bases.length; i++) {
      //   let ft_name = bases[i];
      //   let angle = Math.PI / 2 + (2 * Math.PI * i) / bases.length;
      //   let line_coordinate = angleToCoordinate(angle, max);
      //   let label_coordinate = angleToCoordinate(angle, max + 0.75);

      //draw axis line
      svg
        .append("line")
        .attr("x1", 100)
        .attr("y1", 100)
        .attr("x2", line_coordinate.x)
        .attr("y2", line_coordinate.y)
        .attr("stroke", "black");

      //draw axis label
      svg
        .append("text")
        .style("fill", "#d4d4d4")
        .style("font-size", "12px")
        .attr("x", label_coordinate.x - 5)
        .attr("y", label_coordinate.y - 5)
        .text(ft_name);
    }

    let colors = ["darkorange", "gray", "navy"];
    function getPathCoordinates(data_point) {
      let coordinates = [];
      for (var i = 0; i < byBase.length; i++) {
        let ft_name = byBase[i][0];
        let ft_arr = byBase[i][1];
        // console.log(ft_name, "datapoint", ft_arr);
        let angle = Math.PI / 2 + (2 * Math.PI * i) / byBase.length;
        coordinates.push(angleToCoordinate(angle, ft_arr.length));
      }
      return coordinates;
    }

    let line = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y);
    for (var i = 0; i < byBase.length; i++) {
      let d = byBase[i][1];
      let color = colors[i];
      let coordinates = getPathCoordinates(d);

      //draw the path element
      svg
        .append("path")
        .datum(coordinates)
        .attr("d", line)
        .attr("stroke-width", 3)
        .attr("fill", "#d4d4d4")
        .attr("opacity", 0.2);
    }
  }, [data]);

  return (
    <svg key={"svgkey"} className="z-[2000] h-[350px] w-full" ref={container} />
  );
};

export default RadarChart;
