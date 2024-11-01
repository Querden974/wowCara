export default function ProfileCard({ name, data }) {
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
  const classe = data.informations.character_class.name.toLowerCase();
  const guilde = data.informations.guild.name;
  const imageSrc = data.images.assets.find(
    (asset) => asset.key === "main-raw"
  )?.value;
  return (
    <>
      <div className="relative lg:row-span-2">
        <div className="absolute inset-px rounded-lg bg-transparent lg:rounded-l-[2rem]"></div>
        <div className="relative flex h-full flex-col  rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
          <div id="characterRender" className="relative   h-[700px] ">
            <p
              id="nameMain"
              className="flex  text-4xl font-bold justify-center  font-mono "
              style={{ color: colors[classe][1] }}
            >
              {name}
            </p>
            <p
              id="guildMain"
              className="flex  text-1xl font-bold justify-center   font-mono"
              style={{ color: colors[classe][1] }}
            >
              {guilde}
            </p>

            <div
              id="imageDiv"
              className="flex justify-center items-center  h-[500px] "
            >
              <img
                id="imageRender"
                className="  object-cover w-[600px] h-[900px]  -top-10 z-0 "
                src={imageSrc}
                alt="imageRender"
              />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg overflow-clip  "></div>
      </div>
    </>
  );
}
