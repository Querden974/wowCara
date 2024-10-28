

async function ShowInfo(name, data, dataApp) {
    var render

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
      
    // On récupère les données du personnage
    try {
        if (name === "") {
          setError("Veuillez entrer un nom de serveur et de personnage.");
          return
        }
        
        // Si le personnage est déjà affiché, on le supprime

      
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

      // On crée les éléments pour afficher le nom et le guild du personnage
      const nameMain = document.getElementById("nameMain");
      nameMain.textContent = data.name;
      nameMain.classList.forEach(className => {
        if (className.startsWith('text-')) {
            nameMain.classList.remove(className);
        }
    });
      nameMain.classList.add(colors[color]);
      nameMain.classList.add("text-4xl");
      

      // On crée les éléments pour afficher le guild du personnage
      const guildMain = document.getElementById("guildMain");
      guildMain.textContent = `<${data.guild.name}>`;
      guildMain.classList.forEach(className => {
        if (className.startsWith('text-')) {
            guildMain.classList.remove(className);
        }
    });
    guildMain.classList.add(colors[color]);
    guildMain.classList.add('text-1xl');
    

      // On crée l'image du personnage
        const image = document.getElementById("imageRender");
        image.src = imageSrc;

      
        // On ajoute les éléments pour afficher le nom et le guild du personnage à l'élément Render        
       

        render = true;
      

    } catch (error) {
      console.error("Error in changeText:", error);
      setError(error.message);
    }
  }

  export default ShowInfo;
