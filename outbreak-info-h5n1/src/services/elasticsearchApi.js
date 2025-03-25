import { executeElasticsearchQuery, createTermsAggregationQuery, transformTermsAggregation } from './elasticsearchService.js';

const ES_ENDPOINT = "http://kenny:9200/metadata/_search";

/**
 * Get field distribution
 */
export async function getFieldDistribution(field, size = 20) {
  try {
    const query = createTermsAggregationQuery(field, size);
    const response = await executeElasticsearchQuery(ES_ENDPOINT, query);
    return transformTermsAggregation(response);
  } catch (error) {
    console.error(`Error fetching ${field} distribution:`, error.message);
    throw error;
  }
}

/**
 * Get isolation source distribution
 */
export async function getIsolationSourceDistribution(size = 20) {
  return getFieldDistribution("isolation_source", size);
}