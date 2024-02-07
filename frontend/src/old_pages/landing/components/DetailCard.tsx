import { SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
interface DetailCardProps {
  title: string;
  description: string | React.ReactNode;
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
        min-h-[600px] w-full rounded-3xl bg-zinc-900 p-4  md:min-h-fit `}
    >
      <div className="h-[375px] w-full overflow-clip rounded-xl md:h-[600px]  ">
        {children}
      </div>
      <h1 className="mt-3 px-2 text-2xl font-black text-zinc-200">{title}</h1>
      <div className="px-2 text-sm text-zinc-200">{description}</div>
      <div className="flex h-24 w-full flex-col place-content-center place-items-center">
        {link && link !== "/register" ? (
          <Link
            className="rounded-lg bg-indigo-500 px-4 py-2 font-inter text-zinc-300"
            href={link}
          >
            {cta}
          </Link>
        ) : (
          <div className="rounded-lg bg-indigo-500 px-4 py-2 font-inter text-zinc-300">
            <SignUpButton mode="modal">{cta}</SignUpButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCard;
