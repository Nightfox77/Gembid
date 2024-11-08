import { smallCard } from "../../components/smallCard.js";
import { API_Listings } from "../constants/constants.js";

let allListings = [];
const itemsPerPage = 10; // Number of items to display at a time
let displayedItemsCount = 0; // How many items are currently displayed
let fetchCount = 1; // Tracks the number of API calls (each fetching a batch)
let totalCount = 0; // Total number of items fetched from API

let filterType = 'active'; // Default filter type ('active' or 'ended')

// Function to fetch listings based on filter type
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
        console.log(data)
        allListings = allListings.concat(data); // Concatenate new listings
        totalCount = result.meta.totalCount; // Set total count from the API response
        fetchCount++; // Increment fetch counter for the next batch

        displayListings(); // Display the fetched listings
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

    displayedItemsCount += currentItems.length; // Update the count of displayed items
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
