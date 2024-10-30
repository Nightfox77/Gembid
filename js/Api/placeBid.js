import { load, API_Listings } from "../constants/constants.js";


async function placeBid() {
    
    
    try {
        
        const response = await fetch(`${API_Listings}/${load("id")}/bids`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:  `Bearer ${load("token")}`,
                "X-Noroff-API-Key": `${load("key")}`,               
            },
            body: {"amount": load("amount"),}
        });
        
        const result = await response.json();
        const data = result.data;
        console.log(data);
        return data;
    } catch (error) {
        console.log('Error fetching posts:', error);
       
    }
}