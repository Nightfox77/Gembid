import { removeModal,  addModalMobileMenu} from "./effects/mobilemenu.js"
import { initIconToggle, removeIconToggle } from "./effects/footerMenu.js";
import { addLoginRegisterModal } from "./effects/loginRegister.js";
import { addAuctionModal } from "./effects/auctionForm.js";
import { addProductModal } from "./effects/productDetails.js";
import { registerUser } from "./auth/register.js";
import { loginUser } from "./auth/login.js";



// Modal - mobileMenu
// load and show modal- mobileMenu
// Remove and hide Modal - mobileMenu
document.addEventListener('click', async function(event) {
  let modal = document.querySelector('.modaloverlay');

  // Open the mobile menu modal when burger icon is clicked
  if (event.target.id === 'burgerMenuIcon') { 
    await addModalMobileMenu();
    modal = document.querySelector('.modaloverlay'); // Make sure we get the new modal
    setTimeout(() => {
      modal.classList.add('show');
    }, 50); // Small delay to ensure the transition happens smoothly
    document.body.style.overflowY = "hidden";
    
  }

  // Close the current modal and open the login modal when login button is clicked
  if (event.target.classList && event.target.classList.contains('loginBtn')) {
    await removeModal();

    await addLoginRegisterModal(); // Load the login/register modal
    let newModal = document.querySelector('.modaloverlay'); // Fetch the newly added modal
  setTimeout(() => {
      newModal.classList.add('show');
    }, 50);
    document.body.style.overflowY = "hidden";
  }

  // Close the modal when close icon or backdrop is clicked
  if (event.target.classList && event.target.classList.contains('closeIcon') || (modal && event.target === modal)) {
    await removeModal(); // Wait for the modal to be fully removed
    
  }

  if (event.target.id === "showSignupModal") {
    await removeModal();
    await addLoginRegisterModal(); // Load the login/register modal

    let newModal = document.querySelector('.modaloverlay'); // Fetch the newly added modal
    const loginForm = document.querySelector('#loginForm');
    const registerForm = document.querySelector('#registerForm');

  setTimeout(() => {
      newModal.classList.add('show');
    }, 50);
    document.body.style.overflowY = "hidden";
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
  
  }
  if (event.target.id === "createAuction") {
    await removeModal();

    await addAuctionModal(); // Load the login/register modal
    let newModal = document.querySelector('.modaloverlay'); // Fetch the newly added modal
  setTimeout(() => {
      newModal.classList.add('show');
    }, 50);
    document.body.style.overflowY = "hidden";
  }
  if (event.target.closest('.card')) {
    await removeModal();

    await addProductModal(); // Load the login/register modal
    let newModal = document.querySelector('.modaloverlay'); // Fetch the newly added modal
  setTimeout(() => {
      newModal.classList.add('show');
    }, 50);
    document.body.style.overflowY = "hidden";
  
  }
});




// Togggle login / signup form
  
document.addEventListener('click', function (event) {
    const loginForm = document.querySelector('#loginForm');
    const registerForm = document.querySelector('#registerForm');

  if (event.target.id === 'showLogin') {
    registerForm.style.display = 'none';
    loginForm.style.display = 'flex';
  }
  if (event.target.id === 'showSignup') {
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
  }
})


    





// Footer
// handles the footer menu appearence depending on the screen width //
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


window.addEventListener('resize', handleResize);


handleResize();


// Registration/Login
// Handles registration/login process 
document.addEventListener("submit", async function(event) {
  const registerForm = event.target.closest("#registerForm");
  const loginForm = event.target.closest("#loginForm");


  if (registerForm) {
    event.preventDefault();
      
      
      await registerUser();
  }
  
  if (loginForm) {
    event.preventDefault();
      
      
      await loginUser();
  }
});



