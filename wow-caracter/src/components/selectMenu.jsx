import { useState, useEffect } from "react";
import getAccessToken from "../functions/getAccessToken";
import getServer from "../functions/getServer";
import getCharacterInfo from "../functions/getCharacterInfo";
import getCharacterApp from "../functions/getCharacterApp";
import ShowInfo from "../functions/showInfo";
import getRaiderIO from "../functions/getRaiderIO";
import listDungeon from "../functions/getDungeons";
function SelectMenu({ changeRegion, changeRealm, changeName }) {
  const [serverListExist, setServerListExist] = useState(null);
  const [servers, setServers] = useState([]);
  const [region, setRegion] = useState("eu");
  const [server, setServer] = useState("hyjal");
  const [name, setName] = useState("");
  const [error, setError] = useState(null); // Gérer les erreurs

  async function serverList() {
    const accessToken = await getAccessToken(region);
    const servers = await getServer(accessToken, region);

    if (!serverListExist) {
      const serverNames = servers
        .map((server) => server.name)
        .sort((a, b) => a.localeCompare(b));
      setServers(serverNames);
      setServerListExist(true);
    }
  }

  async function getInformations() {
    //console.log(region, server, name);
    const accessToken = await getAccessToken(region);
    if (name !== "") {
      const [data, dataApp, dataRaiderIO, dataDungeons] = await Promise.all([
        getCharacterInfo(accessToken, region, server, name.toLowerCase()),
        getCharacterApp(accessToken, region, server, name.toLowerCase()),
        getRaiderIO(region, server, name.toLowerCase()),
        listDungeon(accessToken, region),
      ]);
      //console.log(dataDungeons);
      //console.log(dataRaiderIO);

      changeName(name);
      changeRegion(region);
      changeRealm(server);

      ShowInfo(name, data, dataApp, dataRaiderIO);
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

  useEffect(() => {
    serverList();

    setRegion(document.getElementById("region").value.toLowerCase());
    setServer(document.getElementById("servers").value.toLowerCase());
  }, []);

  return (
    <div className="flex justify-center items-center p-2">
      <div className="flex justify-center gap-1 p-1 bg-gray-600  w-fit rounded-[calc(2rem+1px)] ">
        <select
          id="region"
          className="h-12 border border-gray-300 text-gray-600 text-base block w-fit py-2.5 px-4 focus:outline-none rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]"
          value={region}
          onChange={(e) => {
            setRegion(e.target.value.toLowerCase());
            serverList();
            console.log();
          }}
        >
          <option value="eu" defaultValue={true}>
            EU
          </option>
          <option value="us">US</option>
        </select>
        <select
          id="servers"
          className="h-12 w-[210px] border border-gray-300 text-gray-600 text-base rounded-[calc(theme(borderRadius.lg)+1px)] block  py-2.5 px-4 focus:outline-none "
          value={server}
          onChange={(e) => setServer(e.target.value.toLowerCase())}
        >
          {servers.map((serverNames, index) => (
            <option
              key={index}
              value={serverNames
                .replace(/\s+/g, "-")
                .replace("'", "-")
                .toLowerCase()}
            >
              {serverNames}
            </option>
          ))}
        </select>

        <input
          id="personnage"
          className="h-12 w-[210px] border border-gray-300 text-gray-600 text-base rounded-[calc(theme(borderRadius.lg)+1px)] block  py-2.5 px-4 focus:outline-none"
          placeholder="Personnage"
          value={name} // Lier l'input à l'état React
          onChange={(e) => setName(e.target.value)} // Mettre à jour l'état à chaque changement
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

export default SelectDefault;
