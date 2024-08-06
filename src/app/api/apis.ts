import axios from 'axios';

const unsplashApi = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
    }
});

async function searchStockPhotos(
    query: string, 
    page: number = 5, 
    per_page: number = 10, 
    order_by: "latest" | "relevant" = "relevant", 
    color: "black_and_white" | "black" | "white" | "yellow" | "orange" | "red" | "purple" | "magenta" | "green" | "teal" | "blue" | "" = "", 
    orientation: "landscape" | "portrait" | "squarish" | "" = ""
) {
    try {
        const response = await unsplashApi.get('/search/photos', {
            params: { query, page, per_page, order_by, color, orientation }
        });

        console.log(response.data);

        return { success: true, message: "got photos", photos: response }
    } catch (error) {
        console.log("API -> searchStockPhotos: Error", error);
        return { success: false, message: "Internal Servererror" }
    }
}

searchStockPhotos("Tree", 5, 10);

export {
    searchStockPhotos,
}