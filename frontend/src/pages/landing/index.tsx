import React, { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TrickedexLogo } from "@data/icons/TrickedexLogo";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import mixpanel from "@utils/mixpanel";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import DiscordLink from "@components/info/DiscordLink";
import { trpc } from "@utils/trpc";
import * as d3 from "d3";
import { SimulationLinkDatum, SimulationNodeDatum } from "d3";
const LandingCanvas = dynamic(
  () => import("@old_pages/landing/components/LandingCanvas"),
  { suspense: true }
);
const AnatomySketch = dynamic(
  () => import("old_pages/theory/components/AnatomySketchSVG")
);
const DetailCard = dynamic(
  () => import("@old_pages/landing/components/DetailCard")
);

// const MovingBackground = dynamic(
//   () => import("@old_pages/landing/components/MovingBackground"),
//   { suspense: false }
// );

const LandingPage: NextPage<{ a: boolean }> = ({ a }) => {
  const [loadScene, setLoadScene] = useState(false);
  const [devNote, setDevNote] = useState(false);
  // mixpanel.track("Landing Page View");
  return (
    <div className="no-scrollbar fixed top-0 flex h-[100vh] w-[100vw] flex-col place-items-center justify-between gap-2 overflow-y-scroll bg-zinc-800 text-zinc-200">
      <div
        id="abovethefold"
        className="flex h-[100vh] flex-shrink-0 flex-col items-center gap-2 "
      >
        <div className=" flex w-full place-items-center justify-between p-2">
          <TrickedexLogo className="w-[45%] flex-shrink-0 fill-zinc-300 md:w-[20%]" />
          {/* <div className="rounded-md border-[1px] border-zinc-800 p-2">
            <FaHamburger className="text-2xl text-zinc-800" />
          </div> */}
        </div>
        <TagLine a={a}></TagLine>
        {/* <div className="mx-4 my-2 rounded-md bg-zinc-900 bg-opacity-70 p-2 px-4 text-zinc-300 backdrop-blur-md">
          At the Trickedex, we believe that everyone has the potential to be a
          great tricker. With the right tools and resources, anyone can master
          the art of tricking, and that's exactly what we provide. Whether
          you're just starting out or you're a seasoned veteran, the Trickedex
          is the ultimate resource for anyone who loves tricking
        </div> */}
        <div className="flex gap-2">
          <Link
            onClick={() =>
              mixpanel.track("Sandbox", {
                source: "landing",
                destination: "sandbox",
              })
            }
            href="/sandbox"
            className="rounded-md bg-indigo-500 p-2 font-bold text-zinc-100"
          >
            Sandbox
          </Link>
          <Link
            onClick={() =>
              mixpanel.track("Home", {
                source: "landing",
                destination: "home",
              })
            }
            href="/home"
            className="rounded-md bg-indigo-500 p-2 font-bold text-zinc-100"
          >
            Home
          </Link>
          <button
            type={"button"}
            onClick={() =>
              mixpanel.track("Login", {
                source: "landing",
                destination: "login",
              })
            }
            className="rounded-md bg-indigo-500 p-2 font-bold text-zinc-100"
          >
            <SignInButton
              mode="modal"
              redirectUrl="/home"
              children={<p>Login</p>}
            />
          </button>
        </div>
        {/* <Suspense
          fallback={
            <div className="absolute top-[50vh] -z-20 h-[60vw] w-[60vw] rounded-full bg-teal-300 blur-3xl" />
          }
        >
          <MovingBackground />
        </Suspense> */}
        {devNote && <PEtheMess setDevNote={setDevNote} />}
        {!devNote && (
          <div className="p-8">
            <p
              className="rounded-md border-[1px] border-zinc-300 px-2"
              onClick={() => setDevNote(true)}
            >
              See Dev Note
            </p>
          </div>
        )}
        {/* <div className="absolute top-[50vh] -z-20 h-[60vw] w-[60vw] rounded-full bg-teal-300 blur-3xl" /> */}
        {/* <div className='flex w-[100vw] flex-shrink-0  gap-2 overflow-hidden'>
					<div className='h-[200px] w-[300px] flex-shrink-0 rounded-md bg-zinc-900'></div>
					<div className='h-[200px] w-[100px] flex-shrink-0 rounded-md bg-zinc-900'></div>
				</div> */}
        <div className="absolute bottom-4 font-inter text-xl font-black md:text-3xl">
          Scroll to See More
        </div>
      </div>
      <div className="grid w-[90%] grid-cols-1 gap-4 md:grid-cols-2">
        <DetailCard
          link={"/theory"}
          cta={"Explore Theory Now"}
          title={"Discover the Secrets of Tricking Theory"}
          description="We believe that understanding the theory behind tricking is key to becoming a great tricker. That's why we've made it easy for you to access a wealth of information about the discipline, including comprehensive tutorials and in-depth explanations. With the Trickedex, you'll be able to take your tricking skills to the next level in no time!"
        >
          <Suspense>
            <AnatomySketch
              className={"h-full w-full rounded-md bg-zinc-900 fill-zinc-200 "}
            />
          </Suspense>
        </DetailCard>
        <DetailCard
          left
          link={"/sandbox"}
          cta={"Go to Sandbox"}
          title={"See Tricks Come to Life with 3D"}
          description="Tricking has never been more exciting, thanks to the Trickedex's innovative 3D library of motion-captured tricks. Explore each move in detail, and see exactly how the pros do it. With our cutting-edge technology, you'll be able to gain a whole new perspective on tricking and take your own skills to new heights."
        >
          {loadScene ? (
            <Suspense>
              <LandingCanvas />
            </Suspense>
          ) : (
            <div
              className="flex h-full place-content-center place-items-center rounded-md bg-zinc-900 text-zinc-300"
              onClick={() => setLoadScene(true)}
            >
              <div>Click to Load</div>
            </div>
          )}
        </DetailCard>
        <DetailCard
          left
          link={"/register"}
          cta={"Start Tracking"}
          title={"Track Your Tricking Progress with Ease"}
          description="At the Trickedex, we're committed to helping trickers of all levels reach their full potential. That's why we've created a comprehensive set of tools for tracking your progress, including detailed user profile pages and easy-to-use performance metrics. Whether you're just starting out or are a seasoned tricker, the Trickedex is the perfect way to stay motivated and reach new heights in your tricking journey."
        ></DetailCard>
        <DetailCard
          link={"/register"}
          cta={"Join Now"}
          title={"Join a Community of Tricking Enthusiasts"}
          description="The Trickedex isn't just a database of tricks and tutorials - it's also a vibrant community of like-minded trickers from around the world. Follow your friends, connect with new trickers, and be a part of something special. With our social media platform, you can share your tricks, give and receive feedback, and be a part of a supportive and encouraging community of trickers."
        >
          <UserGraph />
        </DetailCard>
        <div className="h-[40px]" />
      </div>
    </div>
  );
};

export default LandingPage;

const UserGraph = () => {
  const { data: users } = trpc.userDB.findAll.useQuery();
  const ref = useRef(null);
  const transformData = (ud) => {
    const nodes = [];
    const links = [];

    ud.forEach((u) => {
      nodes.push({ id: u.id, image: u.profilePic, username: u.username });
      u.captures.forEach((c) => {
        links.push({ source: c.user_id, target: c.captured_id });
      });
      u.captured_me.forEach((c) => {
        links.push({ source: c.captured_id, target: c.user_id });
      });
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

      const simulation = d3
        .forceSimulation(data.nodes)
        .force("charge", d3.forceManyBody().strength(-10))
        .force(
          "link",
          d3
            .forceLink(data.links)
            //@ts-ignore
            .id((d) => d.id)
            .distance(50)
            .strength(0.22)
        )
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide(25));

      simulation.nodes(data.nodes).on("tick", ticked);
      const drag = d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

      svg
        .append("clipPath")
        .attr("id", "circle-clip")
        .append("circle")
        .attr("r", 20)
        .attr("cx", 0)
        .attr("cy", 0);

      const node = container
        .selectAll(".node")
        .data(data.nodes)
        .join("g")
        .classed("node", true);

      node
        .append("circle")
        .style("height", 20)
        .style("width", 20)
        .attr("r", 20) // radius of circle
        .style("fill", "#ffffff");

      node
        .append("image")
        .attr(
          "xlink:href",
          (d) => d.image ?? "http://trickedex.app/images/noimg.jpeg"
        )
        .attr("x", -20)
        .attr("y", -20)
        .attr("width", 40)
        .attr("height", 40)
        .attr("clip-path", "url(#circle-clip)");

      //tooltip popup with username on hover

      const link = container
        .selectAll(".link")
        .data(data.links)
        .join("line")
        .classed("link", true)
        .attr("stroke", "#FFF")
        .attr("stroke-opacity", 0.6);

      function ticked() {
        node.attr("transform", (d) => `translate(${d.x},${d.y})`);

        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);
      }
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
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
        .scaleExtent([1, 8])
        .on("zoom", (event) => {
          container.attr("transform", event.transform);
        });

      svg.call(zoom, d3.zoomIdentity.scale(0.01));
      node.call(drag);
      console.log(data);
    }
    return () => {
      // cleanup
      d3.select(ref.current).selectAll("*").remove();
    };
  }, [users]);
  return <svg className="h-full w-full " ref={ref} id={"user-graph"} />;
};

const TagLine: React.FC<{ a: boolean }> = ({ a }) => {
  const router = useRouter();
  if (a)
    return (
      <div className="my-8 flex min-h-[120px] flex-shrink-0 flex-col place-content-center items-center leading-loose md:leading-9">
        <div className="text-center font-inter text-3xl font-light leading-relaxed md:text-7xl md:leading-loose">
          Your Tricking journey
          <br /> starts{" "}
          <span
            onClick={() => {
              mixpanel.track("Registration Page", {
                source: "landing",
                destination: "register",
                option: "a",
              });
              // router.push("/register");
            }}
          >
            <SignUpButton
              mode="modal"
              redirectUrl="/home"
              children={
                <span className="rounded-md border-[1px] border-zinc-900 px-1 font-black md:px-2">
                  here.
                </span>
              }
            />
          </span>
        </div>
        <div className="text-xl font-light">
          <span className={`font-bold md:text-3xl`}>Trickedex</span>, the
          ultimate resource.
        </div>
      </div>
    );
  if (!a)
    return (
      <div className="my-8 flex min-h-[120px] flex-shrink-0 flex-col place-content-center items-center gap-2 md:my-16">
        <div className="font-inter text-3xl font-light md:text-7xl">
          Tricking is <span className="font-black">complicated.</span>
        </div>
        <div className="font-light md:text-3xl">
          The trickedex gives you the tools <br />
          to make sense of it in one place
        </div>
        <div
          onClick={() => {
            mixpanel.track("Registration Page", {
              source: "landing",
              destination: "register",
              option: "b",
            });
            // router.push("/register");
          }}
          className="rounded-md border-[1px] border-zinc-300 px-2 pb-1 text-xl font-black md:px-2"
        >
          <SignUpButton
            mode="modal"
            redirectUrl="/home"
            children={<p>Register Now</p>}
          />
          {/* Register Now */}
        </div>
      </div>
    );
};

const PEtheMess = ({ setDevNote }) => {
  return (
    <div className=" h-fit w-[90vw] rounded-xl bg-zinc-800 p-4 py-4 font-inter font-semibold text-zinc-300 lg:w-[40vw]">
      <div className="text-center text-lg leading-relaxed md:text-3xl">
        While this project is{" "}
        <span className="font-black text-red-300">NOT </span> complete.
      </div>
      <div className=" p-2 text-center text-lg">
        It <span className="font-black text-emerald-300">IS </span>ready for
        use.
      </div>

      <div className="p-2 text-center  text-xs">
        Please report any bugs or issues to the discord server.
      </div>
      <DiscordLink />
      <div className="flex w-full place-content-center place-items-center">
        <button
          onClick={() => setDevNote(false)}
          className="rounded-md border-2 border-zinc-300 px-2 text-sm"
        >
          close
        </button>
      </div>
    </div>
  );
};
