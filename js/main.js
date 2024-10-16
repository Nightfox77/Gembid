
import { initIconToggle, removeIconToggle } from "./effects/footerMenu.js";
import { loadModal } from "./effects/loadModal.js";
const body = document.querySelector("body");



document.addEventListener('DOMContentLoaded', function () {
  // Function to load modal content
  

  // Function to initialize modal events
 

  // Load modal content when the page loads
  loadModal();
});


function handleResize() {
  const width = window.innerWidth; // Get the current window width

  if (width < 1100) {
    // Hide all sublists when in mobile mode
    const sublists = document.querySelectorAll('.listItems');
    sublists.forEach(sublist => {
        sublist.style.display = 'none'; // Hide all sublists
    });
    initIconToggle(); // Initialize icons for mobile view

  } else {
      removeIconToggle(); // Cleanup for desktop view
  }
}

// Add event listener for window resize
window.addEventListener('resize', handleResize);

// Initial check when the page loads
handleResize();