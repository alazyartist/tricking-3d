import { useEffect, useRef } from "react";
import { trpc } from "@utils/trpc";
import * as d3 from "d3";
const TrickGraph = () => {
  const { data: tricks } = trpc.trick.findAll.useQuery();
  const ref = useRef(null);

  const transformData = (ud) => {
    const nodes = [];
    const links = [];
    const baseIdToTricks = {};

    ud.forEach((trick) => {
      if (!baseIdToTricks[trick.base_id]) {
        baseIdToTricks[trick.base_id] = [];
      }
      baseIdToTricks[trick.base_id].push(trick);
    });

    Object.keys(baseIdToTricks).forEach((base_id) => {
      const baseNode = {
        id: base_id,
        name: base_id,
        color: "#73e4ff",
        radius: 30 + baseIdToTricks[base_id].length,
        x: ref.current.getBoundingClientRect().width / 2,
        y: ref.current.getBoundingClientRect().height / 2,
      };
      nodes.push(baseNode);

      baseIdToTricks[base_id].forEach((trick) => {
        const trickNode = {
          id: trick.trick_id,
          name: trick.name,
          color: "#EABDFF",
          radius: 30,
          x: ref.current.getBoundingClientRect().width / 2,
          y: ref.current.getBoundingClientRect().height / 2,
        };
        nodes.push(trickNode);

        links.push({
          source: baseNode.id,
          target: trickNode.id,
        });
      });
    });

    return { nodes, links };
  };

  useEffect(() => {
    if (tricks && ref.current !== undefined) {
      const data = transformData(tricks);
      const svg = d3.select(ref.current);
      const width = svg.node().getBoundingClientRect().width;
      const height = svg.node().getBoundingClientRect().height;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      svg
        .join("svg")
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top - margin.bottom);

      const container = svg.append("g").classed("container", true);
      const colors = d3
        .scaleSequential(d3.interpolateRainbow)
        .domain([0, data.nodes.length - 1]);
      const simulation = d3
        .forceSimulation(data.nodes)
        .force("x", d3.forceX().strength(0.025))
        .force("y", d3.forceY().strength(0.025))
        .force("center", d3.forceCenter(width / 2, height / 2).strength(0.1))
        .force("charge", d3.forceManyBody().strength(-15))
        .force(
          "link",
          d3
            .forceLink(data.links)
            //@ts-ignore
            .id((d) => d.id)
            .distance(50)
            .strength(0.22)
        )
        .force(
          "collide",
          d3.forceCollide((d) => d.radius)
        );
      simulation.nodes(data.nodes).on("tick", ticked);
      const drag = d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

      const link = container
        .selectAll(".link")
        .data(data.links)
        .join("line")
        .classed("link", true)
        .attr("stroke", "#FFF")
        .attr("stroke-opacity", 0.6);

      const node = container
        .selectAll(".node")
        .data(data.nodes)
        .join("g")
        .classed("node", true);

      node
        .append("clipPath")
        .attr("id", (d) => `clip-circle-${d.id}`)
        .append("circle")
        .attr("r", (d) => d.radius)
        .attr("cx", 0)
        .attr("cy", 0);

      node
        .append("circle")
        .style("height", 20)
        .style("width", 20)
        .attr("r", (d) => d.radius) // radius of circle
        .style("fill", (d, i) => colors(i));

      node
        .append("text")
        .text((d) => d.name)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("dy", "0.35em")
        .attr("fill", "#000000")
        .attr("font-size", "0.5em")
        .attr("font-family", "sans-serif")
        .attr("pointer-events", "none");

      //tooltip popup with username on hover

      function ticked() {
        node.attr("transform", (d) => `translate(${d.x},${d.y})`);

        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);
      }
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.1).restart();
        console.log(event, d);
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      const zoom = d3
        .zoom()
        .scaleExtent([0.1, 12])
        .on("zoom", (event) => {
          container.attr("transform", event.transform);
        });

      svg.call(zoom, d3.zoomIdentity.scale(0.2));
      node.call(drag);
      console.log(data);
    }
    return () => {
      // cleanup
      d3.select(ref.current).selectAll("*").remove();
    };
  }, [tricks]);
  return <svg className="h-full w-full " ref={ref} id={"trick-graph"} />;
};

export default TrickGraph;
