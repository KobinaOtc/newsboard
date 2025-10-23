const API_BASE_URL = 'https://api.frankfurter.dev/'

/**
 * Fetches the latest exchange rates for a given base currency.
 * @param {string} base - The base currency (e.g., 'USD').
 * @param {string[]} symbols - An array of currency symbols to get rates for (e.g., ['EUR', 'GBP']).
 * @returns {Promise<object>} - The latest exchange rates.
*/

export async function fetchLatestRates(base = 'USD', symbols = []) {
    const symbolsString = symbols.length > 0 ? `&symbols=${symbols.join(',')}` : ''
    // The latest rates endpoint is '/latest' not '/v1/latest'
    const url = `${API_BASE_URL}latest?base=${base}${symbolsString}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error('Could not fetch latest rates:', error);
        return {};
    }
}

/**
 * Fetches a time-series of historical rates for a given currency pair.
 * @param {string} base - The base currency (e.g., 'USD').
 * @param {string} symbol - The target currency (e.g., 'EUR').
 * @param {string} startDate - Start date in 'YYYY-MM-DD' format.
 * @returns {Promise<object>} - The historical exchange rates.
 */
export async function fetchTimeSeries(base = 'USD', symbol = 'EUR', startDate = '2024-01-01') {
    // Get the current date to use as the end date
    const today = new Date().toISOString().split('T')[0];
    // Correct the URL to use the 'v1' prefix and the proper date range format
    const url = `${API_BASE_URL}v1/${startDate}..${today}?from=${base}&to=${symbol}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error("Could not fetch historical data:", error);
        return {};
    }
}

/**
 * Fetches a list of all supported currency symbols.
 * @returns {Promise<object>} - A dictionary of currency symbols and their full names.
 */
export async function fetchSupportedCurrencies() {
    // Correct the URL to use the 'v1' prefix
    const url = `${API_BASE_URL}v1/currencies`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch supported currencies:", error);
        return {};
    }
}