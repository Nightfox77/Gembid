export async function loadLoginRegisterModal() {
    try {
        const response = await fetch('components/login-registerModal.html');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.text();
        document.getElementById('header').insertAdjacentHTML('beforeend', data);
    } catch (error) {
        console.error('Error loading modal:', error);
    }
  }
  