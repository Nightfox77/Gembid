import { load } from "../constants/constants.js";

const bidButton = document.getElementById("bidBtn");
const loggedIn = load("key");

export function bidButtonToggle() {
if (loggedIn && bidButton) {
  bidButton.style.pointerEvents = 'auto'; // Enable click events
  bidButton.style.opacity = '1'; // Reset opacity to full
} else if (bidButton) {
  bidButton.style.pointerEvents = 'none'; // Prevent click events
  bidButton.style.opacity = '0.5'; // Dim the button to indicate it’s disabled
  
    
    showErrorToast("You need to log in to place a bid"); // Call your existing toast function
;
}
}