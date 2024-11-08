import { load, API_Search } from "../constants/constants.js";
import { smallCard } from "../../components/smallCard.js";
import { showErrorToast } from "../effects/toasts.js";


export async function searchApi() {
    const searchTerm = load("search");
    if (!searchTerm) {
        showErrorToast("Please enter a search term."); // Error if search term is missing
        return;
    }
    try {
        const response = await fetch(`${API_Search}${searchTerm}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            showErrorToast("No listings matching your search have been found.");
            return;
        }

        const result = await response.json();
        let data = result.data;

        // Filter for whole-word matches only
        const searchRegex = new RegExp(`\\b${searchTerm}\\b`, 'i'); // Matches whole word, case-insensitive
        data = data.filter(item => 
            searchRegex.test(item.name) || searchRegex.test(item.description)
        );

        // Check if any data matches the search criteria
        if (data.length === 0) {
            showErrorToast("No listings matching your search have been found.");
        } else {
            displaySearchItems(data); // Display matching items
        }
      
    } catch (error) {
        console.error("Error fetching listings:", error);
    }
}
        
async function displaySearchItems(data) {
    const listingsContainer = document.getElementById("listingItemsContainer");
    listingsContainer.innerHTML = "";
    const cardPromises = data.map(async (item) => smallCard({ ...item }));
    const cardsHTML = await Promise.all(cardPromises);
    listingsContainer.innerHTML += cardsHTML.join("");
} 


