import React from "react";
import { BsGithub } from "react-icons/bs";
import DylanContactLinks from "../../../components/info/DylanContactLinks";
function Code() {
  return (
    <div>
      <div className="p-4 pt-0 font-inter text-sm font-light text-zinc-300">
        <div className="text-2xl font-bold">Know Programming?</div>
        Want to contribute to the project or just see how its built?
        <br /> Our repo is open source and available at
        <br />
        <a
          id="github-link"
          className="inline"
          rel="noopener noreferrer"
          target={"_blank"}
          href="https://github.com/alazyartist/tricking-3d"
        >
          <BsGithub className="inline" />
          /alazyartist/tricking-3d.
        </a>
        <br />
        <br />
        <hr className="p-2" />
        If you’d like to make a contribution just follow the ReadMe’s and make a
        pull request. Someone will review your code. If you’d like to join the
        core team. You can reach out to Dylan James via email or instagram.
        <DylanContactLinks />
        <hr className="mt-4" />
      </div>
      <div className=" px-4">
        <div className="text-2xl font-bold">Technologies Used</div>
        <ul className="grid grid-cols-2 place-content-center pl-2 text-sm font-bold">
          <div className="col-span-2 w-[80%] text-center">Typescript</div>
          <div>
            <ul className="flex flex-col font-semibold">
              Frontend
              <li className="pl-3 font-light">Nextjs</li>
              <li className="pl-3 font-light">React</li>
              <li className="pl-3 font-light">React-Three-Fiber</li>
              <li className="pl-3 font-light">Three-JS</li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-col pl-14 font-semibold">
              Backend
              <li className="pl-3 font-light">MySQL</li>
              <li className="pl-3 font-light">Neo4j</li>
              <li className="pl-3 font-light">Redis</li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Code;
