
const OccupancyBar = () => {
  // TODO: A foglalt és szabad helyek számát add át ennek a komponensnek és jelenítsd meg a megfelelő helyen
  
  const pct = 10 

  return (
    <div className="mt-1.5">
      <div className="mb-0.5 flex justify-between text-xs text-slate-600">
        <span>
          3/10 foglalt
        </span>
        <span className="font-medium text-slate-800">{pct}%</span>
      </div>
      <progress
        className="progress progress-primary h-1.5 w-full bg-slate-200"
        value={pct}
        max="100"
      />
      <div className="mt-1 flex gap-2 text-[10px] text-slate-500">
        <span>
          <span className="mr-1 inline-block size-1.5 rounded-full bg-emerald-400" />
          7 szabad
        </span>
        <span>
          <span className="mr-1 inline-block size-1.5 rounded-full bg-rose-400" />
          3 foglalt
        </span>
      </div>
    </div>
  );
};

export default OccupancyBar;
