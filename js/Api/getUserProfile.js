import { API_Profiles, load } from "../constants/constants.js";
import { showErrorToast } from "../effects/toasts.js";





export async function loadProfile() {
    
    const response = await fetch(`${API_Profiles}/${load("name")}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization:  `Bearer ${load("token")}`,
            "X-Noroff-API-Key": `${load("key")}`,               
        },
    })
    if (response.ok) {
        const result = await response.json(); 
        const data = result.data;
        return data;
        
        
    } else {
        showErrorToast('Failed to load profile');
    }
}