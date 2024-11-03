
import { initIconToggle, removeIconToggle } from "./effects/footerMenu.js";
import { showModal} from "./modal/showModal.js";
import { registerUser } from "./auth/register.js";
import { loginUser } from "./auth/login.js";
import { fetchListings } from "./Api/getAllListings.js";
import { placeBid } from "./Api/placeBid.js";
import { load,save } from "./constants/constants.js";
import { insertUserData } from "./effects/insertUserData.js";
import { showSuccessToast } from "./effects/toasts.js";
import { createListing } from "./Api/createListing.js";
import { updateAvatar } from "./Api/updateAvatar.js";
import { getProfileListings } from "./Api/getListingsByProfile.js";




// Modals
// Handles which modal is displayed

document.addEventListener('click', function(event) {
  showModal(event);
 
});




// Togggle login / signup form
  
document.addEventListener('click', async function (event) {
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
  if ( event.target.id === 'logout') {
    const status = load("status");
    if(status === "logged in") {
      localStorage.clear();
     
      
      window.location.href = '/index.html';
    
     await showSuccessToast('Your now logged out');
    }
  }
  if (event.target.id === 'bidBtn') {
      const bidinput = document.querySelector(".bidInput");
      save('amount', bidinput.value);
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

  event.preventDefault();
  const targetForm = event.target;

  if (targetForm.closest("#registerForm")) {
    await registerUser();
}

if (targetForm.closest("#loginForm")) {
    await loginUser();
    window.location.href = '/profile.html';
}

if (targetForm.classList.contains('placeBid')) {
    await placeBid();
}

if (targetForm.closest("#auctionForm")) {
    await createListing();
}

if (targetForm.closest("#changeAvatarForm")) {
    await updateAvatar();
    setTimeout(() => {
    window.location.reload();   
  }, 1600); 
   
}
});
 

  async function triggerFunctionOnPageLoad() {
    const currentPage = window.location.pathname;
    const key = load('key');
    let avatar = load('userImage');
    const profileIconContainer = document.getElementById('profileLink');
   
    if (currentPage === '/' || currentPage === '/index.html') {
    fetchListings();
  
  }
    if (currentPage === '/index.html' || currentPage === '/profile.html') {
      if (key && avatar) {
        profileIconContainer.innerHTML = '';
        profileIconContainer.setAttribute("href", "/profile.html");
        profileIconContainer.innerHTML += `<img src=${avatar} class="rounded-circle" width="24px" height="24px">`;
      } else if (key) {
        profileIconContainer.innerHTML = '';
        profileIconContainer.setAttribute("href", "/profile.html");
        profileIconContainer.innerHTML += `<img src="/assets/images/gembid-default-pic.jpg" class="rounded-circle" width="24px" height="24px">`;
      
      } else {
        profileIconContainer.innerHTML = '';
        profileIconContainer.innerHTML +=  `<span  class="material-symbols-outlined">account_circle</span>`;
      }
    }
    if (currentPage === '/profile.html' && key) {
      
        await insertUserData();
        await getProfileListings();

    
      }
     
}
window.addEventListener('load', triggerFunctionOnPageLoad);


  


    