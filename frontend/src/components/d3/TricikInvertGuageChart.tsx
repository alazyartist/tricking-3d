import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
const TrickInvertGaugeChart = ({ data }) => {
  const svgRef = useRef();
  const [piRef, dimensions] = useMeasure();
  useEffect(() => {
    const margin = { top: 30, left: 10, right: 10, bottom: 10 };
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
      //if you want half circle put below code after d3.pie() above
      let tricksArray = Array.from(
        d3.group(data, (d: any) => (d.type === "Trick" ? d.trickType : d.type))
      );
      let trickPercent = tricksArray?.map((t, i) => t[1]?.length / data.length);
      const instructions = piGen(trickPercent);
      const colors = d3
        .scaleSequential(d3.interpolateRgbBasis(["#50d9f0", "#ff4b9f"]))
        .domain([0, tricksArray.length + 1]);

      const arc = svg
        .selectAll("path")
        .data(instructions)
        .attr("class", "slice")
        .join("path")
        .attr("stroke", "#18181b")
        .style("fill", (d, i) =>
          tricksArray[i][0] === "Transition"
            ? colors(tricksArray.length + 1)
            : tricksArray[i][0] === "Invert"
            ? colors(0)
            : colors(i)
        )

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
            dimensions.width / 2 + c[0] - 12
          }px , ${dimensions.height / 2 + margin.top + c[1] + 5}px)`;
        })
        .join("text")
        .text((d, i) => tricksArray?.[i][0])
        .style("fill", (d, i) =>
          tricksArray[i][0] === "Kick" ? "#d4d4d8" : "#18181b"
        )
        .style("font-family", "Inter")
        .style("font-weight", "bold")
        .style("font-size", "12px");
      //add text "Trick/Invert" underneath chart
      svg
        .selectAll("text2")
        .data([0])
        .join("text")
        .text("Trick/Invert")
        .attr("text-anchor", "middle")
        .style(
          "transform",
          `translate(${dimensions.width / 2}px, ${dimensions.height}px)`
        )
        .style("font-size", "12px")
        .style("fill", "#d4d4d8");
    }
  }, [data, dimensions]);
  return (
    <div ref={piRef} className="h-full w-full">
      <svg key={"pichartKey"} className="h-full w-full" ref={svgRef} />
    </div>
  );
};

export default TrickInvertGaugeChart;
