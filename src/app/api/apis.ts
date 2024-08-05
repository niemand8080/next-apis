import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'f4YCZYMR5L2xmwAWdylVOVEt4rZDy-FF_u3Eep1Z5FU';

const unsplashApi = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
    }
});

async function searchStockPhotos(query: string) {
    try {
        const response = await unsplashApi.get('/search/photos', {
            params: { query }
        });

        console.log(response)

        return { success: true, message: "got photos", photos: response }
    } catch (error) {
        console.log("API -> searchStockPhotos: Error");
        return { success: false, message: "Internal Servererror" }
    }
}

export {
    searchStockPhotos,
}