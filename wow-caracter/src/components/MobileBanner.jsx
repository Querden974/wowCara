export default function MobileBanner({ name, data }) {
  const colors = {
    warrior: "#C69B6D",
    paladin: "#F48CBA",
    hunter: "#aad372",
    rogue: "#FFF468",
    priest: "#FFFFFF",
    deathknight: "#C41E3A",
    shaman: "#0070DD",
    mage: "#3FC7EB",
    warlock: "#8788EE",
    druid: "#FF7C0A",
    demonhunter: "#A330C9",
    evoker: "#33937F",
    monk: "#00FF98",
  };
  const classe = data.informations.character_class.name
    .toLowerCase()
    .replace(" ", "");
  const faction = data.raiderIO.faction;
  const guilde = data.informations.guild.name;
  const thumbnail = data.raiderIO.thumbnail_url;
  const bannerUrl =
    faction === "alliance"
      ? `https://cdn.raiderio.net/images/profile/masthead_backdrops/v2/alliancebanner1.jpg`
      : `https://cdn.raiderio.net/images/profile/masthead_backdrops/v2/hordebanner1.jpg`;
  return (
    <div
      id="mobile-banner"
      className="w-full grid grid-cols-1 grid-cols-min [&>*]:col-start-1 [&>*]:row-start-1 relative sm:hidden"
    >
      <img
        src={bannerUrl}
        className="w-full h-full object-cover rounded-[calc(theme(borderRadius.lg)+1px)]"
        style={{ transform: "scaleX(-1)" }}
      />
      <div className="flex flex-row gap-2 justify-evenly items-center relative ">
        <img src={thumbnail} className="w-[20dvw] aspect-square rounded-lg" />
        <div className="flex flex-col gap-2 justify-center items-center ">
          <p
            id="nameMain"
            className="flex  text-4xl font-bold justify-center capitalize font-mono "
            style={{ color: colors[classe] }}
          >
            {name}
          </p>
          <p
            id="guildMain"
            className="flex  text-1xl font-bold justify-center align-middle font-mono"
            style={{ color: colors[classe] }}
          >
            {`< ${guilde} >`}
          </p>
        </div>
      </div>
    </div>
  );
}
