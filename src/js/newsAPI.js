const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = `https://api.mediastack.com/v1/news?access_key=${API_KEY}&languages=en`

export async function fetchNews() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`)
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Could not fetch news:", error);
        return [];
    }
}