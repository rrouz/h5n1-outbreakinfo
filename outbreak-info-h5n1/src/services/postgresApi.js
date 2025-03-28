const PG_BASE_URL = "http://kenny:8000/";

async function makeRequest(endpoint) {
  const url = `${PG_BASE_URL}${endpoint}`;
  const response = await fetch(url); 
  return await response.json();
}

export async function getIsolationSourceDistribution(size = 20) {
  try {
    const data = await makeRequest("count/samples/by/isolation_source");
    
    const formattedData = Array.isArray(data) 
      ? data.map(item => ({ key: item[0], value: item[1] }))
      : Object.entries(data).map(([key, value]) => ({ key, value }));
    
    return formattedData
      .sort((a, b) => b.value - a.value)
      .slice(0, size);
  } catch (error) {
    return [];
  }
}

export async function getHostDistribution(size = 20) {
  try {
    const data = await makeRequest("count/samples/by/host");
    
    const formattedData = Array.isArray(data) 
      ? data.map(item => ({ key: item[0], value: item[1] }))
      : Object.entries(data).map(([key, value]) => ({ key, value }));
    
    return formattedData
      .sort((a, b) => b.value - a.value)
      .slice(0, size);
  } catch (error) {
    return[];
  }
}

export async function getSampleReleaseDate() {
  try {
    const data = await makeRequest("count/samples/by/release_date");
    
    const formattedData = Array.isArray(data) 
      ? data.map(item => ({ key: item[0], value: item[1] }))
      : Object.entries(data).map(([key, value]) => ({ key, value }));
    
    return formattedData.filter(item => item.key && !isNaN(new Date(item.key)));
  } catch (error) {
    return[];
  }
}