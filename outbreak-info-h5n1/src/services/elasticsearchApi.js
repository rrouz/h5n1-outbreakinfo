const ES_BASE_URL = "http://kenny:9200/";

async function makeRequest(index, query) {
  const endpoint = `${ES_BASE_URL}${index}/_search`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  });
  
  return await response.json();
}

export async function getHostDistribution(size = 20) {
  const query = {
    aggs: {
      results: {
        terms: { field: "Host", size: size }
      }
    },
    size: 0
  };
  
  const response = await makeRequest("metadata", query);
  
  const formattedData = response.aggregations.results.buckets.map(item => ({
    key: item.key,
    value: item.doc_count
  }));
  
  return formattedData.sort((a, b) => b.value - a.value);
}

export async function getIsolationSourceDistribution(size = 20) {
  const query = {
    aggs: {
      results: {
        terms: { field: "isolation_source", size: size }
      }
    },
    size: 0
  };
  
  const response = await makeRequest("metadata", query);
  
  const formattedData = response.aggregations.results.buckets.map(item => ({
    key: item.key,
    value: item.doc_count
  }));
  
  return formattedData.sort((a, b) => b.value - a.value);
}

export async function getIntrahostVariantDMS(dmsField = "ferret sera escape") {
  const query = {
    query: {
      match: {
        "REGION": "HA"
      }
    },
    aggs: {
      "dms_mutation_agg": {
        composite: {
          sources: [
            { ref: { terms: { field: "REF_AA" } } },
            { pos: { terms: { field: "POS_AA" } } },
            { alt: { terms: { field: "ALT_AA" } } },
            { dms: { terms: { field: dmsField } } }
          ],
          size: 10000
        }
      }
    },
    "size": 0
  };
  
  return await makeRequest("variants", query);
}

export async function getSampleReleaseDates() {
  const query = {
    aggs: {
      release_over_time: {
        date_histogram: { field: "ReleaseDate", calendar_interval: "1d" }
      }
    },
    size: 0
  };
  
  const response = await makeRequest("metadata", query);
  
  return response.aggregations.release_over_time.buckets.map(item => ({
    key: item.key_as_string || item.key,
    value: item.doc_count
  }));
}

export async function getSampleWithMutation(ref_aa, pos_aa, alt_aa, region) {
  const query = {
    query: {
      bool: {
        must: [
          { match: { POS_AA: pos_aa } },
          { match: { ALT_AA: alt_aa } },
          { match: { REF_AA: ref_aa } },
          { match: { REGION: region } },
          { range: { ALT_FREQ: { lte: 0.75 } } }
        ]
      }
    },
    size: 10000
  };
  
  return await makeRequest("variants", query);
}

export async function getTotalCountOfSamples() {
  const query = { size: 0 };
  const response = await makeRequest("metadata", query);
  return response.hits.total.value;
}