function convertMStoTimer(ms){
    const minutes = Math.floor(ms / 60000); // Divise par 60000 pour obtenir le nombre de minutes
    const seconds = Math.floor((ms % 60000) / 1000); // Utilise le reste pour obtenir les secondes
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
export default convertMStoTimer