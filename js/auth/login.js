import { API_Login } from "../constants/constants.js";
import { showSuccessToast, showErrorToast } from "../effects/toasts.js";
import { removeModal } from "../effects/mobilemenu.js";
import { save } from "../constants/constants.js";
import { getAPIKey } from "../Api/getapiKey.js";


export async function loginUser() { 
    
    const formData = {
        email: document.getElementById("emailLogin").value,
        password: document.getElementById("passwordLogin").value,
       
    };
    
    try {
        
      // Send form data to the API
      const response = await fetch(API_Login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
        },
          body: JSON.stringify(formData),
          
      });
      const result = await response.json();
      
      if (response.ok) {
       await  removeModal();
       showSuccessToast("Login successful!");
        save("token", result.data.accessToken);
        save("email", result.data.email);
        save("name", result.data.name);
        const userImage = result.data.avatar;
        save("userImage", userImage.url);
        save("status", "logged in")
        await getAPIKey();
        window
         
        
          
      } else {
        let errorMessage = '';
        result.errors.forEach(err => {
            errorMessage += err.message + ' ';
        })
        await removeModal();
        showErrorToast( errorMessage || 'Registration failed', false);
        
      }
  } catch (error) {
    showErrorToast('Error', 'An unexpected error occurred. Please try again.', false);
    

  }

}