// Function to show toast 
const toast = document.querySelector(".toastalert");
const toastMessage = document.querySelector(".message");

export function showSuccessToast(message) {
    toast.style.display = "flex";
    toastMessage.textContent = message;
    toast.classList.add("success");
    setTimeout(() => {
        toast.style.display = "none";
        toastMessage.textContent = "";
        toast.classList.remove("success");
      }, 1500);
      
    
} 
export function showErrorToast(message) {
    toast.style.display = "flex";
    toastMessage.textContent = message;
    toast.classList.add("error");
    setTimeout(() => {
        toast.style.display = "none";
        toastMessage.textContent = "";
        toast.classList.remove("error");
      }, 1500);
}
