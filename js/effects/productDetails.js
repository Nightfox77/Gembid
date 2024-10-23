import { loadDetailModal } from "../loadHtml/loadDetailModal.js";

const background = document.querySelector('.backgroundblur');
let modal = document.querySelector('modaloverlay'); 
export async function addProductModal() {
    // Check if the modal hasn't been loaded yet
    if (!modal) {
        await loadDetailModal(); 
        background.style.display = "flex";
    }
}