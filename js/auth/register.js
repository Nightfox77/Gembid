import { API_Signup } from "../constants/constants.js";
import { showSuccessToast, showErrorToast } from "../effects/toasts.js";
import { removeModal } from "../effects/mobilemenu.js";


// Registration data
// Handles Api request, sends user data and handles toast display
export async function registerUser() { 
    
    const formData = {
        name: document.getElementById("nameRegister").value,
        email: document.getElementById("emailRegister").value,
        password: document.getElementById("passwordRegister").value,
        avatar: {
            url: document.getElementById("avatarRegister").value, 
            alt: "User avatar image",
          }
    };
    
    try {
        
      // Send form data to the API
      const response = await fetch(API_Signup, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
        },
          body: JSON.stringify(formData),
          
      });
      const result = await response.json();
      
      if (response.ok) {
       await  removeModal();
       showSuccessToast("Registration successful!");
        
         
        
          
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