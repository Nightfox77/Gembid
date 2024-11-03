import { API_Profiles, load } from "../constants/constants.js";
import { showErrorToast } from "../effects/toasts.js";





export async function loadProfile() {
    try {
        const response = await fetch(`${API_Profiles}/${load("name")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${load("token")}`,
                "X-Noroff-API-Key": `${load("key")}`,
            },
        });

        if (response.ok) {
            const result = await response.json(); 
            const data = result.data;
            return data;
        } else {
            await showErrorToast('Failed to load profile');
            return null; // Return null if the request was not successful
        }
    } catch (error) {
        console.error("Error loading profile:", error);
        await showErrorToast('An error occurred while loading the profile');
        return null; // Return null if there’s an error
    }
}
