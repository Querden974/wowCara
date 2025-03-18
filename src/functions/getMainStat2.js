export default async function getMainStat2(data, accessToken) {
  const url = data.active_spec.key.href;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const dataResponse = await response.json();
  //console.log(dataResponse);
  return dataResponse;
}
