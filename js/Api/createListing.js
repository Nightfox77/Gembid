import { showErrorToast, showSuccessToast } from "../effects/toasts.js";
import { load } from "../constants/constants.js";
import { API_Listings } from "../constants/constants.js";
import { removeModal } from "../effects/mobilemenu.js";


export async function createListing() {
    
 const formData = {
            title: document.querySelector("#auctionTitle").value,
            description: document.querySelector("#auctionDescription").value,
            media: [
                {
                    url: document.querySelector("#auctionPhoto").value,
                }
            ],

            endsAt: document.querySelector("#auctionDate").value,
        }
        console.log(formData)
try {
    const response = await fetch(API_Listings, {
       
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${load("token")}`,
            "X-Noroff-API-Key": `${load("key")}`,               
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        
        await removeModal();
        showSuccessToast("Your listing is now online")
        
       
        
    } 
} catch (error) {
    showErrorToast("error");
} 
    
}
