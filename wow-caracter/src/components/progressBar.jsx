function ProgressBar() {
  const colors = {
    lfr: "bg-lfr",
    normal: "bg-normal",
    heroic: "bg-heroic",
    mythic: "bg-mythic",
  };

  // Gestion de la progrogression des raids
  const nerubarPalace = rIO.raid_progression["nerubar-palace"];
  //console.log(nerubarPalace);
  const normal = document.getElementById("normal");
  const heroic = document.getElementById("heroic");
  const mythic = document.getElementById("mythic");
  const progressBar = document.getElementById("progressBar");
  progressBar.classList.remove("hidden");

  const normalNerubar = Math.round(
    (nerubarPalace.normal_bosses_killed / nerubarPalace.total_bosses) * 100
  );
  const heroicNerubar = Math.round(
    (nerubarPalace.heroic_bosses_killed / nerubarPalace.total_bosses) * 100
  );
  const mythicNerubar = Math.round(
    (nerubarPalace.mythic_bosses_killed / nerubarPalace.total_bosses) * 100
  );
  console.log(normalNerubar, heroicNerubar, mythicNerubar);
  if (nerubarPalace.normal_bosses_killed !== 0) {
    normal.style.width = `${normalNerubar}%`;
  } else {
    normal.style.display = `none`;
  }
  if (nerubarPalace.heroic_bosses_killed !== 0) {
    heroic.style.width = `${heroicNerubar}%`;
  } else {
    heroic.style.display = `none`;
  }
  if (nerubarPalace.mythic_bosses_killed !== 0) {
    mythic.style.width = `${mythicNerubar}%`;
  } else {
    mythic.style.display = `none`;
  }

  return (
    <div id="progressBar" className=" flex-col h-fit relative top-2 hidden">
      <span
        role="progressbar"
        aria-labelledby="ProgressLabel"
        aria-valuenow="50"
        className="block rounded-full relative -top-2 bg-slate-200 z-0 "
      >
        <span
          id="normal"
          className="block h-2 rounded-full bg-normal text-center text-[10px]/4  z-0"
        ></span>
      </span>

      <span
        role="progressbar"
        aria-labelledby="ProgressLabel"
        aria-valuenow="50"
        className="block rounded-full relative -top-4 z-10"
      >
        <span
          id="heroic"
          className="block h-2 rounded-full bg-heroic text-center text-[10px]/4  z-10"
        ></span>
      </span>

      <span
        role="progressbar"
        aria-labelledby="ProgressLabel"
        aria-valuenow="50"
        className="block rounded-full  relative -top-6 z-20"
      >
        <span
          id="mythic"
          className="block h-2 rounded-full bg-mythic text-center text-[10px]/4 z-20"
        ></span>
      </span>

      <div className="flex flex-row gap-3 text-xs relative -top-4">
        <span className="text-lfr"> LFR </span>
        <span className="text-normal"> Normal </span>
        <span className="text-heroic"> Heroic </span>
        <span className="text-mythic"> Mythic </span>
      </div>
    </div>
  );
}
export default ProgressBar;
