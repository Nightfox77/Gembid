export async function loadAuctionModal() {
    try {
        const response = await fetch('components/auctionFormModal.html');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.text();
        document.getElementById('header').insertAdjacentHTML('beforeend', data);
    } catch (error) {
        console.error('Error loading modal:', error);
    }
  }
  