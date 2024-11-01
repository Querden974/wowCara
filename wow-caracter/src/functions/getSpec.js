export default async function getSpec(
  accessToken,
  region,
  server,
  name,
  locale
) {
  const url = `https://${region}.api.blizzard.com/profile/wow/character/${server}/${name}/specializations?namespace=profile-${region}&locale=${locale}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const dataResponse = await response.json();
  //console.log(dataResponse);
  return dataResponse;
}
