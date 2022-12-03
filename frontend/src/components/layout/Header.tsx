import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TrickedexLogo } from "../../data/icons/TrickedexLogo";
function Header() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (router.pathname.includes("sandbox")) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [router]);

  return (
    open && (
      <Link href="/home">
        <div className="fixed top-1 z-[1000] flex h-[47px] w-fit place-content-start rounded-b-xl border-none bg-opacity-60 p-2 font-inter text-3xl font-bold text-zinc-300 ">
          <TrickedexLogo className={"flex h-[47px] w-full fill-zinc-300"} />
        </div>
      </Link>
    )
  );
}

export default Header;
