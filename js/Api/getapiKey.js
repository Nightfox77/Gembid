import { API_GetKey, save, load } from "../constants/constants.js";




export async function getAPIKey() {
const apiKey = load("key");



if (!apiKey) {
    try {
        const response = await fetch( API_GetKey, {
            method: "POST",
            headers: {
                
                Authorization:  `Bearer ${load("token")}`
            },
            
        });

        
        const responseData = await response.json(); 
        if (response.ok) {
            const data = responseData.data;
            save("key", data.key);
        } else {
            console.log("Failed to create API key. Status:", response.status);
        }
    } catch (error) {
        console.log("Error:", error);
    }
} else {
        return;
}}