import React, { useEffect, useRef } from "react";
import useMeasure from "react-use-measure";
import * as d3 from "d3";
import { combos, sessiondata } from "@prisma/client";
import { SessionsById } from "types/trpc";
type LineChartProps = {
  data: SessionsById;
  normalized?: number;
  colorized?: number;
};
const SessionLineChart: React.FC<LineChartProps> = ({
  data,
  normalized,
  colorized,
}) => {
  const svgRef = useRef(null!);
  const [lRef, dimensions] = useMeasure();

  useEffect(() => {
    const margin = { top: 0, left: 0, right: 0, bottom: 0 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const chartData = data?.map((s) => {
      const sessionTotal = s.SessionData.reduce((a, b) => {
        return a + b.totalScore ?? 0;
      }, 0);
      return { totalScore: sessionTotal };
    });
    console.log(chartData);
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
      const max = d3.max(chartData, (d: any) => d.totalScore as number);
      const xScale = d3
        .scaleLinear()
        .domain([0, chartData.length + 1])
        .range([0, width]);
      const yScale = d3
        .scaleLinear()
        .domain([0, !!normalized ? (normalized as number) : (max as number)])
        .range([height, 0]);

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
        .datum([{ totalScore: 0 }, ...chartData, { totalScore: 0 }])
        .append("path");
      svg
        .append("path")
        .datum([{ totalScore: 0 }, ...data, { totalScore: 0 }])
        .join("path")
        .attr("fill", "none")
        .attr("stroke", "#ff4b9f")
        .attr("opacity", "30%")
        .attr("stroke-width", 3.7)
        .attr(
          "d",
          //@ts-ignore
          d3
            .line()
            .x((d, i) => xScale(i))
            .y((d, i) => yScale(2000))
        );

      svg
        .append("path")
        .datum([{ totalScore: 0 }, ...data, { totalScore: 0 }])
        .join("path")
        .attr("fill", "none")
        .attr("stroke", "#50d9f0")
        .attr("opacity", "30%")
        .attr("stroke-width", 2.7)
        .attr(
          "d",
          //@ts-ignore
          d3
            .line()
            .x((d, i) => xScale(i))
            .y((d, i) => yScale(500))
        );

      line
        .attr("fill", "none")
        .attr(
          "stroke",
          colorized ? d3.interpolateRainbow(colorized) : "url(#line-gradient)"
        )
        .attr("stroke-width", 1.7)
        .attr(
          "d",
          //@ts-ignore
          d3
            .line()
            .x((d, i) => xScale(i))
            .y((d: any, i) => {
              // let a = `x:${xScale(i)} y:${yScale(d.ClipLabel.pointValue)}`;
              // console.log(d?.totalScore || 0);
              return yScale(d?.totalScore || 0);
            })
            .curve(d3.curveCatmullRom)
        );
    }

    return () => {
      //cleanup svg
      if (svgRef.current) {
        console.log("unmounting");
        d3.select(svgRef.current).selectAll("*").remove();
      }
    };
    // console.log("paclc", data);
  }, [data, dimensions]);

  return (
    <div ref={lRef} className="h-28 w-full">
      <svg key={"sessionLineChart1"} className="h-full w-full" ref={svgRef} />
    </div>
  );
};

export default SessionLineChart;
