import React, { useEffect, useRef } from "react";
import useMeasure from "react-use-measure";
import * as d3 from "d3";
const PowerAverageLineChart = ({ data, chainMap, varietyMap }) => {
  const svgRef = useRef();
  const [lRef, dimensions] = useMeasure();

  useEffect(() => {
    const margin = { top: 2, left: 0, right: 0, bottom: 10 };
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
      const max = d3.max(data, (d: any, i) => {
        return parseFloat(
          d.pointValue +
            (chainMap
              ?.filter((c) => c[0] === i)
              .map((c) => {
                if (c[0] === i) return c[1];
              })[0] || 0) +
            (varietyMap
              ?.filter((c) => c[0] === i)
              .map((c) => {
                if (c[0] === i) return c[2];
              })[0] || 0)
        );
      });
      const xScale = d3
        .scaleLinear()
        .domain([0, data.length + 1])
        .range([0, width]);
      const yScale = d3
        .scaleLinear()
        .domain([0, max + 2])
        .range([height, 0]);
      //   const colorScale = d3
      //     .scaleLinear(d3.interpolateRgbBasis(["#ff4b9f", "#50d9f0"]))
      //     .domain(d3.extent(data, (d) => d.pointValue));
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
          { offset: "70%", color: "#50d9f0" },
          { offset: "100%", color: "#50d9f0" },
        ])
        .enter()
        .append("stop")
        .attr("offset", function (d) {
          return d.offset;
        })
        .attr("opacity", function (d) {
          return d.offset;
        })
        .attr("stop-color", function (d) {
          return d.color;
        });
      svg
        .append("path")
        .datum([{ pointValue: 0 }, ...data, { pointValue: 0 }])
        .join("path")
        .attr("fill", "none")
        .attr("stroke", "#ff4b9f")
        .attr("opacity", "30%")
        .attr("stroke-width", 3.7)
        .attr(
          "d",
          d3
            .line()
            .x((d, i) => xScale(i))
            .y((d, i) => yScale(100))
        );

      svg
        .append("path")
        .datum([{ pointValue: 0 }, ...data, { pointValue: 0 }])
        .join("path")
        .attr("fill", "none")
        .attr("stroke", "#50d9f0")
        .attr("opacity", "30%")
        .attr("stroke-width", 2.7)
        .attr(
          "d",
          d3
            .line()
            .x((d, i) => xScale(i))
            .y((d, i) => yScale(15))
        );

      const pointline = svg
        .append("path")
        .datum([{ pointValue: 0 }, ...data, { pointValue: 0 }])
        .join("path")
        .attr("fill", "none")
        .attr("stroke", "url(#line-gradient)")
        .attr("stroke-width", 1.7)
        .attr(
          "d",
          d3
            .line()
            .x((d, i) => xScale(i))
            .y((d: any, i) => {
              return yScale(
                d.pointValue +
                  (chainMap
                    ?.filter((c) => c[0] === i)
                    .map((c) => {
                      if (c[0] === i) return c[1];
                    })[0] || 0) +
                  (varietyMap
                    ?.filter((c) => c[0] === i)
                    .map((c) => {
                      if (c[0] === i) return c[2];
                    })[0] || 0)
              );
            })
            .curve(d3.curveCatmullRom)
        );

      return () => {
        svg.remove();
      };
    }
  }, [data, dimensions]);

  return (
    <div key={`${data.length}`} ref={lRef} className="h-full w-full">
      <svg key={"key"} className="h-full w-full " ref={svgRef} />
    </div>
  );
};

export default PowerAverageLineChart;
