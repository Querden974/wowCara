export default function ProfileCard({ name, data }) {
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
  const guilde = data.informations.guild.name;
  const imageSrc = data.images.assets.find(
    (asset) => asset.key === "main-raw"
  )?.value;
  return (
    <>
      <div className="relative lg:row-span-2  sm:block hidden">
        <div className="absolute inset-px rounded-lg bg-transparent sm:rounded-l-[2rem]"></div>
        <div className="relative flex h-full flex-col  rounded-[calc(theme(borderRadius.lg)+1px)] sm:rounded-l-[calc(2rem+1px)]">
          <div id="characterRender" className="relative   h-[700px] ">
            <p
              id="nameMain"
              className="flex  text-4xl font-bold justify-center  font-mono "
              style={{ color: colors[classe] }}
            >
              {name}
            </p>
            <p
              id="guildMain"
              className="flex  text-1xl font-bold justify-center   font-mono"
              style={{ color: colors[classe] }}
            >
              {`< ${guilde} >`}
            </p>

            <div
              id="imageDiv"
              className="flex justify-center items-center  h-[500px]  "
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
