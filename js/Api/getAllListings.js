import { smallCard } from "../../components/smallCard.js";
import { API_Listings } from "../constants/constants.js";





async function getAllListings() {
    
    
    try {
        const response = await fetch(API_Listings, {
            method: "GET",
            
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const result = await response.json();
        const data = result.data
        return data;
    } catch (error) {
        console.log('Error fetching posts:', error);
       
    }
}


let currentOffset = 0; // Keeps track of how many cards have been loaded
const limit = 10; // Number of cards to load per batch

// Function to display listings in batches
export async function displayListings() {
    try {
        const items = await getAllListings(); // Fetch data from the API
        console.log(items);
        
        const listingsContainer = document.getElementById("listingItemsContainer");

        // Clear previous listings (for initial load)
        if (currentOffset === 0) {
            listingsContainer.innerHTML = ""; 
        }

        // Load the next batch of items
        function loadMoreItems() {
            // Check if there are any more items to load
            if (currentOffset >= items.length) {
                // Hide the "Load More" button if no more items are left
                document.getElementById('loadBtn').style.display = 'none';
                document.getElementById('upBtn').style.display = 'flex';
                return; // Exit the function if no more items
            }

            // Load 10 more items, or fewer if we're at the end
            const nextBatch = items.slice(currentOffset, currentOffset + limit);

            nextBatch.forEach(async (item) => {
                let userImage = "";
                let userText = item.description || ""; // Default to an empty string if `description` is null or empty

                // Check for image in media; use default image if none is found
                if (!item.media || item.media.length === 0) {
                    userImage = `<img class="rounded card-img-top" src="./assets/images/gembid-default-pic.jpg" alt="default image" >`;
                } else {
                    userImage = `<img class="rounded card-img-top" src="${item.media[0].url}" alt="product image" onerror="this.src='./assets/images/gembid-default-pic.jpg'" >`;
                }

                // Pass `userImage` and `userText` into `smallCard` as needed
                const cardHTML = await smallCard({
                    ...item,
                    userImage,
                    userText
                });

                listingsContainer.innerHTML += cardHTML; // Append each card's HTML to the container
            });

            currentOffset += nextBatch.length;

            // Hide the "Load More" button if there are no more items left
            if (currentOffset >= items.length) {
                document.getElementById('loadBtn').style.display = 'none';
                document.getElementById('upBtn').style.display = 'flex';
            }
        }

        // Initially load the first 10 items
        loadMoreItems();

        // Attach event listener to the "Load More" button
        document.getElementById('loadBtn').addEventListener('click', () => {
            loadMoreItems();
        });

    } catch (error) {
        console.error("Error fetching or displaying listings:", error);
    }
}
