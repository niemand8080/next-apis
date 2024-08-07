import axios from "axios";

async function searchInDictionary(word: string) {
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return { success: true, message: "Successfully retrieved word", word: response.data};
  } catch (error) {
    console.error("searchInDictionary -> error", error);
    return { success: false, message: "An unexpected error occurred" }
  }
}

export { searchInDictionary };