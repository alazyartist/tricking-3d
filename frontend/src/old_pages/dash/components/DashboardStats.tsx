import TransitionsBarChart from "@components/d3/TransitionsBarChart";
import TrickPieChart from "@components/d3/TrickPieChart";
import { sessiondata, transitions, tricks } from "@prisma/client";
import { trpc } from "@utils/trpc";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import useClickOutside from "@hooks/useClickOutside";
import { IoMdDownload } from "react-icons/io";
import { devNull } from "os";

const DashboardStats = ({ uuid }) => {
  const { data: sessions, isLoading } =
    trpc.sessionsummaries.getSessionsById.useQuery({
      uuid: uuid,
    });
  console.log(sessions);
  const [seeDownloadStats, setSeeDownloadStats] = useState(false);
  const [showUniqueTricks, setShowUniqueTricks] = useState(false);
  if (isLoading) return <div>Gathering Your Stats, just a sec...</div>;
  const tricks = sessions
    ?.map((session) =>
      session.SessionData.map((data) => {
        const ca = data.ClipLabel?.comboArray as (tricks | transitions)[];

        return ca
          ?.map((trick) => trick)
          .filter((trick) => trick.type !== "Transition");
      })
    )
    .flat(2);
  const transitions = sessions
    ?.map((session) => {
      return session.SessionData.map((data) => {
        const ca = data.ClipLabel?.comboArray as (tricks | transitions)[];
        return ca
          ?.map((trick) => trick)
          .filter((trick) => trick.type === "Transition");
      });
    })
    .flat(2);
  const uniqueTricks = [...new Set(tricks?.map((trick) => trick?.name))];
  const uniqueTricksGroup = Array.from(d3.group(tricks, (d) => d?.name))
    .map(([key, value]) => ({ name: key, count: value.length }))
    .sort((a, b) => b.count - a.count);
  console.log(tricks.length, uniqueTricks.length, uniqueTricksGroup);
  return (
    <div className="minimalistScroll lg:no-scrollbar h-full max-h-[60vh] w-full overflow-y-scroll rounded-md bg-zinc-900 bg-opacity-70 lg:h-[60vh] lg:max-h-[65vh]">
      <h1 className="p-2 text-zinc-200">DashboardStats</h1>
      <button
        type="button"
        onClick={() => {
          setSeeDownloadStats(true);
        }}
      >
        Download Stat Breakdown
      </button>
      {seeDownloadStats && (
        <DownloadStatsView
          close={() => setSeeDownloadStats(false)}
          data={sessions}
        />
      )}
      <div className="flex w-full flex-col place-items-center gap-2 p-2">
        <StatCard title={"Tricks"} data={tricks && tricks.length} />
        <StatCard
          title={"Transitions"}
          data={transitions && transitions.length}
        />
        <div
          className="w-full"
          onClick={() => setShowUniqueTricks(!showUniqueTricks)}
        >
          <StatCard title={"Unique Tricks"} data={uniqueTricks.length} />
        </div>
        <TrickPieChart data={tricks} group_by={"base_id"} />
        <div className="flex h-32 w-full place-content-center p-2">
          <TransitionsBarChart data={transitions} />
        </div>
        {showUniqueTricks && (
          <ListDisplay
            close={() => setShowUniqueTricks(false)}
            data={uniqueTricksGroup}
          />
        )}
        {/* <TrickPieChart data={transitions} group_by={"name"} /> */}
      </div>
    </div>
  );
};

const StatCard = ({ title, data }) => {
  return (
    <div className="flex  w-full justify-around rounded-md bg-zinc-800 p-2">
      <p className="w-full text-left">{data}</p>
      <p className="w-fit whitespace-nowrap">{title}</p>
    </div>
  );
};

const ListDisplay = ({ data, close }) => {
  const ref = useClickOutside(() => close());
  return (
    <div className="absolute left-0 top-0 flex h-full w-full flex-col place-content-center place-items-center bg-zinc-900 bg-opacity-70 p-8">
      <div
        ref={ref}
        className="minimalistScroll flex h-[80vh] w-[90vw] flex-col gap-2 overflow-y-scroll"
      >
        {data.map((item) => (
          <div className="flex w-full justify-around rounded-md bg-zinc-800 p-2">
            <p className="w-full whitespace-nowrap">{item.name}</p>
            <p className="w-fit text-left">{item.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;

const DownloadStatsView = ({ data, close }) => {
  //create svg with d3 inside a canvas with a download button
  const svgRef = useRef(null!);
  const canvasRef = useRef(null!);
  const ref = useClickOutside(() => close());
  const [sessionData, setSessionData] = useState(data?.[0].SessionData);

  const downloadSvgAsPng = () => {
    const svg = d3.select(svgRef.current).select("svg").node() as SVGSVGElement;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgDataBase64 = btoa(unescape(encodeURIComponent(svgData)));
    const svgDataUrl = `data:image/svg+xml;base64,${svgDataBase64}`;

    // Create a new Image
    const img = new Image();
    img.src = svgDataUrl;

    img.onload = function () {
      // Create a canvas and draw the image onto it
      const canvas = d3.select(canvasRef.current).node();
      canvas.width = img.width;
      canvas.height = img.height;
      console.log("width, height", img.width, img.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Convert the canvas to a data URL
      const canvasDataUrl = canvas.toDataURL("image/png");

      // Trigger a download
      const downloadLink = document.createElement("a");
      downloadLink.href = canvasDataUrl;
      downloadLink.download = "visualization.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
  };

  useEffect(() => {
    if (canvasRef.current !== undefined) {
      const tricks = sessionData
        ?.map((sd) =>
          sd.ClipLabel?.comboArray
            ?.map((trick) => trick)
            .filter((trick) => trick.type !== "Transition")
        )
        .flat(2) as tricks[];
      const transitions = sessionData
        ?.map((sd) =>
          sd.ClipLabel?.comboArray
            ?.map((trick) => trick)
            .filter((trick) => trick.type !== "Trick")
        )
        .flat(2) as transitions[];

      const trickCount = Array.from(
        d3.group(tricks, (d) =>
          d?.takeoffStance.replace(/Complete|Hyper|Mega|Semi/g, "")
        )
      ).map(([key, value]) => ({
        name: key,
        percent: value.length / tricks.length,
      }));
      const piGen = d3
        .pie()
        .startAngle(0)
        .endAngle(2 * Math.PI)
        .sort(null);
      const arcGen = d3.arc().innerRadius(50).outerRadius(250);
      const colors = d3
        .scaleSequential(d3.interpolateRgbBasis(["#50d9f0", "#ff4b9f"]))
        .domain([0, trickCount.length + 1]);
      const instructions = piGen(trickCount.map((d) => d.percent));
      const svg = d3.select(svgRef.current).select("svg");
      svg.attr("viewBox", `0 0 1000 1000`);
      //draw pie slices
      svg
        .selectAll("path")
        .data(instructions)
        .attr("class", "slice")
        .join("path")
        .attr("stroke", "#18181b")
        .style("fill", (d, i) => colors(i))
        .style("transform", `translate(${500}px , ${500}px)`)
        .transition()
        .duration(500)
        .attrTween("d", function (d) {
          const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
          return function (t) {
            d.endAngle = i(t);
            return arcGen(d as unknown as d3.DefaultArcObject);
          };
        });

      //draw text for each slice
      svg
        .selectAll("text")
        .data(trickCount)
        .join("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text((d) => d.name)
        .attr("x", (d, i) => {
          const c = arcGen.centroid(
            instructions[i] as unknown as d3.DefaultArcObject
          );
          return c[0] + 500;
        })
        .attr("y", (d, i) => {
          const c = arcGen.centroid(
            instructions[i] as unknown as d3.DefaultArcObject
          );
          return c[1] + 500;
        })
        .attr("font-size", "1.5em")
        .attr("font-family", "Inter, sans-serif")
        .attr("fill", "white");

      return () => {
        svg.selectAll("*").remove();
      };
    }
  }, [sessionData]);
  return (
    <div
      ref={ref}
      className="absolute left-[20vw] top-[2.5vh] aspect-square w-[60vw] rounded-3xl bg-zinc-900"
    >
      <canvas
        className="invisible absolute h-full w-full rounded-3xl"
        ref={canvasRef}
      />
      <div className="h-full w-full rounded-3xl" ref={svgRef}>
        <svg
          width={1000}
          height={1000}
          className="h-full w-full"
          key={"stats-download"}
        />
      </div>
      <div className=" absolute bottom-5 flex w-full place-content-center">
        <button
          onClick={() => downloadSvgAsPng()}
          className="  flex items-center gap-2 rounded-xl bg-zinc-400 p-2 px-4 text-2xl text-zinc-200"
        >
          Download
          <IoMdDownload />
        </button>
      </div>
      <div className="no-scrollbar absolute -left-[17.5vw] top-0 flex h-[60vw] w-[15vw] flex-col gap-2 overflow-y-scroll rounded-md bg-zinc-500 p-1">
        {data.map((item) => (
          <div
            onClick={() => setSessionData(item.SessionData)}
            className="flex w-full justify-around rounded-md bg-zinc-800 p-2"
          >
            <p className="w-full whitespace-nowrap">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
