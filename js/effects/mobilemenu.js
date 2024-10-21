import { loadMobileMenu } from "../loadHtml/loadMobileMenuModal.js";





// Function to load the modal and show it

let modal; 
export async function addModalMobileMenu() {
    // Check if the modal hasn't been loaded yet
    if (!modal) {
        await loadMobileMenu(); 
        
    }
  
    
}

// Function to remove the modal and hide it
export async function removeModal() {
  let existingModal = modal || document.querySelector('.modaloverlay');
  
  if (existingModal) {
    return new Promise((resolve) => {
      existingModal.classList.remove('show');
      
      // Restore body scroll immediately
      document.body.style.overflowY = "auto";

      // Wait for the transition to end before resolving the promise
      existingModal.addEventListener('transitionend', () => {
        existingModal.remove();
        modal = null; // Reset modal after removal
        resolve(); // Resolve after the modal has been removed
      }, { once: true }); // Ensures this eventlistener is only triggered once
    });
  }
}


