import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { variations } from "@prisma/client";

interface Props {
  data: variations[];
}

const VariationGrid: React.FC<Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      if (!data) return;
      const svg = d3.select(svgRef.current);
      const labels = ["En", "B", "M", "E", "Ex", ""];
      const labelsD = ["En", "B", "M", "E", "Ex"];

      // Set up the x-axis scale
      const xScale = d3
        .scalePoint()
        .domain(labels)
        .range([0, svgRef.current.clientWidth])
        .padding(0);
      const xScaleD = d3
        .scalePoint()
        .domain(labelsD)
        .range([0, svgRef.current.clientWidth])
        .padding(0.5);

      // Render the x-axis
      const xAxis = d3.axisBottom(xScaleD);
      svg.attr("viewBox", `0 0 450 900`);

      // Function to calculate x position and width based on the data's pos attribute
      const calculatePositionAndWidth = (d) => {
        const posLabels = d.pos.split(",").map((label) => label.trim());
        const xPos = posLabels.map((label) => xScale(label));
        const xMin = parseFloat(d3.min(xPos));
        const xMax = xScale(
          labels[
            labels.findIndex((l) => l === posLabels[posLabels.length - 1]) + 1
          ]
        );
        console.log(posLabels, xPos, xMin, xMax);
        const width = xMax - xMin;
        return { x: xMin, width: width };
      };
      // Render the elements
      svg
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d) => calculatePositionAndWidth(d).x)
        .attr("y", (d, i) => (i + 1) * 50)
        .attr("width", (d) => calculatePositionAndWidth(d).width)
        .attr("height", 40)
        .attr("fill", "#27272e")
        .attr("opacity", 0.6)
        .attr("rx", 10);

      // Render the labels
      svg
        .selectAll("text")
        .data(data)
        .join("text")
        .attr(
          "x",
          (d) =>
            calculatePositionAndWidth(d).x +
            calculatePositionAndWidth(d).width / 2
        )
        .attr("y", (d, i) => 20 + (i + 1) * 50)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text((d) => d.name)
        .attr("fill", "white")
        .attr("font-size", ".75em");

      svg.join("g").attr("transform", `translate(0, ${40})`).call(xAxis);
    }

    return () => {
      if (svgRef.current) {
        d3.select(svgRef.current).selectAll("*").remove();
      }
    };
  }, [data]);

  return (
    <svg
      className="pb-14 font-inter font-bold"
      ref={svgRef}
      width="450"
      height="900"
    />
  );
};

export default VariationGrid;
