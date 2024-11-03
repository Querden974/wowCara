import { useState, useEffect } from "react";
import getAccessToken from "../functions/getAccessToken";
import getServer from "../functions/getServer";

import getInformations from "../functions/GetInformations";

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
  name,
  region,
  realm,
  accessToken,
}) {
  const [serverListExist, setServerListExist] = useState(null);
  const [servers, setServers] = useState([]);
  const [valid, setValid] = useState(false);

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
    changeRegion(e.target.value.toLowerCase());
  }

  function handleChangeServer(e) {
    changeRealm(e.target.value);
  }
  function handleSearch() {
    getInformations(
      name,
      region,
      realm,
      locale,
      changeCharacterData,
      changeAccessToken,
      accessToken,
      isOpen,
      changeIsOpen
    );
  }
  useEffect(() => {
    serverList();
    const params = new URLSearchParams(window.location.search);
    if (params.toString().length > 0) {
      changeName(params.get("name"));
      changeRegion(params.get("region"));
      changeRealm(params.get("realm"));
      changeLocale(params.get("locale"));
      setValid(true);
      getInformations(
        name,
        region,
        realm,
        locale,
        changeCharacterData,
        changeAccessToken,
        accessToken,
        isOpen,
        changeIsOpen,
        valid,
        setValid
      );
    }
  });

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
          value={realm}
          onChange={(e) => {
            changeRealm(e.target.value.toLowerCase());
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
          onChange={(e) => {
            changeName(e.target.value);
            //console.log(name);
          }} // Mettre à jour l'état à chaque changement
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button
          id="searchBtn"
          onClick={handleSearch} // Appel de la fonction changeText lors du clic
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
