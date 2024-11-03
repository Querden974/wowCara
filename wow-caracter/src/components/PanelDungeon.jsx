import { useState, useEffect } from "react";
import listDungeon from "../functions/getDungeons";
import getAccessToken from "../functions/getAccessToken";
import convertMStoTimer from "../functions/convertMStoTimer";
function DungeonCard({ data }) {
  const [dungeons, setDungeons] = useState([]);

  async function initDungeons() {
    const accessToken = await getAccessToken("eu");
    const dungeons = await listDungeon(accessToken, "eu");
    setDungeons(dungeons);
  }

  // Liste des donjons ID et shortName
  const seasonDungeonId = [
    [503, "ARAK"],
    [502, "COT"],
    [505, "DAWN"],
    [501, "SV"],
    [507, "GB"],
    [375, "MISTS"],
    [376, "NW"],
    [353, "SIEGE"],
  ];
  const currentDungeon = data.raiderIO.mythic_plus_best_runs;
  //console.log(currentDungeon);

  // On parcourt seasonDungeonId
  seasonDungeonId.forEach(([id, shortName]) => {
    // On cherche le donjon correspondant dans currentDungeon

    dungeons.forEach((d) => {
      const dungeon = currentDungeon.find((d) => d.short_name === shortName);

      if (dungeon && dungeon.clear_time_ms !== 0) {
        if (d.shortName === shortName) {
          d["score"] = dungeon.score;
          d["timer"] = convertMStoTimer(dungeon.clear_time_ms);
          d["upgrade"] = `+${dungeon.num_keystone_upgrades}`;
          d["difficulty"] = dungeon.mythic_level;
        }
      } else {
        d["score"] = 0;
        d["timer"] = 0;
        d["upgrade"] = "";
        d["difficulty"] = "";
      }
    });
  });

  //console.log(dungeons);
  useEffect(() => {
    initDungeons();
  }, []);
  return (
    <div className="relative lg:row-span-2 w-full h-[clamp(40rem,80vh,45rem)]">
      <div className="absolute inset-px rounded-lg bg-white sm:rounded-r-[2rem] w-full"></div>
      <div
        id="dungeonPanel"
        className="relative flex w-full h-max flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] sm:rounded-r-[calc(2rem+1px)]"
      >
        <div className="flex flex-col py-8 px-8 gap-[clamp(1rem,4.5dvh,1.2rem)] ">
          {dungeons.map((dungeons, index) => (
            <div key={dungeons.shortName} className="flex flex-row gap-3">
              <div className="w-20 grid grid-cols-1 grid-cols-min [&>*]:col-start-1 [&>*]:row-start-1 relative ">
                <img
                  id={dungeons.shortName + "-img"}
                  src={dungeons.img}
                  className={`w-full aspect-square rounded-lg ${
                    dungeons.difficulty ? "" : "saturate-0"
                  }`}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-mono text-slate-100">
                  <p
                    id={dungeons.shortName + "-difficulty"}
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-mono text-slate-100"
                  >
                    {dungeons.difficulty}
                  </p>
                  <p
                    id={dungeons.shortName + "-upgrade"}
                    className="text-xl sm:text-[clamp(0.5rem,1.5vw,1.5rem)] font-mono capitalize align relative top-4"
                  >
                    {dungeons.upgrade}
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-full">
                <p className=" text-lg sm:text-[clamp(0.1rem,1.2vw,1rem)] font-mono capitalize align font-semibold leading-none">
                  {dungeons.name.replace(/-/g, " ")}
                </p>
                <div className="grid grid-cols-2 justify-items-center ">
                  <p
                    id={dungeons.shortName + "-score"}
                    className="text-md sm:text-[clamp(0.5rem,1.5vw,1.5rem)] font-mono capitalize align"
                  >
                    {dungeons.score}
                  </p>
                  <p
                    id={dungeons.shortName + "-timer"}
                    className="text-md sm:text-[clamp(0.5rem,1.5vw,1.5rem)] font-mono capitalize align"
                  >
                    {dungeons.timer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DungeonCard;
