import fetch from 'node-fetch';

const API_KEY = process.env.SKYBLOCK_API_KEY;

async function getItemData(itemId: string) {
    if (!API_KEY) return { success: false, message: "NO API KEY!!!" };
    try {
        const response = await fetch(`https://api.hypixel.net/resources/skyblock/items`, {
          headers: {
            'API-Key': API_KEY
          }
        });
    
        if (!response.ok) {
          return { success: false, message: "HTTP error!", status: response.status }
        }
    
        const data: any = await response.json();
        console.log(data);
        
        // Suche nach dem spezifischen Item in den zurückgegebenen Daten
        const item = data.items.find((item: any) => item.id === itemId);
    
        if (item) {
          console.log(`Daten für ${itemId}:`, item);
        } else {
          console.log(`Item ${itemId} nicht gefunden.`);
        }
        return { success: true, message: "Got Item!", item }
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        return { success: false, message: "Internal Servererror", error }
      }
}

export {
    getItemData
}