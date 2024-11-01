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
}) {
  const [serverListExist, setServerListExist] = useState(null);
  const [servers, setServers] = useState([]);
  const [region, setRegion] = useState("eu");
  const [server, setServer] = useState("Aegwynn");
  const [name, setName] = useState("");
  const [error, setError] = useState(null); // Gérer les erreurs'

  const [size, setSize] = useState(1);
  const handleFocus = () => setSize(10);
  const handleBlur = () => setSize(1);

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
      //console.log(mainStat);
      changeName(name);
      changeRegion(region);
      changeRealm(server);
      changeCharacterData(characterData);
      changeAccessToken(accessToken);
      console.log(characterData);
      document.title = `${name}-${
        server.at(0).toUpperCase() + server.slice(1)
      } [${region.toUpperCase()}] | Wow Character`;
      //ShowInfo(name, data, dataApp, dataRaiderIO);
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
    <div className="flex justify-center items-center p-2">
      <div className="flex justify-center gap-1 p-1 bg-gray-600  w-fit rounded-[calc(2rem+1px)] ">
        <select
          id="region"
          className="h-12 border border-gray-300 text-gray-600 text-base block w-fit py-2.5 px-4 focus:outline-none rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]"
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
          className="h-12  w-[210px] border border-gray-300 text-gray-600 text-base rounded-[calc(theme(borderRadius.lg)+1px)] overflow-auto py-2.5 px-4 focus:outline-none"
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
          className="h-12 w-[210px] border border-gray-300 text-gray-600 text-base rounded-[calc(theme(borderRadius.lg)+1px)] block  py-2.5 px-4 focus:outline-none"
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[calc(theme(borderRadius.lg)+1px)] rounded-r-[calc(2rem+1px)]"
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
