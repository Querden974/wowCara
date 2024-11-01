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

  console.log(dungeons);
  useEffect(() => {
    initDungeons();
  }, []);
  return (
    <div className="relative lg:row-span-2">
      <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
      <div
        id="dungeonPanel"
        className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]"
      >
        <div className="flex flex-col p-8 gap-4 ">
          {dungeons.map((dungeons, index) => (
            <div key={dungeons.shortName} className="flex flex-row gap-2">
              <img
                id={dungeons.shortName + "-img"}
                src={dungeons.img}
                className={`w-[16%] aspect-square rounded-lg ${
                  dungeons.difficulty ? "" : "saturate-0"
                }`}
              />
              <p
                id={dungeons.shortName + "-difficulty"}
                className="text-4xl font-mono capitalize align relative right-11 top-1 text-slate-100"
              >
                {dungeons.difficulty}
              </p>

              <div className="flex flex-col gap-2 w-full">
                <p className="text-sm font-mono capitalize align font-semibold ">
                  {dungeons.name.replace(/-/g, " ")}
                </p>
                <div className="grid grid-cols-3 items-center ">
                  <p
                    id={dungeons.shortName + "-score"}
                    className="text-sm font-mono capitalize align"
                  >
                    {dungeons.score}
                  </p>
                  <p
                    id={dungeons.shortName + "-timer"}
                    className="text-sm font-mono capitalize align"
                  >
                    {dungeons.timer}
                  </p>
                  <p
                    id={dungeons.shortName + "-upgrade"}
                    className="text-sm font-mono capitalize align"
                  >
                    {dungeons.upgrade}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
    </div>
  );
}

export default DungeonCard;
