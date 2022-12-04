import Link from "next/link";
import React from "react";
interface DetailCardProps {
  title: string;
  description: string;
  children?: any;
  left?: boolean;
  cta?: string;
  link?: string;
}
const DetailCard: React.FC<DetailCardProps> = ({
  title,
  description,
  children,
  left,
  cta,
  link,
}) => {
  return (
    <div
      // ${ left ? "ml-3 place-self-start md:ml-10" : "mr-3 place-self-end md:mr-10" }
      className={` 
        min-h-[900px] w-[fit] rounded-3xl bg-zinc-900 bg-opacity-70 p-8 backdrop-blur-sm`}
    >
      <div className="h-[200px] w-[300px] overflow-clip rounded-xl  md:h-[400px] md:w-[600px] ">
        {children}
      </div>
      <h1 className="mt-3 px-2 text-3xl font-black text-zinc-300">{title}</h1>
      <p className="px-2 text-xl text-zinc-300">{description}</p>
      <div className="flex h-24 w-full flex-col place-content-center place-items-center">
        {link && (
          <Link
            className="rounded-lg bg-indigo-500 px-4 py-2 font-inter text-zinc-300"
            href={link}
          >
            {cta}
          </Link>
        )}
      </div>
    </div>
  );
};

export default DetailCard;
