async function getServer(token, region) {
  const baseUrl = `https://${region}.api.blizzard.com`;
  const urlApi = `${baseUrl}/data/wow/realm/index?namespace=dynamic-${region}&locale=${
    region === "eu" ? "en_GB" : "en_US"
  }`;
  const response = await fetch(urlApi, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des serveurs.");
  }
  const data = await response.json();
  console.log(data);
  return data.realms;
}

export default getServer;
