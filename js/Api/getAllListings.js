import { smallCard } from "../../components/smallCard.js";
import { API_Listings } from "../constants/constants.js";



let allListings = []; // Store all fetched listings
let currentPage = 1; // Current page we are on
const itemsPerPage = 10; // Number of items per page
let totalPageCount = 0; // Total pages available from the API

// Function to fetch listings from the API
export async function fetchListings(page = 1) {
    try {
        const response = await fetch(`${API_Listings}?page=${page}&limit=100&sortOrder=asc&_active=true`, {
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
        
        // Append new items to the list
        allListings = allListings.concat(data);
        console.log(allListings) // Concatenate new listings
        totalPageCount = result.meta.pageCount; // Update total page count from metadata

        displayListings(); // Display the fetched listings
        handleLoadMoreButton();
    } catch (error) {
        console.error("Error fetching listings:", error);
    }
}

// Function to display listings
async function displayListings() {
    const listingsContainer = document.getElementById("listingItemsContainer");
    listingsContainer.innerHTML = ""; // Clear previous listings

    const startIndex = (currentPage - 1) * itemsPerPage; // Calculate start index
    const currentItems = allListings.slice(startIndex, startIndex + itemsPerPage); // Get items for the current page
  
    const cardPromises = currentItems.map(async (item) => {
        // Await the result from smallCard and return the HTML
        return smallCard({ ...item});
    });

    // Resolve all promises and join the HTML together
    const cardsHTML = await Promise.all(cardPromises);
    listingsContainer.innerHTML += cardsHTML.join(""); // Append all cards' HTML to the container

}

// Function to handle Load More button visibility
function handleLoadMoreButton() {
    const loadMoreButton = document.getElementById('loadBtn');
    if (currentPage >= totalPageCount) {
        loadMoreButton.style.display = 'none'; // Hide button if no more items to load
    } else {
        loadMoreButton.style.display = 'block'; // Show button if more items available
    }
}

// Event listener for Load More button



const page = window.location.pathname;

if (page === '/' || page === '/index.html') {
    document.getElementById('loadBtn').addEventListener('click', () => {
    const totalPageCount = Math.ceil(allListings.length / itemsPerPage); // Calculate total pages
    if (currentPage < totalPageCount) {
        currentPage++; // Increment current page
        displayListings(); // Display the listings for the new page
    }
});

}



