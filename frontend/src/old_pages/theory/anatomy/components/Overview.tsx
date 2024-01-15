export const BasesOverview = () => {
  return (
    <div className="flex w-full flex-col gap-1 p-2 text-center font-inter text-zinc-300">
      <div className="grid grid-cols-3 gap-2 rounded-xl p-2 hover:bg-zinc-800">
        <div className="rounded-xl border-2 border-zinc-500 p-2">Backflip</div>
        <div className="rounded-xl border-2 border-zinc-500 p-2">Gainer</div>
        <div className="rounded-xl border-2 border-zinc-500 p-2">GainerR</div>
      </div>
      <div className="grid grid-cols-3 gap-2 rounded-xl p-2 hover:bg-zinc-800">
        <div className="rounded-xl border-2 border-zinc-500 p-2">
          Insideflip
        </div>
        <div className="rounded-xl border-2 border-zinc-500 p-2">Aerial</div>
        <div className="rounded-xl border-2 border-zinc-500 p-2">GMS</div>
      </div>
      <div className="grid grid-cols-3 gap-2 rounded-xl p-2 hover:bg-zinc-800">
        <div className="rounded-xl border-2 border-zinc-500 p-2">Frontflip</div>
        <div className="rounded-xl border-2 border-zinc-500 p-2">Webster</div>
        <div className="rounded-xl border-2 border-zinc-500 p-2">WebsterR</div>
      </div>
      <div className="grid grid-cols-3 gap-2 rounded-xl p-2 hover:bg-zinc-800">
        <div className="rounded-xl border-2 border-zinc-500 p-2">
          Outsideflip
        </div>
        <div className="rounded-xl border-2 border-zinc-500 p-2">Raiz</div>
        <div className="rounded-xl border-2 border-zinc-500 p-2">Lotus</div>
      </div>
      <div className="grid grid-cols-2 gap-4 rounded-xl p-2 hover:bg-zinc-800">
        <div className="rounded-xl border-2 border-zinc-500 p-2">VertL</div>
        <div className="rounded-xl border-2 border-zinc-500 p-2">VertR</div>
      </div>
    </div>
  );
};
