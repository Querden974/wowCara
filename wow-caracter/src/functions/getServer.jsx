
async function getServer(token, region){
    const baseUrl = `https://${region}.api.blizzard.com`;
    const urlApi = `${baseUrl}/data/wow/realm/index?namespace=dynamic-${region}&locale=en_GB`;
    const response = await fetch(urlApi, {
        headers: {
            Authorization: `Bearer ${token}`,
            
        }
    });
    if(!response.ok){
        throw new Error('Erreur lors de la récupération des serveurs.')
    }
    const data = await response.json();
    return data.realms;

}

export default getServer;