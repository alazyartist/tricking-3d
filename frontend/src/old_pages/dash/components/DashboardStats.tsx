import TransitionsBarChart from "@components/d3/TransitionsBarChart";
import TrickPieChart from "@components/d3/TrickPieChart";
import { transitions, tricks } from "@prisma/client";
import { trpc } from "@utils/trpc";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import useClickOutside from "@hooks/useClickOutside";
import { IoMdDownload } from "react-icons/io";

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
        const ca = data.ClipLabel.comboArray as (tricks | transitions)[];

        return ca
          ?.map((trick) => trick)
          .filter((trick) => trick.type !== "Transition");
      })
    )
    .flat(2);
  const transitions = sessions
    ?.map((session) => {
      return session.SessionData.map((data) => {
        const ca = data.ClipLabel.comboArray as (tricks | transitions)[];
        return ca
          ?.map((trick) => trick)
          .filter((trick) => trick.type === "Transition");
      });
    })
    .flat(2);
  const uniqueTricks = [...new Set(tricks?.map((trick) => trick.name))];
  const uniqueTricksGroup = Array.from(d3.group(tricks, (d) => d.name))
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
          data={tricks}
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
      const svg = d3.select(svgRef.current).select("svg");
      svg.attr("viewBox", `0 0 1000 1000`);

      svg
        .selectAll("text")
        .data(data)
        .join("text")
        //@ts-ignore
        .text((d) => d.name)
        .attr("x", (d, i) => `20px`)
        .attr("y", (d, i) => `${i * 100}px`)
        .style("color", "##ff0000")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "120px");
    }
  }, [data]);
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
    </div>
  );
};
