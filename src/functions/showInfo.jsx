import convertMStoTimer from "./convertMStoTimer";
async function ShowInfo(name, data, dataApp, rIO) {
  var render;

  const colors = {
    warrior: ["text-warrior", "#C69B6D"],
    paladin: ["text-paladin", "#F48CBA"],
    hunter: ["text-hunter", "#aad372"],
    rogue: ["text-rogue", "#FFF468"],
    priest: ["text-priest", "#FFFFFF"],
    deathknight: ["text-deathknight", "#C41E3A"],
    shaman: ["text-shaman", "#0070DD"],
    mage: ["text-mage", "#3FC7EB"],
    warlock: ["text-warlock", "#8788EE"],
    druid: ["text-druid", "#FF7C0A"],
    demonhunter: ["text-demonhunter", "#A330C9"],
    evoker: ["text-evoker", "#33937F"],
    monk: ["text-monk", "#00FF98"],
  };

  // On récupère les données du personnage
  try {
    if (name === "") {
      setError("Veuillez entrer un nom de serveur et de personnage.");
      return;
    }

    // Utiliser des références React ou vérifier l'existence des éléments avant de les manipuler
    const nomPersonnage = document.getElementById("nomPersonnage");
    const servPersonnage = document.getElementById("servPersonnage");
    const ilvlPersonnage = document.getElementById("ilvlPersonnage");

    nomPersonnage.textContent = data.name;
    servPersonnage.textContent = data.realm.name;
    ilvlPersonnage.textContent = data.average_item_level;

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
    //-----------------------------------------------------------
    //Gestion de la progression des donjons
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
    const currentDungeon = rIO.mythic_plus_best_runs;

    // On parcourt seasonDungeonId
    seasonDungeonId.forEach(([id, shortName]) => {
      // On cherche le donjon correspondant dans currentDungeon
      const dungeon = currentDungeon.find((d) => d.short_name === shortName);

      const dungeonScore = document.getElementById(`${shortName}-score`);
      const dungeonTimer = document.getElementById(`${shortName}-timer`);
      const dungeonUpgrade = document.getElementById(`${shortName}-upgrade`);
      const dungeonDifficulty = document.getElementById(
        `${shortName}-difficulty`
      );
      const dungeonImg = document.getElementById(`${shortName}-img`);

      if (dungeon && dungeon.clear_time_ms !== 0) {
        dungeonScore.textContent = dungeon.score;
        dungeonTimer.textContent = convertMStoTimer(dungeon.clear_time_ms);
        dungeonUpgrade.textContent = `+${dungeon.num_keystone_upgrades}`;
        dungeonDifficulty.textContent = dungeon.mythic_level;
      } else {
        dungeonScore.textContent = "";
        dungeonTimer.textContent = "";
        dungeonUpgrade.textContent = "";
        dungeonDifficulty.textContent = "0";
        dungeonDifficulty.style.visibility = `hidden`;
        dungeonImg.style.filter = `saturate(0)`;
      }
    });
    //-----------------------------------------------------------
    // On récupère l'image du personnage
    const imageSrc = dataApp.assets.find(
      (asset) => asset.key === "main-raw"
    )?.value;
    const Render = document.getElementById("characterRender");

    // On crée les éléments pour afficher le personnage
    const color = data.character_class.name.toLowerCase().replace(/\s+/g, "");

    // On crée les éléments pour afficher le nom et le guild du personnage
    const nameMain = document.getElementById("nameMain");

    // Sauvegarder les classes de base que vous voulez garder
    const baseClasses = [
      "flex",
      "relative",
      "font-bold",
      "justify-center",
      "font-mono",
    ];

    // Retirer toutes les classes
    nameMain.className = "";

    // Remettre les classes de base
    baseClasses.forEach((className) => {
      nameMain.classList.add(className);
    });

    // Ajouter les nouvelles classes
    nameMain.textContent = data.name;
    nameMain.classList.add(colors[color]);
    nameMain.classList.add("text-4xl");

    // On crée les éléments pour afficher le guild du personnage
    const guildMain = document.getElementById("guildMain");

    guildMain.className = "";

    baseClasses.forEach((className) => {
      guildMain.classList.add(className);
    });

    guildMain.textContent = `<${data.guild.name}>`;
    guildMain.classList.add(colors[color]);
    guildMain.classList.add("text-1xl");

    // On crée l'image du personnage
    const image = document.getElementById("imageRender");
    image.src = imageSrc;
    image.classList.remove("hidden");

    // On ajoute les éléments pour afficher le nom et le guild du personnage à l'élément Render

    render = true;
  } catch (error) {
    console.error("Error in changeText:", error);
    setError(error.message);
  }
}

export default ShowInfo;
