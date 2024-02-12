import { useEffect, useRef, useState } from "react";
import { trpc } from "@utils/trpc";
import * as d3 from "d3";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MdClose } from "@data/icons/MdIcons";
const ClaimedTrickGraph = ({ claimedTricks, close }) => {
  const { data: tricks } = trpc.trick.findAll.useQuery();
  const ref = useRef(null);
  const color = {
    Backside: `#07b9e9`,
    Backflip: `#07b9e9`,
    VertB: `#07b9e9`,
    Inside: `#06d8b7`,
    Insideflip: `#06d8b7`,
    Outside: `#10b35d`,
    Outsideflip: `#10b35d`,
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
    const darken = (c) => {
      const color = d3.color(c);
      color.brighter(0.5);
      return color;
    };
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
          y: height / 2 - 60,
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
          color: claimedTricks?.some((t) => t === trick.name)
            ? "#ff227b"
            : color[trick.takeoffStance],
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
      const pack = d3.pack().size([2500, 2500]).padding(10);

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
        displayName: string;
        color: string;
        children: {
          name: string;
          displayName: string;
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

      const simulation = d3
        .forceSimulation(data.packNodes.filter((d) => d.depth === 1))
        .force("y", d3.forceY(data.packNodes[0].y).strength(0.00155))
        .force("x", d3.forceX(data.packNodes[0].x).strength(0.00125))
        .force(
          "collide",
          d3.forceCollide((d) => (d.depth < 3 ? d.r + 5 : 0))
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
        .force("charge", d3.forceManyBody().strength(-9))
        .force(
          "containment",
          forceContainment(data.packNodes.filter((d) => d.depth >= 2))
        );
      simulation
        .nodes(data.packNodes.filter((d) => d.depth > 1))
        .on("tick", ticked);
      const simulation2 = d3
        .forceSimulation(data.packNodes.filter((d) => d.depth === 1))
        .force("y", d3.forceY(data.packNodes[0].y).strength(0.0155))
        .force("x", d3.forceX(data.packNodes[0].x).strength(0.0125))
        .force(
          "collide",
          d3.forceCollide((d) => d.r + 5)
        )
        .force(
          "charge",
          d3
            .forceManyBody()
            .strength(-15)
            .distanceMax(height / 2)
        );

      simulation2
        .nodes(data.packNodes.filter((d) => d.depth === 1))
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
        .attr("r", (d) => d.r)
        .style("fill", (d, i) => d.data.color)
        .on("click", (event, d) => {
          console.log(d);
        });

      node
        .append("text")
        .text((d) => d.data.displayName || d.data.name)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("dy", "0.35em")
        .attr("fill", "#000000")
        .attr("font-size", "0.45em")
        .attr("font-family", "sans-serif")
        .attr("pointer-events", "none");

      node.on("click", (event, d) => {
        // handleNodeClick(d);
        zoomToNode(event, d);
      });
      // if (width > 600) {
      //   const legend = svg
      //     .selectAll(".legend")
      //     .data(data.packNodes.filter((d) => d.depth === 1))
      //     .join("g")
      //     .classed("legend", true);

      //   legend
      //     .append("rect")
      //     .attr("rx", 25)
      //     .style("fill", "#27272e")
      //     .attr("width", 100)
      //     .attr("height", 50)
      //     .attr("x", 25)
      //     .attr("y", (d, i) => 50 + (i + 1) * 55);
      //   legend
      //     .append("rect")
      //     .attr("rx", 25)
      //     .style("fill", (d, i) => d.data.color)
      //     .attr("width", 100)
      //     .attr("height", 50)
      //     .attr("x", 25)
      //     .attr("y", (d, i) => 50 + (i + 1) * 55)
      //     .on("click", (event, d) => {
      //       zoomToNode(event, d);
      //     });

      //   legend
      //     .append("text")
      //     .text((d) => d.data.name)
      //     .attr("x", 75)
      //     .attr("y", (d, i) => 75 + (i + 1) * 55)
      //     .attr("text-anchor", "middle")
      //     .attr("alignment-baseline", "middle")
      //     .attr("dy", "0.35em")
      //     .attr("fill", "#fff")
      //     .attr("font-size", "0.85em")
      //     .attr("font-family", "sans-serif")
      //     .attr("pointer-events", "none");
      // }
      // if (width < 600) {
      //   const legend = svg
      //     .selectAll(".legend")
      //     .data(data.packNodes.filter((d) => d.depth === 1))
      //     .join("g")
      //     .classed("legend", true);

      //   legend
      //     .append("rect")
      //     .attr("rx", 25)
      //     .style("fill", "#27272e")
      //     .attr("width", 70)
      //     .attr("height", 35)
      //     .attr("y", (d, i) =>
      //       i < 5 ? height - 175 : i < 10 ? height - 125 : height - 75
      //     )
      //     .attr("x", (d, i) => 5 + (i % 5) * 75);
      //   legend
      //     .append("rect")
      //     .attr("rx", 25)
      //     .style("fill", (d, i) => d.data.color)
      //     .attr("width", 70)
      //     .attr("height", 35)
      //     .attr("y", (d, i) =>
      //       i < 5 ? height - 175 : i < 10 ? height - 125 : height - 75
      //     )
      //     .attr("x", (d, i) => 5 + (i % 5) * 75)
      //     .on("click", (event, d) => {
      //       zoomToNode(event, d);
      //     });

      //   legend
      //     .append("text")
      //     .text((d) => d.data.name)
      //     .attr("y", (d, i) =>
      //       i < 5 ? height - 160 : i < 10 ? height - 110 : height - 60
      //     )
      //     .attr("x", (d, i) => 40 + (i % 5) * 75)
      //     .attr("text-anchor", "middle")
      //     .attr("alignment-baseline", "middle")
      //     .attr("dy", "0.35em")
      //     .attr("fill", "#fff")
      //     .attr("font-size", "0.75em")
      //     .attr("font-family", "sans-serif")
      //     .attr("pointer-events", "none");
      // }

      function ticked() {
        node.attr("transform", (d) => `translate(${d.x},${d.y})`);

        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);
      }
      function dragstarted(event, d) {
        if (!event.active) {
          simulation.alphaTarget(0.1).restart();
          simulation2.alphaTarget(0.1).restart();
        }
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragended(event, d) {
        if (!event.active) {
          simulation.alphaTarget(0);
          simulation2.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      }

      function forceContainment(nodes) {
        function force(alpha) {
          for (const node of nodes) {
            if (node.depth > 1) {
              const parentNode = node.parent;

              // Define boundaries (e.g., within a certain radius of the parent)
              const radius = parentNode.r - node.r - 5; // Example radius
              const dx = node.x - parentNode.x;
              const dy = node.y - parentNode.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              // Adjust position if outside the boundary
              if (distance > radius) {
                node.x = parentNode.x + (dx / distance) * radius;
                node.y = parentNode.y + (dy / distance) * radius;
              }
            }
          }
        }

        return force;
      }

      function zoomToNode(event, d) {
        const zoomLevel = Math.min(width, height) / (2 * d.r);
        const centerX = width / 2;
        const centerY = height / 2;
        const mobileCenterY = height / 2 - 60;
        const adjustedX = centerX - d.x * zoomLevel;
        const adjustedY =
          (width > 600 ? centerY : mobileCenterY) - d.y * zoomLevel;
        const zoomTo = d3.zoomIdentity
          .translate(adjustedX, adjustedY)
          .scale(zoomLevel);
        svg.call(zoom).transition().duration(850).call(zoom.transform, zoomTo);
      }

      const largestNode = data.packNodes.reduce(
        (max, node) => (node.r > max.r ? node : max),
        data.packNodes[0]
      );
      const zoomLevel = Math.min(width, height) / (2 * largestNode.r);
      const centerX = width / 2;
      const centerY = height / 2;
      const adjustedX = centerX - largestNode.x * zoomLevel;
      const adjustedY = centerY - largestNode.y * zoomLevel;
      const initialTransform = d3.zoomIdentity
        .translate(adjustedX, adjustedY)
        .scale(zoomLevel);

      const zoom = d3
        .zoom()
        .scaleExtent([0.1, 12])
        .on("zoom", (event) => {
          container.attr("transform", event.transform);
        });

      svg.call(zoom).call(zoom.transform, initialTransform);
      //@ts-ignore
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
      <button
        onClick={() => close()}
        className={"absolute left-2 top-4 text-xl"}
        type="button"
      >
        <MdClose />
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("trick")}
          onChange={(e) => setFilter(e.target.value)}
          className="absolute left-10 top-2 h-10 w-[222px] rounded-md bg-zinc-800 p-2 text-xl text-zinc-300"
          placeholder="Search for a trick"
        />
      </form>
      <svg className="h-full w-full " ref={ref} id={"trick-graph"} />
    </div>
  );
};

export default ClaimedTrickGraph;
