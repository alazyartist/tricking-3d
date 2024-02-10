import { whichLeg } from "@old_pages/comboMaker/components/ArrayDisplay";
import { trpc } from "@utils/trpc";
import React, { useEffect, useRef } from "react";
import * as terms from "../../../data//Glossary.json";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
import { stances } from "@prisma/client";
import { getStanceColor } from "@utils/styles";
import Link from "next/link";

const StancesV0 = () => {
  const { data: stances } = trpc.trick.findAllStances.useQuery();
  const [leg, setLeg] = React.useState("Both");

  return (
    <>
      <div className="h-full w-[80vw] grid-cols-3 place-content-center place-items-center gap-2 rounded-xl bg-zinc-800 bg-opacity-70 text-zinc-300">
        <h1 className="w-full p-1 text-center">
          Stances using {leg === "Both" ? "Both Legs" : `${leg} leg`}
        </h1>
        <StanceSvg stances={stances} leg={leg} setLeg={setLeg} />
        {/* <div className="flex h-full w-full flex-col place-content-center place-items-center gap-2">
          {stances?.map((stance) => (
            <div
              key={stance.stance_id}
              className={
                "w-fit min-w-[125px] rounded-md bg-zinc-600 bg-opacity-40 p-2"
              }
            >
              <div>{stance.name}</div>
              <div>{whichLeg(stance.leg)}</div>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default StancesV0;

const StanceSvg = ({
  stances,
  leg,
  setLeg,
}: {
  stances: stances[];
  leg: string;
  setLeg: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const svgRef = useRef(null!);
  const [piRef, dimensions] = useMeasure();
  const [piOverlayData, setPiOverlayData] = React.useState(null);
  const { data: bases } = trpc.trick.getBases.useQuery();
  const filteredStances = stances
    ?.filter((s) => s.leg === leg)
    ?.sort((a, b) => {
      //sort by [Backside, Inside,Frontside, Outside]
      return (
        ["Outside", "Frontside", "Inside", "Backside"].indexOf(
          a.name.replace(/Complete|Hyper|Mega|Semi/g, "")
        ) -
        ["Outside", "Frontside", "Inside", "Backside"].indexOf(
          b.name.replace(/Complete|Hyper|Mega|Semi/g, "")
        )
      );
    });
  useEffect(() => {
    if (!stances) return;
    const margin = { top: 30, left: 10, right: 10, bottom: 10 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;
    const dataThreshold = 0.009;
    if (svgRef.current !== undefined) {
      const svg = d3
        .select(svgRef.current)
        .join("svg")
        .attr(
          "viewBox",
          `0 0 ${width + margin.left + margin.right} ${
            height + margin.top + margin.bottom
          }`
        )
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style(
          "transform",
          `translate(${margin.left}px,${dimensions.height / 2 + margin.top})px`
        );

      let radius = d3.min([height, width]);

      svg
        .append("defs")
        .append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "-0 -30 60 60")
        .attr("refX", 5)
        .attr("refY", 0)
        .attr("orient", "auto")
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("xoverflow", "visible")
        .append("svg:path")
        .attr("d", "M 0,-30 L 60 ,0 L 0,30, close")
        .attr("fill", "#d4d4d8")
        .style("stroke", "#d4d4d8") // Add stroke color if needed
        .style("stroke-width", 2) // Stroke width for the arrow border
        .style("stroke-linejoin", "round"); // Round the corners
      // Coordinates for the arrow line
      const x1 = dimensions.width / 2;
      const y1 = dimensions.height / 2;
      const x2 = x1; // Adjust these to change the direction of the arrow
      const y2 = y1 + margin.bottom / 2 + radius / 2; // Adjust these to change the length of the arrow

      // Add the arrow line
      svg
        .append("line")
        .attr("x1", x1)
        .attr("y1", y1 + 15)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "#d4d4d8")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrowhead)");

      const arcGen = d3
        .arc()
        .innerRadius(radius / 8)
        .outerRadius(radius / 2 - 0.5);
      const piGen = d3
        .pie()
        .startAngle(Math.PI / 4)
        .endAngle(2 * Math.PI + Math.PI / 4)
        .sort(null);
      const baseStances = stances
        .map(
          (s) =>
            (s.name === "Backside" ||
              s.name === "Inside" ||
              s.name === "Frontside" ||
              s.name === "Outside") &&
            s
        )
        .filter((t: false | stances) => t !== false)
        .sort((a, b) => {
          //sort by [Backside, Inside,Frontside, Outside]
          return (
            ["Outside", "Frontside", "Inside", "Backside"].indexOf(a.name) -
            ["Outside", "Frontside", "Inside", "Backside"].indexOf(b.name)
          );
        });
      let baseStancePercent = baseStances?.map((t, i) => 90);
      const instructions2 = piGen(baseStancePercent);

      const arcGroup = svg.selectAll("g").data(instructions2).join("g");

      const arc = arcGroup
        .selectAll("path")
        .data(instructions2)
        .attr("class", "slice")
        .join("path")
        .on("click", function (e: React.MouseEvent, d: any) {
          setPiOverlayData(d);
          e.preventDefault();
          const path = d3.select(this);
          const pathNode = path.node() as SVGPathElement;
          pathNode.parentNode.appendChild(pathNode);

          path.transition().attrTween("d", function (d: d3.DefaultArcObject) {
            console.log(d);
            let i, i2;

            if (d.endAngle - d.startAngle < Math.PI) {
              i = d3.interpolate(
                d.startAngle + 0.01,
                d.startAngle - Math.PI / 4
              );
              i2 = d3.interpolate(d.endAngle - 0.01, d.endAngle + Math.PI / 4);
              d.startAngle = d.startAngle - Math.PI / 4;
              d.endAngle = d.endAngle + Math.PI / 4;
            } else {
              i = d3.interpolate(
                d.startAngle + 0.01,
                d.startAngle + Math.PI / 4
              );
              i2 = d3.interpolate(d.endAngle - 0.01, d.endAngle - Math.PI / 4);
              d.startAngle = d.startAngle + Math.PI / 4;
              d.endAngle = d.endAngle - Math.PI / 4;
            }

            return function (t) {
              d.startAngle = i(t);
              d.endAngle = i2(t);
              return arcGen(d as unknown as d3.DefaultArcObject);
            };
          });
        })
        .attr("stroke", "#18181b")
        .style("fill", (d, i) => getStanceColor(filteredStances[i].name))
        .style(
          "transform",
          `translate(${dimensions.width / 2}px , ${dimensions.height / 2}px)`
        )
        .transition()
        .duration(500)
        .attrTween("d", function (d) {
          const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
          return function (t) {
            d.endAngle = i(t);
            return arcGen(d as unknown as d3.DefaultArcObject);
          };
        });

      const text = svg
        .selectAll("text")
        .data(instructions2)
        .join("text")
        .text(function (d, i) {
          // console.log(d, i, tricksArray[i][0]);
          return filteredStances[i].name;
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("transform", function (d, i) {
          //put legend in left top corner
          let c = arcGen.centroid(d as unknown as d3.DefaultArcObject);
          return `translate(${
            dimensions.width / 2 + c[0]
          }px , ${dimensions.height / 2 + c[1]}px)`;
        })
        .style("fill", (d, i) => "#27272e")
        .attr("pointer-events", "none")
        .style("font-family", "Inter")
        .style("font-size", ".6rem");
    }

    return () => {
      if (svgRef.current) {
        d3.select(svgRef.current).selectAll("*").remove();
      }
    };
  }, [dimensions, stances, leg]);

  const activeStance = filteredStances?.[piOverlayData?.index];
  const h1style =
    "flex place-items-center gap-2 rounded-xl bg-zinc-800 bg-opacity-40 p-4 text-sm lg:text-xl";
  return (
    <div className="h-full w-full">
      <div className="relative h-[50vh] min-h-[24vh] w-full" ref={piRef}>
        <svg
          key={"CHMSPieChart"}
          className={"h-[50vh] w-full cursor-pointer"}
          ref={svgRef}
        />
        <div
          onClick={() =>
            setLeg((l) => {
              if (l === "Both") return "Left";
              if (l === "Left") return "Right";
              if (l === "Right") return "Both";
            })
          }
          className={`absolute left-0 top-0 flex h-[48px] w-[48px] cursor-pointer place-content-center place-items-center fill-zinc-500`}
          style={{
            transform: `translate(${dimensions.width / 2 - 24}px, ${
              dimensions.height / 2 - 24
            }px)`,
          }}
        >
          {whichLeg(leg)}
        </div>
      </div>
      {piOverlayData ? (
        <>
          <div className="flex flex-wrap place-content-center gap-4 bg-zinc-800 bg-opacity-40 p-4 text-xl">
            <h1 className={`${h1style}`}>
              <span className="text-zinc-600">Stance: </span>
              <span>{activeStance.stance_id}</span>
            </h1>
            <h1 className={`${h1style}`}>
              <span className="text-zinc-600">Base: </span>
              <span>
                {bases &&
                  bases.find((b) => b.stance_id === activeStance.stance_id)
                    ?.name}
              </span>
            </h1>
            <h1 className={`${h1style}`}>
              <div className="text-zinc-600">Leg: </div>
              <div className="flex flex-col">
                {whichLeg(activeStance.leg)}
                <p className={`w-full text-center text-xs`}>
                  {activeStance.leg}
                </p>
              </div>
            </h1>
            <h1 className={`${h1style}`}>
              <span className="text-zinc-600">Direction: </span>
              <span>{activeStance.direction}</span>
            </h1>
            <h1 className={`${h1style}`}>
              <span className="text-zinc-600">rotation past complete: </span>
              <span>
                {activeStance.stanceRotation == 0
                  ? "0/360"
                  : activeStance.stanceRotation}
              </span>
            </h1>
            {/* <h1 className="rounded-xl flex place-items-center gap-2 bg-zinc-800 bg-opacity-40 p-4 text-xl">
              <span className="text-zinc-600">pointValue: </span>
              <span>{activeStance.pointValue}</span>
            </h1> */}
          </div>
          <Tricks stance={activeStance?.stance_id} />
        </>
      ) : (
        <h1 className="w-full p-1 text-center">
          Select a stance to see more info
        </h1>
      )}
    </div>
  );
};

const Tricks = ({ stance }) => {
  const { data } = trpc.trick.findAll.useQuery();
  const sortTricks = (a, b) => {
    const startsWithDigit = (name) => /^\d/.test(name);
    const aStartsWithDigit = startsWithDigit(a.name);
    const bStartsWithDigit = startsWithDigit(b.name);

    if (aStartsWithDigit && bStartsWithDigit) {
      // Extract leading numbers and compare numerically
      const numA = parseInt(a.name.match(/^\d+/)[0], 10);
      const numB = parseInt(b.name.match(/^\d+/)[0], 10);
      return numA - numB;
    } else if (!aStartsWithDigit && !bStartsWithDigit) {
      // Alphabetic sort for non-digit names
      return a.name.localeCompare(b.name);
    } else {
      // Prioritize non-digit names
      return aStartsWithDigit ? 1 : -1;
    }
  };
  return (
    <div className="minimalistScroll flex h-[25vh] w-full flex-wrap place-content-start place-items-center justify-around gap-2 overflow-y-scroll pb-14 md:h-[33vh]">
      <h1 className="w-full p-1 text-center">
        Tricks taking off from {stance}
      </h1>
      {data &&
        data
          .filter((trick) => trick.stance_id === stance)
          .sort(sortTricks)
          ?.map((trick) => (
            <Link
              href={`/tricks/${trick.trick_id}`}
              className="whitespace-no-wrap w-fit rounded-md bg-zinc-800 bg-opacity-40 p-2 hover:bg-zinc-600"
            >
              {trick.name}
            </Link>
          ))}
    </div>
  );
};
