import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
const TransitionsBarChart = ({ data }) => {
  const svgRef = useRef();
  const [piRef, dimensions] = useMeasure();

  useEffect(() => {
    const margin = { top: 50, left: 10, right: 10, bottom: 20 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;
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

      let tricksArray = Array.from(d3.group(data, (d: any) => d.name));
      let trickPercent = tricksArray?.map((t, i) => t[1]?.length / data.length);
      console.log("%", trickPercent);
      console.log("%", tricksArray);
      const x = d3
        .scaleBand()
        .domain(tricksArray.map((d) => d[0]))
        .range([0, width])
        .padding(0.1);
      const y = d3
        .scaleLinear()
        .domain([0, 1])
        .range([height + margin.top, 0]);
      // const instructions = piGen(trickPercent);
      const colors = d3
        .scaleSequential(d3.interpolateRgbBasis(["#50d9f0", "#ff4b9f"]))
        .domain([0, tricksArray.length - 1]);

      svg
        .selectAll(".bar")
        .data(tricksArray)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d[0]))
        .attr("width", x.bandwidth())
        .attr("y", (d, i) => y(trickPercent[i]))
        .attr("height", (d, i) => height + margin.top - y(trickPercent[i]))
        .attr("fill", (d, i) => colors(i));
      // const arc = svg
      //   .selectAll("path")
      //   .data(instructions)
      //   .attr("class", "slice")
      //   .join("path")
      //   .attr("stroke", "#18181b")
      //   .style("fill", (d, i) => colors(i))

      //   .style(
      //     "transform",
      //     `translate(${dimensions.width / 2}px , ${
      //       dimensions.height / 2 + margin.top
      //     }px)`
      //   )
      //   .transition()
      //   .duration(2000)
      //   .attrTween("d", function (nextI) {
      //     //@ts-ignore
      //     const interpolator = d3.interpolate(this?.lastI, nextI);
      //     //@ts-ignore
      //     this.lastI = interpolator(0);
      //     return function (t) {
      //       //@ts-ignore
      //       return arcGen(interpolator(t));
      //     };
      //   });
      // svg
      //   .selectAll("text")
      //   .data(instructions)
      //   .style("transform", function (d) {
      //     //@ts-ignore
      //     let c = arcGen.centroid(d);
      //     return `translate(${
      //       dimensions.width / 2 + c[0] - 9
      //     }px , ${dimensions.height / 2 + margin.top + c[1] + 3}px)`;
      //   })
      //   .join("text")
      //   .text((d, i) => tricksArray?.[i][0])
      //   .style("color", "#d4d4d4")
      //   .style("font-size", "10px");
      const colorLegendScale = d3
        .scaleBand()
        .domain(tricksArray.map((t) => t[0]))
        .range([0, dimensions.width])
        .padding(0);

      svg
        .selectAll("text")
        .data(trickPercent)
        .join("text")
        .text((d, i) => tricksArray?.[i][0])
        .attr("x", (d, i) => `${colorLegendScale(tricksArray?.[i][0])}px`)
        .attr("y", `${margin.top / 2}`)
        .style("fill", (d, i) => colors(i))
        .style("font-size", "10px");
    }
  }, [data, dimensions]);
  return (
    <div ref={piRef} className="h-full w-full">
      <svg key={"pichartKey"} className="h-full w-full" ref={svgRef} />
    </div>
  );
};

export default TransitionsBarChart;
