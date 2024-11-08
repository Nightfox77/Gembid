import { loadAuctionModal } from "../loadHtml/loadAuctionFormModal.js";
const background = document.querySelector('.backgroundblur');
let modal = document.querySelector('modaloverlay'); 
export async function addAuctionModal() {
    // Check if the modal hasn't been loaded yet
    if (!modal) {
        await loadAuctionModal(); 
        background.style.display = "flex";
    }
}
    