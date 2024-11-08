import { load, API_Profiles, save } from "../constants/constants.js";
import { showErrorToast, showSuccessToast } from "../effects/toasts.js";
import { removeModal } from "../effects/mobilemenu.js";

export async function updateAvatar() {
    
    const formData = {
       avatar: 
            {
                url: document.getElementById("photoUrl").value,
            }
        
    }

 try {
       const response = await fetch(`${API_Profiles}/${load("name")}`, {
            
           method: "PUT",
           headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${load("token")}`,
               "X-Noroff-API-Key": `${load("key")}`,               
           },
           body: JSON.stringify(formData)
       });
        
       if (response.ok) {
        const data = await response.json(); 
        console.log("API Response:", data); 

        
        await removeModal();
        await showSuccessToast("Your profile picture is now updated");
        save("userImage", formData.avatar.url);
        
    } else {
     
        await removeModal();
        await showErrorToast("Failed to update profile picture");
        
    }
} catch (error) {
    
    await removeModal();
    await showErrorToast("An error occurred while updating the avatar.");
   
}
       
   }