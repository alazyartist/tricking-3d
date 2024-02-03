import { useEffect, useRef } from "react";
import { trpc } from "@utils/trpc";
import * as d3 from "d3";
import { SimulationLinkDatum, SimulationNodeDatum } from "d3";
const DashUserGraph = ({ uuid }) => {
  const { data: users } = trpc.userDB.findAll.useQuery();
  const ref = useRef(null);
  const transformData = (ud) => {
    const nodes = [];
    const links = [];

    ud.forEach((u) => {
      nodes.push({
        id: u.id,
        uuid: u.uuid,
        image: u.profilePic,
        username: u.username,
        radius: u.captures.length > 0 ? 30 + u.captures.length : 20,
        x: ref.current.getBoundingClientRect().width / 2,
        y: ref.current.getBoundingClientRect().height / 2,
      });
      if (u.uuid === uuid) {
        u.captures.forEach((c) => {
          links.push({ source: c.user_id, target: c.captured_id });
        });
        u.captured_me.forEach((c) => {
          links.push({ source: c.user_id, target: c.captured_id });
        });
      }
    });
    return { nodes, links };
  };

  useEffect(() => {
    if (users && ref.current !== undefined) {
      const data = transformData(users);
      const svg = d3.select(ref.current);
      const width = svg.node().getBoundingClientRect().width;
      const height = svg.node().getBoundingClientRect().height;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      svg
        .join("svg")
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top - margin.bottom);

      const container = svg.append("g").classed("container", true);
      const captures = users.find((u) => u.uuid === uuid).captures;
      const captured_me = users.find((u) => u.uuid === uuid).captured_me;
      const simulation = d3
        .forceSimulation(data.nodes)

        .force("charge", d3.forceManyBody().strength(-5))
        .force(
          "link",
          d3
            .forceLink(data.links)
            //@ts-ignore
            .id((d) => d.id)
            .distance(5)
            .strength(0.08)
        )
        .force("x", d3.forceX(width / 2).strength(0.015))
        .force(
          "y",
          d3.forceY(-(height - margin.top - margin.bottom) / 2).strength(0.015)
        )
        .force(
          "collide",
          d3.forceCollide((d) => d.radius + 5)
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
        .attr("stroke-width", 3)
        .attr("stroke", (d) =>
          users.find((u) => u.uuid === uuid).username === d.target.username
            ? "#006eff"
            : "#d4d4d8"
        )
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
        .style("fill", "#27272e");

      node
        .append("image")
        .attr("xlink:href", (d) =>
          captures.some((c) => c.captured_id === d.id) ||
          captured_me.some((c) => c.user_id === d.id) ||
          uuid === d.uuid
            ? d.image ?? "http://trickedex.app/images/noimg.jpeg"
            : null
        )
        .attr("x", (d) => -d.radius)
        .attr("y", (d) => -d.radius)
        .attr("width", (d) => d.radius * 2)
        .attr("height", (d) => d.radius * 2)
        .attr("clip-path", (d) => `url(#clip-circle-${d.id})`);

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
  }, [users]);
  return (
    <div className="h-[35vh] w-[80vw] md:h-[55vh] md:w-[55vw]">
      <svg className="h-full w-full " ref={ref} id={"user-graph"} />
    </div>
  );
};

export default DashUserGraph;
