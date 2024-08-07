import { createApi } from "unsplash-js"

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!UNSPLASH_ACCESS_KEY) {
    throw new Error('UNSPLASH_ACCESS_KEY is not set in environment variables');
}

const unsplash = createApi({ accessKey: UNSPLASH_ACCESS_KEY })

async function searchStockPhotos(
    query: string, 
    page: number = 1, 
    per_page: number = 1, 
    order_by: "latest" | "relevant" = "relevant", 
    color: "black_and_white" | "black" | "white" | "yellow" | "orange" | "red" | "purple" | "magenta" | "green" | "teal" | "blue", 
    orientation: "landscape" | "portrait" | "squarish"
) {
    try {
        const photos = await unsplash.search.getPhotos({ query, page, perPage: per_page, orderBy: order_by, orientation, color });

        console.log(photos.response?.results[0]);

       return { success: true, message: "Successfully retrieved photos", photos: photos.response?.results }
    } catch (error) {
        console.error("API -> searchStockPhotos: Unexpected Error", error);
        return { success: false, message: "An unexpected error occurred" }
    }
}

export {
    searchStockPhotos,
}