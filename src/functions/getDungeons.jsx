import getAccessToken from "./getAccessToken";

const seasonDungeonId = [
    [503,"ARAK"],
    [502,"COT"],
    [505,"DAWN"],
    [501,"SV"],
    [507,"GB"],
    [375,"MISTS"],
    [376,"NW"],
    [353,"SIEGE"],
]
async function listDungeon(token, region){
    async function getDungeons(slug){
    var locale

    if(region === "eu"){
        locale = "en_GB"
    }
    if(region === "us"){
        locale = "en_US"
    }

    

    const baseUrl = `https://${region}.api.blizzard.com`;
    
    const apiUrl = `${baseUrl}/data/wow/mythic-keystone/dungeon/${slug}?namespace=dynamic-${region}&locale=${locale}`;
    const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    if(!response.ok){
        throw new Error("Erreur lors de la récupération des données des donjons.")
    }
    const data = await response.json()
    return data.zone.slug
    }

    
    const dungeons = []
    for(let i = 0; i < seasonDungeonId.length; i++){
        const dungeonSlug = await getDungeons(seasonDungeonId[i][0])
        const dungeonImgUrl = `https://render.worldofwarcraft.com/eu/zones/${dungeonSlug}-small.jpg`
        dungeons.push({name:dungeonSlug,shortName:seasonDungeonId[i][1], img:dungeonImgUrl})
    }
    return dungeons
}


export default listDungeon