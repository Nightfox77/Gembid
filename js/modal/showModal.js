import { addAuctionModal } from "../effects/auctionForm.js";
import { addLoginRegisterModal } from "../effects/loginRegister.js";
import { addModalMobileMenu, removeModal } from "../effects/mobilemenu.js";
import { displaySingleListing } from "../Api/getSingleListing.js";
import { save,load} from "../constants/constants.js";
import { addProductModal } from "../effects/productDetails.js";
import { bidButtonToggle } from "../effects/hover.js";


async function addShowClass() {
    let modal = document.querySelector('.modaloverlay');
    setTimeout(() => {
      modal.classList.add('show');
    }, 50);
    document.body.style.overflowY = "hidden";
}

export async function showModal(event) {
    let modal

  // Open the mobile menu modal when burger icon is clicked
  if (event.target.id === 'burgerMenuIcon') { 
    await addModalMobileMenu();
    addShowClass();
    }

  // Close the current modal and open the login modal when login button is clicked
  if (event.target.classList && event.target.classList.contains('loginBtn')) {
    await removeModal();

    await addLoginRegisterModal(); // Load the login/register modal
    
    addShowClass();
  }

  // Close the modal when close icon or backdrop is clicked
  if (event.target.classList && event.target.classList.contains('closeIcon') || (modal && event.target === modal)) {
    await removeModal(); // Wait for the modal to be fully removed
    
  }

  if (event.target.id === "showSignupModal") {
    await removeModal();
    await addLoginRegisterModal(); 

    
    const loginForm = document.querySelector('#loginForm');
    const registerForm = document.querySelector('#registerForm');
    addShowClass();
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
  
  }
  if (event.target.id === "createAuction") {
    await removeModal();
    await addAuctionModal(); 
    
    addShowClass();
  } 
  if (event.target.closest('.card')) {
    await removeModal(); 
    const card = event.target.closest('.card'); 
    const itemId = card.getAttribute("id"); 
    const status = load("status"); 
    save("id", itemId); 
    console.log(status)
    
    
    
     // Call the function to display the single listing by ID
    await addProductModal();
    let modal = document.querySelector(".modaloverlay");
    modal.innerHTML += await displaySingleListing();
    addShowClass();
    
    
   
    bidButtonToggle(status);
    
   
   
}
  
    


}

