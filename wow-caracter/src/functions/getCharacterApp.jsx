// Fonction pour obtenir les images du personnage
async function getCharacterApp(token,region,realm, name) {
  const baseUrl = `https://${region}.api.blizzard.com`;
  const apiUrl = `${baseUrl}/profile/wow/character/${realm}/${name}/character-media?namespace=profile-eu&locale=en_GB`;
  
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

export default getCharacterApp;
