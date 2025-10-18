export default async function fetchRecipeImage(recipeName: string): Promise<string> {
    const API_KEY = process.env.PEXELS_API_KEY
    try {
        if (!API_KEY) {
            throw new Error('Pexels API key not found');
        }
        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(recipeName + ' food dish')}&per_page=1&orientation=landscape`,
            {
                headers: {
                    Authorization: API_KEY,
                },
            }
        );

        const data = await response.json();

        if (data.photos && data.photos.length > 0) {
            return data.photos[0].src.large;
        }
        return '';
    } catch (e) {
        console.error(e);
        return '';
    }
}