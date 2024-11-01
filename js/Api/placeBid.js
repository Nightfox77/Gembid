import { load, API_PostBid } from "../constants/constants.js";
import { showSuccessToast } from "../effects/toasts.js";


export async function placeBid() {
    const amount = load("amount");
    
    try {
        
        const response = await fetch(`${API_PostBid}/${load("id")}/bids`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:  `Bearer ${load("token")}`,
                "X-Noroff-API-Key": `${load("key")}`,      
                              
            },
            body: JSON.stringify({ amount: Number(amount) }) ,
            
        });
        
        const result = await response.json();
      if(result.ok) {
        showSuccessToast("Bid has been placed");
      }
       
    } catch (error) {
        console.log('Error fetching posts:', error);
       
    }
}