
// Fonction pour obtenir les informations du personnage
async function getCharacterInfo(token,region,realm, characterName) {
  const baseUrl = `https://${region}.api.blizzard.com`;
    const apiUrl = `${baseUrl}/profile/wow/character/${realm}/${characterName}?namespace=profile-${region}&locale=en_GB`;
    
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
      return characterData;
    } catch (error) {
      console.error('Erreur lors de la récupération des données du personnage:', error);
      throw error;
    }
  }

  export default getCharacterInfo;
