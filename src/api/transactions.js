async function getTransactions(wallet, block) {
  const URL = `https://api.etherscan.io/v2/api?chainid=1&apikey=${import.meta.env.VITE_API_TOKEN}&module=account&action=txlist&address=${wallet}&startblock=${block}&endblock=99999999&sort=asc`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default getTransactions;
