import { smallCard } from "../../components/smallCard.js";
import { API_Listings } from "../constants/constants.js";





let currentPage = 1; // Keeps track of the current page
const limit = 10; // Number of cards to load per page
let totalItems = 0; // Total number of items available (optional for your use case)

// Function to construct the API URL with query parameters
function constructApiUrl(sort, sortOrder, active) {
    const url = new URL(API_Listings); // Base URL
    url.searchParams.append('limit', limit); // Set the limit
    url.searchParams.append('page', currentPage); // Use the current page

    if (sort) {
        url.searchParams.append('sort', sort); // Append sort parameter if provided
    }
    
    if (sortOrder) {
        url.searchParams.append('sortOrder', sortOrder); // Append sort order if provided
    }

    if (active) {
        url.searchParams.append('active', active); // Append active status if provided
    }

    return url.toString(); // Return the constructed URL as a string
}

// Function to fetch all listings with optional query parameters
async function getAllListings(sort, sortOrder, active) {
    const url = constructApiUrl(sort, sortOrder, active); // Construct URL with query parameters
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching listings: ${response.status}`);
    }

    const items = await response.json();
    console.log("API Response:", items); // Log the response to see its structure
    return items; // Return the fetched items directly
}

export async function displayListings(sort = '', sortOrder = '', active = '') {
    const listingsContainer = document.getElementById("listingItemsContainer");

    // Clear previous listings for the first load
    if (currentPage === 1) {
        listingsContainer.innerHTML = ""; // Clear container on initial load
    }

    // Fetch items for the current page
    const items = await getAllListings(sort, sortOrder, active);
    console.log("Fetched Items for Page:", currentPage, items);

    // Check if items is an empty array
    if (items.length === 0) {
        console.log("No more items to load.");
        document.getElementById('loadBtn').style.display = 'none'; // Hide load button if no more items
        return; // Exit if there are no more items
    }

    // Load items into the container using a for...of loop
    for (const item of items.data) {
        let userImage = "";
        let userText = item.description || ""; // Default to an empty string if `description` is null or empty

        // Check for image in media; use default image if none is found
        if (!item.media || item.media.length === 0) {
            userImage = `<img class="rounded card-img-top" src="./assets/images/gembid-default-pic.jpg" alt="default image">`;
        } else {
            userImage = `<img class="rounded card-img-top" src="${item.media[0].url}" alt="product image" onerror="this.src='./assets/images/gembid-default-pic.jpg'">`;
        }

        // Generate HTML for each card and append it to the container
        const cardHTML = await smallCard({
            ...item,
            userImage,
            userText
        });

        listingsContainer.innerHTML += cardHTML; // Append each card's HTML to the container
    }

    // Update the page number for the next batch
    currentPage++; // Increment the page number for the next request

    // Optionally, you can control the visibility of the "Load More" button based on the number of items returned
    if (items.length < limit) {
        // If the number of items returned is less than the limit, hide the button
        document.getElementById('loadBtn').style.display = 'none';
        console.log("No more items to load.");
    } else {
        // Otherwise, show the load button
        document.getElementById('loadBtn').style.display = 'block';
    }
}

// Attach event listener to the "Load More" button
document.getElementById('loadBtn').addEventListener('click', () => {
    displayListings(); // Call displayListings to load the next page
});



