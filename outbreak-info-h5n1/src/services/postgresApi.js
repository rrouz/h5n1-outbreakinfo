const PG_ISOLATION_ENDPOINT = "http://kenny:8000/count/samples/by/isolation_source";
const PG_HOST_ENDPOINT = "http://kenny:8000/count/samples/by/host";

export async function getIsolationSourceDistribution(size = 20) {
  try {
    const response = await fetch(PG_ISOLATION_ENDPOINT);
    const data = await response.json();
    
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
    const response = await fetch(PG_HOST_ENDPOINT);
    const data = await response.json();
    
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