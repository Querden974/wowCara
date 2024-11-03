import { useState, useEffect } from "react";
import getAccessToken from "../functions/getAccessToken";
import getServer from "../functions/getServer";
import getCharacterInfo from "../functions/getCharacterInfo";
import getCharacterApp from "../functions/getCharacterApp";
import ShowInfo from "../functions/showInfo";
import getRaiderIO from "../functions/getRaiderIO";
import listDungeon from "../functions/getDungeons";
import getCharacterStats from "../functions/getCharacterStats";
import getMainStat2 from "../functions/getMainStat2";
import getSpec from "../functions/getSpec";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

function SelectMenu({
  changeRegion,
  changeRealm,
  changeName,
  changeCharacterData,
  changeAccessToken,
  changeLocale,
  locale,
  isOpen,
  changeIsOpen,
}) {
  const [serverListExist, setServerListExist] = useState(null);
  const [servers, setServers] = useState([]);
  const [region, setRegion] = useState("eu");
  const [server, setServer] = useState("Aegwynn");
  const [name, setName] = useState("");
  const [error, setError] = useState(null); // Gérer les erreurs'

  async function serverList() {
    const accessToken = await getAccessToken(region);
    const servers = await getServer(accessToken, region);

    if (!serverListExist) {
      const serverNames = servers
        .map((server) => ({ name: server.name, slug: server.slug }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setServers(serverNames);
      setServerListExist(true);
      //console.log(serverNames);
    }
  }
  function handleChangeLocale(e) {
    if (e.target.value === "eu") {
      changeLocale("en_GB");
    }
    if (e.target.value === "us") {
      changeLocale("en_US");
    }
    setRegion(e.target.value.toLowerCase());
    //serverList();
  }
  function handleChangeServer(e) {
    setServer(e.target.value);
  }
  async function getInformations() {
    if (name !== "") {
      try {
        const accessToken = await getAccessToken(region);
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

        changeName(name);
        changeRegion(region);
        changeRealm(server);
        changeCharacterData(characterData);
        changeAccessToken(accessToken);
        if (isOpen) {
          changeIsOpen(!isOpen);
        }

        document.title = `${name}-${
          server.at(0).toUpperCase() + server.slice(1)
        } [${region.toUpperCase()}] | Wow Character`;
      } catch (error) {
        console.error("Error fetching character information:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "An error occurred while fetching character information.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Veuillez entrer un nom de personnage.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  //console.log(`${region} ${locale} ${server} ${name}`);
  useEffect(() => {
    serverList();

    setRegion(document.getElementById("region").value.toLowerCase());
    setServer(document.getElementById("servers").value.toLowerCase());
  }, []);
  //console.log(region, locale, server, name);

  return (
    <div
      className={`flex justify-center items-center sm:p-2 w-full absolute sm:relative ease-in-out duration-200 ${
        isOpen
          ? "top-[120px] left-[1px] "
          : "top-[120px] left-[-1px] -translate-x-[110dvw] sm:-translate-x-0"
      }`}
    >
      <div className="flex flex-wrap sm:flex-nowrap justify-center gap-1 p-1 bg-gray-600 sm:w-fit w-full rounded-[calc(theme(borderRadius.lg)+1px)] sm:rounded-[calc(2rem+1px)] ">
        <select
          id="region"
          className="h-12 border border-gray-300 text-gray-600 text-base block sm:w-24 w-full py-2.5 px-4 focus:outline-none rounded-[calc(theme(borderRadius.lg)+1px)] sm:rounded-l-[calc(2rem+1px)]"
          value={region}
          onChange={(e) => handleChangeLocale(e)}
        >
          <option value="eu" defaultValue={true}>
            EU
          </option>
          <option value="us">US</option>
        </select>

        <select
          id="servers"
          className="h-12 sm:w-48 w-full border border-gray-300 text-gray-600 text-base rounded-[calc(theme(borderRadius.lg)+1px)] overflow-auto py-2.5 px-4 focus:outline-none"
          value={server}
          onChange={(e) => {
            setServer(e.target.value.toLowerCase());
            e.target.size = 1; // Ferme la liste après sélection
          }}
        >
          {servers.map((server, index) => (
            <option
              className="[&>option]:p-1 [&>option]:cursor-pointer"
              key={index}
              value={server.slug}
              onChange={(e) => handleChangeServer(e)}
            >
              {server.name}
            </option>
          ))}
        </select>

        <input
          id="personnage"
          className="h-12 sm:w-48 w-full border border-gray-300 text-gray-600 text-base rounded-[calc(theme(borderRadius.lg)+1px)] block  py-2.5 px-4 focus:outline-none"
          placeholder="Personnage"
          value={name} // Lier l'input à l'état React
          onChange={(e) => setName(e.target.value)} // Mettre à jour l'état à chaque changement
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getInformations();
            }
          }}
        />

        <button
          id="searchBtn"
          onClick={getInformations} // Appel de la fonction changeText lors du clic
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[calc(theme(borderRadius.lg)+1px)] sm:rounded-r-[calc(2rem+1px)] sm:w-24 w-full "
        >
          <span className="material-symbols-outlined flex items-center justify-center stroke-2">
            search
          </span>
        </button>
      </div>
    </div>
  );
}

export default SelectMenu;
