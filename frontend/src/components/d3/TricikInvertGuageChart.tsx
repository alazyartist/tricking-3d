import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
const TrickInvertGaugeChart = ({ data }) => {
  const svgRef = useRef();
  const [piRef, dimensions] = useMeasure();
  useEffect(() => {
    const margin = { top: 10, left: 10, right: 10, bottom: 10 };
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

      console.log(dimensions.width / 2);
      const arcGen = d3
        .arc()
        .innerRadius(dimensions.height / 5)
        .outerRadius(height / 2);
      const piGen = d3
        .pie()
        // .startAngle(Math.PI * -0.5)
        // .endAngle(Math.PI * 0.5)
        .sort(null);
      let tricksArray = Array.from(
        d3.group(data, (d) => (d.type === "Trick" ? d.trickType : d.type))
      );
      let trickPercent = tricksArray?.map((t, i) => t[1]?.length / data.length);
      console.log(tricksArray, trickPercent);
      //   const instructions = piGen(ea);
      const instructions = piGen(trickPercent);
      console.log(instructions);
      const colors = d3
        .scaleSequential(
          d3.interpolateRgbBasis(["#ff4b9f", "#50d9f0"])
          // d3.interpolateRainbow
        )
        .domain([0, tricksArray.length - 1]);

      const arc = svg
        .selectAll("path")
        .data(instructions)
        .attr("class", "slice")
        .join("path")
        .attr("stroke", "#18181b")
        .style("fill", (d, i) => colors(i))

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
            dimensions.width / 2 + c[0] - 9
          }px , ${dimensions.height / 2 + margin.top + c[1] + 3}px)`;
        })
        .join("text")
        .text((d, i) => tricksArray?.[i][0])
        .style("color", "#d4d4d4")
        .style("font-size", "10px");
    }

    console.log(dimensions);
  }, [data, dimensions]);
  return (
    <div ref={piRef} className="h-full w-full">
      <svg key={"pichartKey"} className="h-full w-full" ref={svgRef} />
    </div>
  );
};

export default TrickInvertGaugeChart;
