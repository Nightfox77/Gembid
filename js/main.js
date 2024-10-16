import { hideMobileMenu, showMobileMenu } from "./effects/mobilemenu.js";
import { initIconToggle, removeIconToggle } from "./effects/footerMenu.js";
const body = document.querySelector("body");

body.addEventListener("click", function (event) {
    
    if (event.target.id === "burgerMenuIcon") {
      showMobileMenu();
      

    }
    if (event.target.id === "closeIcon") {
        hideMobileMenu();
    }
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