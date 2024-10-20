export async function loadMobileMenu() {
  try {
      const response = await fetch('components/mobileMenuModal.html');
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text();
      document.getElementById('header').insertAdjacentHTML('beforeend', data);
  } catch (error) {
      console.error('Error loading modal:', error);
  }
}
