import { API_Login } from "../constants/constants.js";
import { showSuccessToast, showErrorToast } from "../effects/toasts.js";
import { removeModal } from "../effects/mobilemenu.js";


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
        
         
        
          
      } else {
        let errorMessage = '';
        result.errors.forEach(err => {
            errorMessage += err.message + ' ';
        })
        console.log(result);
        await removeModal();
        showErrorToast( errorMessage || 'Registration failed', false);
        
      }
  } catch (error) {
    showErrorToast('Error', 'An unexpected error occurred. Please try again.', false);
    

  }

}