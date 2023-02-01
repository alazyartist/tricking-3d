import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ticks } from "d3";
import useMeasure from "react-use-measure";

const RadarChart = ({ data }) => {
  const container = useRef(null);
  const [mRef, dimensions] = useMeasure();
  // console.log(data);
  let byBase = Array.from(
    d3.group(data, (d) => (d.type === "Transition" ? d.name : d.base_id))
  ).filter((d) => d[0] !== undefined && d[0] !== "Hook" && d[0] !== "Round");
  // console.log(byBase);
  let max = d3.max(byBase.map((b) => b[1].length));
  useEffect(() => {
    if (dimensions.left === 0) return;
    // Set the dimensions of the canvas/graph
    const margin = { top: 50, right: 20, bottom: 30, left: 10 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;
    console.log(width, height, dimensions);
    const svg = d3
      .select(container.current)
      .join("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .join("g")
      .style(
        "transform",
        `translate(${dimensions.width / 2 - 100}px,${
          dimensions.height / 2 - 100
        }px)`
      );

    let radialScale = d3.scaleLinear().domain([0, 1]).range([0, 100]);
    function angleToCoordinate(angle, value) {
      let x = Math.cos(angle) * radialScale(value);
      let y = Math.sin(angle) * radialScale(value);
      return { x: 100 + x, y: 100 - y };
    }
    let ticks = [];
    for (let i = 0; i <= 1; i += 0.25) {
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
      "GainerR",
      "GMS",
      "Insideflip",
      "Aerial",
      "Websterr",
      "Frontflip",
      "Webster",
      "Raiz",
      "Outsideflip",
      "Lotus",
      "Gainer",
    ];

    // for (var i = 0; i < byBase.length; i++) {
    //   let ft_name = byBase[i][0];
    //   let angle = Math.PI / 2 + (2 * Math.PI * i) / byBase.length;
    //   let line_coordinate = angleToCoordinate(angle, max);
    //   let label_coordinate = angleToCoordinate(angle, max + 0.75);
    for (var i = 0; i < bases.length; i++) {
      let ft_name = bases[i];
      let angle = Math.PI / 2 + (2 * Math.PI * i) / bases.length;
      let line_coordinate = angleToCoordinate(angle, 1);
      let label_coordinate = angleToCoordinate(angle, 1 + 0.15);

      //draw axis line
      svg
        .append("line")
        .attr("x1", 100)
        .attr("y1", 100)
        .attr("x2", line_coordinate.x)
        .attr("y2", line_coordinate.y)
        .attr("stroke", "#2c2c2f");

      //draw axis label
      svg
        .append("text")
        .style("fill", "#d4d4d4")
        .style("font-size", "12px")
        .attr("text-anchor", "middle")
        .attr("x", label_coordinate.x - 5)
        .attr("y", label_coordinate.y - 5)
        .text(ft_name);
    }

    let colors = ["darkorange", "gray", "navy"];
    function getPathCoordinates(data_point) {
      let coordinates = [];
      for (var i = 0; i < bases.length; i++) {
        let curBase = bases[i];
        let ft_arr;
        let angle = Math.PI / 2 + (2 * Math.PI * i) / bases.length;
        if (curBase === data_point[0]) {
          // console.log("matched", curBase);
          ft_arr = data_point[1];
        } else {
          // console.log("empty match - nothing fount");
          ft_arr = [];
        }
        coordinates.push(angleToCoordinate(angle, ft_arr.length / max + 0.1));
        // console.log(curBase, data_point, "datapoint", ft_arr.length);
      }
      // console.log(coordinates);
      return coordinates;
    }

    let line = d3
      .line()
      //@ts-ignore
      .x((d) => d.x)
      //@ts-ignore
      .y((d) => d.y);
    for (var i = 0; i < byBase.length; i++) {
      let d = byBase[i];
      let color = colors[i];
      let coordinates = getPathCoordinates(d);

      //draw the path element
      svg
        .join("path")
        .datum(coordinates)
        //@ts-ignore
        .attr("d", line)
        .attr("stroke-width", 3)
        .attr("fill", "#d4d4d4")
        .attr("opacity", 0.8);
    }
  }, [data, dimensions]);

  return (
    <div ref={mRef} className={"h-[350px] w-full"}>
      <svg key={"svgkey"} className=" h-full w-full" ref={container} />
    </div>
  );
};

export default RadarChart;
