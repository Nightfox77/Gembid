import { smallCard } from "../../components/smallCard.js";
import { API_Listings } from "../constants/constants.js";

let allListings = [];
const itemsPerPage = 10; 
let displayedItemsCount = 0; 
let fetchCount = 1; 
let totalCount = 0; 

let filterType = 'active';


export async function fetchListings() {
    try {
        const response = await fetch(`${API_Listings}?page=${fetchCount}&limit=100&sortOrder=asc&_active=${filterType === 'active'}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching listings: ${response.status}`);
        }

        const result = await response.json();
        const data = result.data;
       
        allListings = allListings.concat(data); 
        totalCount = result.meta.totalCount; 
        fetchCount++; 

        displayListings(); 
        handleLoadMoreButton();
    } catch (error) {
        console.error("Error fetching listings:", error);
    }
}

// Function to display listings
async function displayListings() {
    const listingsContainer = document.getElementById("listingItemsContainer");
    const currentItems = allListings.slice(displayedItemsCount, displayedItemsCount + itemsPerPage);

    const cardPromises = currentItems.map(async (item) => smallCard({ ...item }));
    const cardsHTML = await Promise.all(cardPromises);
    listingsContainer.innerHTML += cardsHTML.join("");

    displayedItemsCount += currentItems.length; // Update count of displayed items
}

// Function to handle Load More button visibility and fetching next batch
function handleLoadMoreButton() {
    const loadMoreButton = document.getElementById('loadBtn');
    // Only show the button if we still have items to display
    if (displayedItemsCount < totalCount) {
        loadMoreButton.style.display = 'block'; // Show button if more items available
    } else {
        loadMoreButton.style.display = 'none'; // Hide button if no more items to load
    }
}
function handleLoadMore() {
    if (displayedItemsCount < allListings.length) {
        displayListings(); // Display the next set of items within the current batch
    } else {
        fetchListings(); // Fetch the next batch if needed
    }
}

// Check if the current page is index.html, and add the event listener for Load More button
if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    const loadMoreButton = document.getElementById('loadBtn');
    if (loadMoreButton) { // Ensure the button exists
        loadMoreButton.addEventListener('click', handleLoadMore);
    }
}
