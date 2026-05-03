const axios = require('axios');
const NodeCache = require('node-cache');

// Initialize cache with 60 seconds TTL (Time To Live)
const myCache = new NodeCache({ stdTTL: 60 });

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * Fetch cryptocurrency prices from CoinGecko with caching
 * @returns {Promise<Object>} Formatted data
 */
const fetchData = async () => {
  const cacheKey = 'crypto_prices';
  
  // Check cache before making API call
  const cachedData = myCache.get(cacheKey);
  if (cachedData) {
    console.log('Serving from cache');
    return cachedData;
  }

  try {
    console.log('Fetching new data from API');
    const response = await axios.get(`${API_BASE_URL}/simple/price`, {
      params: {
        ids: 'bitcoin,ethereum',
        vs_currencies: 'usd',
        include_24hr_change: 'true'
      },
      timeout: 5000
    });

    // Clean response formatting
    const formattedData = {
      bitcoin: {
        price: response.data.bitcoin.usd,
        change24h: response.data.bitcoin.usd_24h_change
      },
      ethereum: {
        price: response.data.ethereum.usd,
        change24h: response.data.ethereum.usd_24h_change
      },
      timestamp: new Date().toISOString(),
      source: 'live'
    };

    // Store in cache
    myCache.set(cacheKey, { ...formattedData, source: 'cache' });

    return formattedData;
  } catch (error) {
    console.error('API Service Error:', error.message);
    throw new Error('External API failure: Unable to fetch crypto data');
  }
};

module.exports = {
  fetchData
};
