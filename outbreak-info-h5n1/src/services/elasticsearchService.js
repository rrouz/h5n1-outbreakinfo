export async function executeElasticsearchQuery(endpoint, queryBody) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(queryBody)
  });
  
  return await response.json();
}

export function createTermsAggregationQuery(field, size = 20) {
  return {
    aggs: {
      results: {
        terms: { field: field, size: size }
      }
    },
    size: 0
  };
}

export function transformTermsAggregation(response) {
  return response.aggregations.results.buckets.map(item => ({
    key: item.key,
    value: item.doc_count
  }));
}