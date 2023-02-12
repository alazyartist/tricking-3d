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
        min-h-[600px] w-full rounded-3xl p-4  md:min-h-fit `}
    >
      <div className="h-[200px] w-full overflow-clip rounded-xl  ">
        {children}
      </div>
      <h1 className="mt-3 px-2 text-2xl font-black text-zinc-900">{title}</h1>
      <p className="px-2 text-sm text-zinc-900">{description}</p>
      <div className="flex h-24 w-full flex-col place-content-center place-items-center">
        {link && (
          <Link
            className="rounded-lg bg-sky-500 px-4 py-2 font-inter text-zinc-300"
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
