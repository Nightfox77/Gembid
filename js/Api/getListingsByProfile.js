import { smallCard } from "../../components/smallCard.js";
import { API_ListingsByProfile, load } from "../constants/constants.js";
import { showErrorToast } from "../effects/toasts.js";


export async function getProfileListings() {
    try {
        const response = await fetch(API_ListingsByProfile, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${load("token")}`,
                "X-Noroff-API-Key": `${load("key")}`,
            },
        });

        if (response.ok) {
            const result = await response.json(); // Directly get the JSON data
            const data = result.data;
            console.log(data);
            
            await displayListings(data);
        } else {
            await showErrorToast('Failed to load profile listings');
            
        }
    } catch (error) {
        console.error("Error loading profile listings:", error);
        await showErrorToast('An error occurred while loading the profile listings');
        
    }
}
async function displayListings(data) {
    const listingsContainer = document.getElementById("activesCardContainer");
    listingsContainer.innerHTML = ""; // Clear previous listings

  
    const cardPromises = data.map(async (item) => {
        // Await the result from smallCard and return the HTML
        return smallCard({ ...item});
    });

    // Resolve all promises and join the HTML together
    const cardsHTML = await Promise.all(cardPromises);
    listingsContainer.innerHTML += cardsHTML.join(""); // Append all cards' HTML to the container

}
