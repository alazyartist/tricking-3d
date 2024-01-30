import { useEffect, useRef, useState } from "react";
import { trpc } from "@utils/trpc";
import * as d3 from "d3";
import { useForm } from "react-hook-form";
const TrickGraph = () => {
  const { data: tricks } = trpc.trick.findAll.useQuery();
  const ref = useRef(null);
  const color = {
    Backside: `#07b9e9`,
    Backflip: `#07b9e9`,
    VertB: `#07b9e9`,
    Inside: `#06d8b7`,
    InsideFlip: `#06d8b7`,
    Outside: `#10b35d`,
    OutsideFlip: `#10b35d`,
    Frontside: `#003eb3`,
    Frontflip: `#003eb3`,
    VertF: `#003eb3`,
    BacksideComplete: `#7EE0FB`,
    Gainer: `#7EE0FB`,
    Lotus: `#75FBB3`,
    OutsideComplete: `#75FBB3`,
    Raiz: `#2db36c`,
    OutsideSemi: `#2db36c`,
    FrontsideSemi: `#2b5ab3`,
    WebsterR: `#2b5ab3`,
    FrontsideMega: `#4171ca`,
    Webster: `#4171ca`,
    InsideMega: `#40baa6`,
    Aerial: `#40baa6`,
    GMS: `#5ed8c5`,
    InsideHyper: `#5ed8c5`,
    GainerR: `#6bcee9`,
    BacksideHyper: `#6bcee9`,
  };
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  // Function to handle node click
  const handleNodeClick = (node) => {
    setExpandedNodes((prevExpandedNodes) => {
      console.log("nodeclick", node);
      const newExpandedNodes = new Set(prevExpandedNodes);
      if (newExpandedNodes.has(node.data.id)) {
        newExpandedNodes.delete(node.data.id); // Contract node
      } else {
        newExpandedNodes.add(node.data.id); // Expand node
      }
      return newExpandedNodes;
    });
  };

  const transformData = (ud) => {
    const nodes = [];
    const links = [];
    const baseIdToTricks = {};
    const width = ref.current.getBoundingClientRect().width;
    const height = ref.current.getBoundingClientRect().height;

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
        color: expandedNodes.has(base_id) ? "#fff" : color[base_id],
        r: expandedNodes.has(base_id)
          ? 35
          : 55 + baseIdToTricks[base_id].length,
        x: width / 2,
        y: height / 2,
      };
      nodes.push(baseNode);
      baseIdToTricks[base_id].forEach((trick) => {
        const trickNode = {
          id: trick.trick_id,
          name: trick.name,
          trick: trick,
          color: color[trick.takeoffStance],
          r: 50,
          x: width / 2,
          y: height / 2,
        };
        nodes.push(trickNode);

        links.push({
          source: baseNode.id,
          target: trickNode.id,
        });
      });
    });
    const createPackLayout = (_data) => {
      const groupedByBaseId = _data.reduce((acc, trick) => {
        if (!acc[trick.base_id]) {
          acc[trick.base_id] = [];
        }
        acc[trick.base_id].push({
          ...trick,
          color: color[trick.takeoffStance],
          // children: trick.variations.map((variation) => ({
          //   ...variation.variation,
          //   color: "#FC8F82",
          // })),
        });
        return acc;
      }, {});

      const adjustColor = (c) => {
        const color = d3.color(c);
        color.opacity = 0.72;
        return color;
      };
      // Create hierarchical structure
      const root = {
        name: "Tricks",
        color: "#27272e",
        children: Object.entries(groupedByBaseId).map(([baseId, tricks]) => ({
          id: baseId,
          name: baseId,
          color: adjustColor(color[baseId]), // Replace with desired color for base_id nodes
          children: tricks,
        })),
      };
      const pack = d3.pack().size([width, height]).padding(5);

      const hierarchy = d3
        .hierarchy(root)
        .sum((d) => 1)
        .sort((a, b) => b.value - a.value);

      const nodes = pack(hierarchy).descendants();

      return nodes;
    };
    const packNodes: d3.HierarchyCircularNode<
      Partial<{
        name: string;
        color: string;
        children: {
          name: string;
          color: d3.RGBColor | d3.HSLColor;
          children: unknown;
        }[];
      }>
    >[] = createPackLayout(ud);

    console.log(expandedNodes);
    const filteredNodes = nodes.filter(
      (node) =>
        expandedNodes.has(node?.trick?.base_id) || node.id in baseIdToTricks
    );
    const filteredLinks = links.filter((link) =>
      filteredNodes.some((node) => node.id === link.target)
    );
    // console.log(packNodes);

    return { nodes: filteredNodes, links: filteredLinks, packNodes };
  };

  const { register, handleSubmit, getValues } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const [filter, setFilter] = useState("");
  const filterTricks = (tricks, filter) => {
    if (filter === "") return tricks;
    return tricks.filter((trick) => {
      const regex = new RegExp(filter, "gi");
      return trick.name.toLowerCase().match(regex);
    });
  };

  useEffect(() => {
    if (tricks && ref.current !== undefined) {
      const data = transformData(filterTricks(tricks, filter));
      const svg = d3.select(ref.current);
      const width = svg.node().getBoundingClientRect().width;
      const height = svg.node().getBoundingClientRect().height;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      svg
        .join("svg")
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top - margin.bottom);

      const container = svg.append("g").classed("container", true);

      // const packNode = container
      //   .selectAll(".pack-node")
      //   .data(data.packNodes)
      //   .join("g")
      //   .classed("pack-node", true)
      //   .attr("transform", (d) => `translate(${d.x},${d.y})`);
      // packNode
      //   .append("circle")
      //   .attr("r", (d) => d.r)
      //   .attr("fill", (d) => d.data.color);
      // packNode
      //   .append("text")
      //   .text((d) => d.data.name)
      //   .attr("text-anchor", "middle")
      //   .attr("alignment-baseline", "middle")
      //   .attr("dy", "0.35em")
      //   .attr("fill", "#000000")
      //   .attr("font-size", "0.5em")
      //   .attr("font-family", "sans-serif")
      //   .attr("pointer-events", "none");
      // const packNode = container
      //   .selectAll(".bg-node")
      //   .data(data.packNodes)
      //   .join("g")
      //   .classed("pack-node", true)
      //   .attr("transform", (d) => `translate(${d.x},${d.y})`);
      // packNode
      //   .append("circle")
      //   .attr("r", (d) => d.r)
      //   .attr("fill", (d) => d.data.color);

      const simulation = d3
        .forceSimulation(data.packNodes.filter((d) => d.depth > 1))
        .force("y", d3.forceY(data.packNodes[0].y).strength(0.0155))
        .force("x", d3.forceX(data.packNodes[0].x).strength(0.0125))
        .force(
          "collide",
          d3.forceCollide((d) => d.r + 5)
        )
        // .force(
        //   "link",
        //   d3
        //     .forceLink(data.links)
        //     //@ts-ignore
        //     .id((d) => d.id)
        //     .distance(55)
        //     .strength(0.22)
        // )
        .force(
          "charge",
          d3
            .forceManyBody()
            .strength(-15)
            .distanceMax(height / 2)
        );
      simulation
        .nodes(data.packNodes.filter((d) => d.depth > 1))
        .on("tick", ticked);
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
        .data(data.packNodes[0].descendants())
        .join("g")
        .classed("node", true);

      node
        .append("clipPath")
        .attr("id", (d) => `clip-circle-${d.id}`)
        .append("circle")
        .attr("r", (d) => d.r)
        .attr("cx", 0)
        .attr("cy", 0);

      node
        .append("circle")
        .style("height", 20)
        .style("width", 20)
        .attr("r", (d) => d.r) // radius of circle
        .style("fill", (d, i) => d.data.color)
        // .style("fill", (d, i) => d.color)
        .on("click", (event, d) => {
          console.log(d);
        });
      // .style("fill", (d, i) => colors(i));

      node
        .append("text")
        .text((d) => d.data.name)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("dy", "0.35em")
        .attr("fill", "#000000")
        .attr("font-size", "0.5em")
        .attr("font-family", "sans-serif")
        .attr("pointer-events", "none");

      node.on("click", (event, d) => {
        handleNodeClick(d);
      });
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
        .scaleExtent([0.2, 12])
        .on("zoom", (event) => {
          container.attr("transform", event.transform);
        });

      svg.call(zoom);
      node.call(drag);
      // console.log(data);
    }

    return () => {
      // cleanup
      d3.select(ref.current).selectAll("*").remove();
    };
  }, [tricks, filter, expandedNodes]);

  return (
    <div className="h-full w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("trick")}
          onChange={(e) => setFilter(e.target.value)}
          className="absolute left-2 top-2 h-10 w-[222px] rounded-md bg-zinc-800 p-2 text-xl text-zinc-300"
          placeholder="Search for a trick"
        />
      </form>
      <svg className="h-full w-full " ref={ref} id={"trick-graph"} />
    </div>
  );
};

export default TrickGraph;
