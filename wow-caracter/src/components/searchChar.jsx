import { useState, useEffect } from "react";
import getAccessToken from "../functions/getAccessToken";
import getCharacterInfo from "../functions/getCharacterInfo";
import getCharacterApp from "../functions/getCharacterApp";

const colors = {
  "warrior" : "text-warrior",
  "paladin" : "text-paladin",
  "hunter" : "text-hunter",
  "rogue" : "text-rogue",
  "priest" : "text-priest",
  "deathknight" : "text-deathknight",
  "shaman" : "text-shaman",
  "mage" : "text-mage",
  "warlock" : "text-warlock",
  "druid" : "text-druid",
  "demonhunter" : "text-demonhunter",
  "evoker" : "text-evoker",
  "monk" : "text-monk"
}


function SearchChar() {
  const [characterName, setCharacterName] = useState(""); // Stocker la valeur de l'input pour le personnage
  const [serverName, setServerName] = useState(""); // Stocker la valeur de l'input pour le serveur
  const [characterData, setCharacterData] = useState(null); // Stocker les données récupérées du personnage
  const [error, setError] = useState(null); // Gérer les erreurs
  const [render, setRender] = useState(null);



  const clientId = "8f136d01a5984067a9a34b3274b196bf";
  const clientSecret = "uG05W1R1PfFcBo79cd70EpANMsvU4eSe";
  const tokenUrl = `https://eu.battle.net/oauth/token`;
  const baseUrl = `https://eu.api.blizzard.com`;


  // Fonction appelée lors du clic sur le bouton "Set"
  async function changeText() {
    if (!serverName || !characterName) {
      setError("Veuillez entrer un nom de serveur et de personnage.");
      return;
    }
    
    setError(null);

    // Si le personnage est déjà affiché, on le supprime
    if (render) {
      const imageRender = document.getElementById("imageRender");
      const imageDiv = document.getElementById("imageDiv"); 
      const guildMain = document.getElementById("guildMain");
      const nameMain = document.getElementById("nameMain");
      if (imageRender) imageRender.remove();
      if (imageDiv) imageDiv.remove();
      if (guildMain) guildMain.remove();
      if (nameMain) nameMain.remove();
      setRender(false);
    }

    // On récupère les données du personnage
    try {
      const token = await getAccessToken();
      const realm = serverName.toLowerCase();
      const name = characterName.toLowerCase();

      const [ data, dataApp] = await Promise.all([
        getCharacterInfo(token, realm, name),
        getCharacterApp(token, realm, name)
      ]);

      
      setCharacterData(data);

      
      // Utiliser des références React ou vérifier l'existence des éléments avant de les manipuler
      const nomPersonnage = document.getElementById("nomPersonnage");
      const servPersonnage = document.getElementById("servPersonnage");
      const ilvlPersonnage = document.getElementById("ilvlPersonnage");

      nomPersonnage.textContent = data.name;
      servPersonnage.textContent = data.realm.name;
      ilvlPersonnage.textContent = data.average_item_level;
      

      // On récupère l'image du personnage
      const imageSrc = dataApp.assets.find(asset => asset.key === 'main-raw')?.value;
      const Render = document.getElementById('characterRender');
      
      // On crée les éléments pour afficher le personnage
      const color = data.character_class.name.toLowerCase().replace(/\s+/g, '');
      const nameMain = document.createElement("p");
      nameMain.textContent = data.name;
      nameMain.className = `flex relative text-4xl font-bold justify-center top-[100px] font-mono `;
      nameMain.classList.add(colors[color]);
      nameMain.id = "nameMain";

      const guildMain = document.createElement("p");
      guildMain.textContent = `<${data.guild.name}>`;
      guildMain.className = `flex relative text-1xl font-bold justify-center top-[100px]  font-mono `;
      guildMain.classList.add(colors[color]);
      guildMain.id = "guildMain";
     

        const imageDiv = document.createElement("div");
        imageDiv.className = "w-full h-full ";
        imageDiv.id = "imageDiv";
        imageDiv.className = "flex flex-col justify-center items-center";

        const image = document.createElement("img");
        image.src = imageSrc;
        image.id = "imageRender";
        image.className = "flex relative object-cover w-[600px] h-[850px] -top-[60px] ";

      
        
        imageDiv.append(image);
        Render.append(nameMain);
        Render.append(guildMain);
        Render.append(imageDiv);
        setRender(true);
      

    } catch (error) {
      console.error("Error in changeText:", error);
      setError(error.message);
    }
  }




  return (
    <div className="flex flex-row gap-4 w-full  justify-center bg-primary">
      <div className="flex gap-2">
        <input
          id="server"
          className="w-40 bg-slate-100 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Serveur"
          value={serverName} // Lier l'input à l'état React
          onChange={(e) => setServerName(e.target.value)} // Mettre à jour l'état à chaque changement
        />
        <input
          id="personnage"
          className="w-40 bg-slate-100 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Personnage"
          value={characterName} // Lier l'input à l'état React
          onChange={(e) => setCharacterName(e.target.value)} // Mettre à jour l'état à chaque changement
        />
        <button
          id="searchBtn"
          onClick={changeText} // Appel de la fonction changeText lors du clic
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Set
        </button>
      </div>

     
    </div>
  );
}

export default SearchChar;
