
import { initIconToggle, removeIconToggle } from "./effects/footerMenu.js";
import { showModal} from "./modal/showModal.js";
import { registerUser } from "./auth/register.js";
import { loginUser } from "./auth/login.js";
import { fetchListings } from "./Api/getAllListings.js";
import { placeBid } from "./Api/placeBid.js";
import { load,save } from "./constants/constants.js";
import { loadProfile } from "./Api/getUserProfile.js";
import { showSuccessToast } from "./effects/toasts.js";
import { createListing } from "./Api/createListing.js";




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
      await showSuccessToast('Your now logged out');
      setTimeout(() => {
        window.location.href = '/index.html';
    }, 2000); 
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
  const registerForm = event.target.closest("#registerForm");
  const loginForm = event.target.closest("#loginForm");
  const bidForm = document.querySelector('.placeBid'); 
  const auctionForm = document.querySelector("#auctionForm");


  if (registerForm) {
    event.preventDefault();
      
      
      await registerUser();
  }

  if (loginForm) {
    event.preventDefault();
      
      
      await loginUser();
      window.location.href = '/profile.html';
  }
  if (event.target === bidForm) { 
    
    await placeBid()
  }
  if (auctionForm) {
    event.preventDefault();
    await createListing();
  }
});
 

  async function triggerFunctionOnPageLoad() {
    const currentPage = window.location.pathname;
    const key = load('key');
    let avatar = load('userImage');
    if (!avatar) {

    }
    const profileIconContainer = document.getElementById('profileLink');
   
    if (currentPage === '/' || currentPage === '/index.html') {
    fetchListings()
  
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
      
      const profileData = await loadProfile();
      console.log(profileData);
      const userName = document.getElementById('userName');
      const userAvatar = document.getElementById('userImage'); 
      userName.innerHTML = load("name");
      userAvatar.setAttribute("src", profileData.avatar.url);
      if(!profileData.avatar) {
        userAvatar.setAttribute("src", "/assets/images/gembid-default-pic.jpg");
      } 
      const userBalance = document.getElementById('creditBalance');
      userBalance.innerHTML += profileData.credits; 
    }
}
window.addEventListener('load', triggerFunctionOnPageLoad);


  


    