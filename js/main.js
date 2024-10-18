
import { initIconToggle, removeIconToggle } from "./effects/footerMenu.js";
import { loadModal } from "./effects/loadModal.js";




document.addEventListener('DOMContentLoaded', function () {
 
  loadModal();
});

/* handles the footer menu appearence depending on the screen width */ 
function handleResize() {
  const width = window.innerWidth; 

  if (width < 1100) {
  
    const sublists = document.querySelectorAll('.listItems');
    sublists.forEach(sublist => {
        sublist.style.display = 'none'; 
    });
    initIconToggle(); 

  } else {
      removeIconToggle(); 
  }
}

// Add event listener for window resize
window.addEventListener('resize', handleResize);

// Initial check when the page loads
handleResize();