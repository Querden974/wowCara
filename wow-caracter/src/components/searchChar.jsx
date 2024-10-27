import { useState, useEffect } from "react";

function SearchChar() {
  const [characterName, setCharacterName] = useState(""); // Stocker la valeur de l'input pour le personnage
  const [serverName, setServerName] = useState(""); // Stocker la valeur de l'input pour le serveur
  const [characterData, setCharacterData] = useState(null); // Stocker les données récupérées du personnage
  const [error, setError] = useState(null); // Gérer les erreurs
  const [render, setRender] = useState(null)
  const [token, setToken] = useState(null);


  const clientId = "8f136d01a5984067a9a34b3274b196bf";
  const clientSecret = "uG05W1R1PfFcBo79cd70EpANMsvU4eSe";
  const tokenUrl = `https://eu.battle.net/oauth/token`;

  // Fonction pour obtenir le token d'accès
  async function getAccessToken() {
    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      //console.log("Access token obtained:", data.access_token);
      setToken(data.access_token);



      
    } catch (error) {
      //console.error("Error obtaining access token:", error);
      throw error;
    }
  }
  getAccessToken();

  // Fonction pour obtenir les informations du personnage
  async function getCharacterInfo(realm, characterName) {
    console.log(token);
    const apiUrl = `https://eu.api.blizzard.com/profile/wow/character/${realm}/${characterName}?namespace=profile-eu&locale=fr_FR`;
    
    try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const characterData = await response.json();
        console.log(characterData);
        return characterData;
    } catch (error) {
        console.error('Erreur lors de la récupération des données du personnage:', error);
    }
}

  async function getCharacterApp(realm, name) {
    const apiUrl = `https://eu.api.blizzard.com/profile/wow/character/${realm}/${name}/character-media?namespace=profile-eu&locale=fr_FR`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des informations du personnage.');
    }

    const characterApp = await response.json();
    return characterApp;
  }

  // Fonction appelée lors du clic sur le bouton "Set"
  async function changeText() {
    if (!serverName || !characterName) {
      setError("Veuillez entrer un nom de serveur et de personnage.");
      return;
    }
    
    setError(null);

    if (render) {
      const imageRender = document.getElementById("imageRender");
      const imageDiv = document.getElementById("imageDiv");
      if (imageRender) imageRender.remove();
      if (imageDiv) imageDiv.remove();
      setRender(false);
    }

    try {
      
      const realm = serverName.toLowerCase();
      const name = characterName.toLowerCase();
      
      const data = await getCharacterInfo(realm, name);
      const dataApp = await getCharacterApp(realm, name);
      console.log("Character data:", dataApp);
      setCharacterData(data);

      // Utiliser des références React ou vérifier l'existence des éléments avant de les manipuler
      const nomPersonnage = document.getElementById("nomPersonnage");
      const servPersonnage = document.getElementById("servPersonnage");
      const ilvlPersonnage = document.getElementById("ilvlPersonnage");

      nomPersonnage.textContent = data.name;
      servPersonnage.textContent = data.realm.name;
      ilvlPersonnage.textContent = data.average_item_level;

      const imageSrc = dataApp.assets.find(asset => asset.key === 'main-raw')?.value;
      const Info = document.getElementById('characterInfo');

      
        const imageDiv = document.createElement("div");
        imageDiv.className = "w-[600px] h-auto overflow-hidden";
        imageDiv.id = "imageDiv";

        const image = document.createElement("img");
        image.src = imageSrc;
        image.id = "imageRender";
        image.className = "flex relative object-cover w-full h-full -left-[150px] -top-[50px]";

        imageDiv.append(image);
        Info.append(imageDiv);
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
