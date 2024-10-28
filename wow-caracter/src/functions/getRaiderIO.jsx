async function getRaiderIO(region, realm, name){
    const baseUrl = `https://raider.io`
    const apiUrl = `${baseUrl}/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=raid_progression,talents,mythic_plus_best_runs:all`

    const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            
        }
    })

    if(!response.ok){
        throw new Error("Erreur lors de la récupération des informations du personnage.")
    }

    const data = await response.json()
    return data
}
export default getRaiderIO