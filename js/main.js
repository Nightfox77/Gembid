import { removeModal,  addModalMobileMenu} from "./effects/mobilemenu.js"
import { initIconToggle, removeIconToggle } from "./effects/footerMenu.js";
import { addLoginRegisterModal } from "./effects/loginRegister.js";



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
  }

  // Close the current modal and open the login modal when login button is clicked
  if (event.target.classList && event.target.classList.contains('loginBtn')) {
    await removeModal(); // Wait for the modal to be fully removed

    await addLoginRegisterModal(); // Load the login/register modal
    let newModal = document.querySelector('.modaloverlay'); // Fetch the newly added modal

    // Show the login modal after it’s loaded into the DOM
    setTimeout(() => {
      newModal.classList.add('show'); 
    }, 50);
  }

  // Close the modal when close icon or backdrop is clicked
  if (event.target.classList && event.target.classList.contains('closeIcon') || (modal && event.target === modal)) {
    await removeModal(); // Wait for the modal to be fully removed
  }
});








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