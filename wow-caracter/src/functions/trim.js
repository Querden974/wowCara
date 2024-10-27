import sharp from 'sharp'
const axios = require('axios');


// Chemin de votre image
const imageUrl  = 'https://render.worldofwarcraft.com/eu/character/hyjal/250/217575930-main-raw.png';

async function processImageAndReturnUrl(url) {
    try {
      // Télécharger l'image en mémoire
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'arraybuffer' // Télécharger l'image dans un Buffer
      });
  
      const imageBuffer = Buffer.from(response.data);
  
      // Traitement de l'image avec Sharp
      const processedImageBuffer = await sharp(imageBuffer)
        .trim() // Retire les espaces en trop, si nécessaire
        .toBuffer();
  
      // Convertir l'image traitée en Data URL (base64)
      const base64Image = processedImageBuffer.toString('base64');
      const dataUrl = `data:image/png;base64,${base64Image}`; // Remplacez 'jpeg' par le bon type MIME
  
      console.log('Image traitée avec succès et convertie en URL !');
      return dataUrl;
    } catch (error) {
      console.error('Erreur lors du traitement de l\'image:', error);
    }
  }
  
  export default processImageAndReturnUrl
  // processImageAndReturnUrl(imageUrl).then(dataUrl => {
  //   console.log('Data URL:', dataUrl); // Cette URL peut être utilisée dans un <img> ou envoyée à une API
  // });