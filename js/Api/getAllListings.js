import { smallCard } from "../../components/smallCard.js";
import { API_Listings } from "../constants/constants.js";

let allListings = []; // Store all fetched listings
let currentPage = 1; // Current page within the current 100-item set
const itemsPerPage = 10; // Number of items per page
let apiPage = 1; // Page to request from API, initially 1
let totalPageCount = 0; // Total pages available from the API
let displayedItemsCount = 0; // Track the number of items already displayed

// Function to fetch listings from the API
export async function fetchListings() {
    try {
        const response = await fetch(`${API_Listings}?page=${apiPage}&limit=100&sortOrder=asc&_active=true`, {
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
        
        // Append new items to the allListings array
        allListings = allListings.concat(data);
        totalPageCount = result.meta.pageCount; // Update total pages from metadata
        console.log(allListings); // Log fetched listings for debugging

        displayListings(); // Display the fetched listings
        handleLoadMoreButton();
    } catch (error) {
        console.error("Error fetching listings:", error);
    }
}

// Function to display listings
async function displayListings() {
    const listingsContainer = document.getElementById("listingItemsContainer");

    // Get the new set of items based on how many have already been displayed
    const currentItems = allListings.slice(displayedItemsCount, displayedItemsCount + itemsPerPage);
  
    const cardPromises = currentItems.map(async (item) => {
        return smallCard({ ...item });
    });

    // Resolve all promises and join the HTML together
    const cardsHTML = await Promise.all(cardPromises);
    listingsContainer.innerHTML += cardsHTML.join(""); // Append new cards to the container

    displayedItemsCount += currentItems.length; // Update the count of displayed items
}

// Function to handle Load More button visibility and fetching the next batch
function handleLoadMoreButton() {
    const loadMoreButton = document.getElementById('loadBtn');
    if (displayedItemsCount >= allListings.length) {
        // Check if we need to load more from the API
        if (apiPage < totalPageCount) {
            apiPage++; // Increment API page for the next batch
            currentPage = 1; // Reset local pagination for the new batch
            fetchListings(); // Fetch a new batch of 100 items
        } else {
            loadMoreButton.style.display = 'none'; // Hide button if no more items to load
        }
    }
}

// Event listener for Load More button
const page = window.location.pathname;
if (page === '/' || page === '/index.html') {
    document.getElementById('loadBtn').addEventListener('click', () => {
        if (displayedItemsCount < allListings.length) {
            displayListings(); // Display the next set of items within the current batch
        } else {
            handleLoadMoreButton(); // Fetch the next batch if needed
        }
    });
}
