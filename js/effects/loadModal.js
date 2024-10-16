import { initModalEvents } from "./mobilemenu.js";

export function loadModal() {
    fetch('components/mobileMenuModal.html')
        .then(response => response.text())
        .then(data => {
          document.getElementById('header').insertAdjacentHTML('beforeend', data);
            initModalEvents(); // Initialize event listeners for the modal
        })
        .catch(error => console.error('Error loading modal:', error));
}