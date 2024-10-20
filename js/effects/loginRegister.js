import { loadLoginRegisterModal } from '../loadHtml/loadLoginRegisterModal.js'

let modal = document.querySelector('modaloverlay'); 
export async function addLoginRegisterModal() {
    // Check if the modal hasn't been loaded yet
    if (!modal) {
        await loadLoginRegisterModal(); 
         
    }
  
   
}