// Fonction pour obtenir les images du personnage
async function getCharacterApp(token, region, realm, name, locale) {
  const baseUrl = `https://${region}.api.blizzard.com`;
  const apiUrl = `${baseUrl}/profile/wow/character/${realm}/${name}/character-media?namespace=profile-${region}&locale=${locale}`;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      Swal.fire({
        title: "Personnage introuvable",
        text: "Vérifiez le nom et le serveur",
        icon: "question",
        timer: 2000,
        showConfirmButton: false,
      });
      throw new Error(
        "Erreur lors de la récupération des informations du personnage."
      );
    }
  }

  const characterApp = await response.json();
  return characterApp;
}

export default getCharacterApp;
