import getCharacterInfo from "../functions/getCharacterInfo";
import getCharacterApp from "../functions/getCharacterApp";
import getRaiderIO from "../functions/getRaiderIO";
import listDungeon from "../functions/getDungeons";
import getCharacterStats from "../functions/getCharacterStats";
import getMainStat2 from "../functions/getMainStat2";
import getSpec from "../functions/getSpec";
import getAccessToken from "../functions/getAccessToken";

export default async function getInformations(
  name,
  region,
  server,
  locale,
  changeCharacterData,
  changeAccessToken,
  accessToken,
  valid,
  changeValid,
  isOpen,
  changeIsOpen
) {
  if (name !== "") {
    try {
      if (accessToken === "") {
        changeAccessToken(await getAccessToken(region));
      }
      const [data, dataApp, dataRaiderIO, dataDungeons, dataStats, spec] =
        await Promise.all([
          getCharacterInfo(
            accessToken,
            region,
            server,
            name.toLowerCase(),
            locale
          ),
          getCharacterApp(
            accessToken,
            region,
            server,
            name.toLowerCase(),
            locale
          ),
          getRaiderIO(region, server, name.toLowerCase()),
          listDungeon(accessToken, region),
          getCharacterStats(
            accessToken,
            region,
            server,
            name.toLowerCase(),
            locale
          ),
          getSpec(accessToken, region, server, name.toLowerCase(), locale),
        ]);
      const mainStat = await getMainStat2(data, accessToken);

      const characterData = {
        informations: data,
        images: dataApp,
        raiderIO: dataRaiderIO,
        dungeons: dataDungeons,
        stats: dataStats,
        mainStat: mainStat,
        spec: spec,
      };

      changeCharacterData(characterData);

      document.title = `${characterData.informations.name}-${
        server.at(0).toUpperCase() + server.slice(1)
      } [${region.toUpperCase()}] | Wow Character`;
    } catch (error) {
      if (!valid) {
        setValid(false);
        console.error("Error fetching character information:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "An error occurred while fetching character information.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }
}
