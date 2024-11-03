import { useEffect } from "react";

// ... existing code ...

export default function useGetInformations(
  name,
  region,
  server,
  locale,
  changeCharacterData,
  changeAccessToken,
  accessToken,
  isOpen,
  changeIsOpen,
  valid,
  setValid
) {
  useEffect(() => {
    async function fetchData() {
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

          if (isOpen) {
            changeIsOpen(!isOpen);
          }

          document.title = `${name}-${
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
      } else {
        if (!valid) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Veuillez entrer un nom de personnage.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }

    fetchData();
  }, []); // Le tableau de dépendances vide signifie que l'effet s'exécute une seule fois après le montage

  // ... existing code ...
}
