const axios = require('axios');

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * Fetch cryptocurrency prices from CoinGecko
 * @returns {Promise<Object>} Formatted data
 */
const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/simple/price`, {
      params: {
        ids: 'bitcoin,ethereum',
        vs_currencies: 'usd',
        include_24hr_change: 'true'
      },
      timeout: 5000
    });

    // Clean response formatting - Return only useful data
    return {
      bitcoin: {
        price: response.data.bitcoin.usd,
        change24h: response.data.bitcoin.usd_24h_change
      },
      ethereum: {
        price: response.data.ethereum.usd,
        change24h: response.data.ethereum.usd_24h_change
      },
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('API Service Error:', error.message);
    // Pass the error to be handled by the error middleware later
    throw new Error('External API failure: Unable to fetch crypto data');
  }
};

module.exports = {
  fetchData
};
