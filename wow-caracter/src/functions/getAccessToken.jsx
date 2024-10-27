const clientId = "8f136d01a5984067a9a34b3274b196bf";
const clientSecret = "uG05W1R1PfFcBo79cd70EpANMsvU4eSe";
const tokenUrl = `https://eu.battle.net/oauth/token`;

async function getAccessToken() {
    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Error obtaining access token:", error);
      throw error;
    }
  }

  export default getAccessToken;
