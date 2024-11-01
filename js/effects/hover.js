import { showErrorToast } from "./toasts.js";
import { load } from "../constants/constants.js";

export function bidButtonToggle(status) {
   const bidButton = document.getElementById("bidBtn");
   const auctionStatus = load("auction");
    // If logged in and auction active --- bidBtn active
    if (status && auctionStatus === "active") {
        bidButton.style.pointerEvents = 'auto';
        bidButton.style.opacity = '1';
    } else {
        bidButton.style.pointerEvents = 'none';
        bidButton.style.opacity = '0.5';
        showErrorToast("You need to log in to place a bid");
    }
}
