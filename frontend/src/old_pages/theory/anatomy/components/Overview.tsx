import Link from "next/link";

export const BasesOverview = () => {
  return (
    <div className="flex w-full flex-col gap-1 p-2 text-center font-inter text-zinc-300">
      <div className="grid grid-cols-3 gap-2 rounded-xl p-2 ">
        <Link
          href={`/theory/bases?base=Backflip`}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Backflip
        </Link>
        <Link
          href={`/theory/bases?base=Gainer`}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Gainer
        </Link>
        <Link
          href={`/theory/bases?base=GainerR`}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          GainerR
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2 rounded-xl p-2 ">
        <Link
          href={`/theory/bases?base=Insideflip`}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Insideflip
        </Link>
        <Link
          href={`/theory/bases?base=Aerial`}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Aerial
        </Link>
        <Link
          href={`/theory/bases?base=GMS`}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          GMS
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2 rounded-xl p-2 ">
        <Link
          href={`/theory/bases?base=Frontflip`}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Frontflip
        </Link>
        <Link
          href={`/theory/bases?base=Webster`}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Webster
        </Link>
        <Link
          href={`/theory/bases?base=WebsterR`}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          WebsterR
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2 rounded-xl p-2 ">
        <Link
          href={`/theory/bases?base=Outsideflip`}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Outsideflip
        </Link>
        <Link
          href={`/theory/bases?base=Raiz`}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Raiz
        </Link>
        <Link
          href={`/theory/bases?base=Lotus`}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Lotus
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 rounded-xl p-2 ">
        <Link
          href={`/theory/bases?base=VertB`}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          VertB
        </Link>
        <Link
          href={`/theory/bases?base=VertF`}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          VertF
        </Link>
      </div>
    </div>
  );
};
