import { hideMobileMenu, showMobileMenu } from "./effects/mobilemenu.js";
const body = document.querySelector("body");

body.addEventListener("click", function (event) {
    
    if (event.target.id === "burgerMenuIcon") {
      showMobileMenu();
      

    }
    if (event.target.id === "closeIcon") {
        hideMobileMenu();
    }
});
