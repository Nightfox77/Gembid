import { loadUpdateAvatarModal } from "../loadHtml/loadUpdateAvatarModal.js";

const background = document.querySelector('.backgroundblur');
let modal = document.querySelector('modaloverlay'); 
export async function addAvatarModal() {
    // Check if the modal hasn't been loaded yet
    if (!modal) {
        await loadUpdateAvatarModal(); 
        background.style.display = "flex";
    }
}