
const burgerIcon = document.querySelector("#burgerMenuIcon");
const closeIcon = document.querySelector("#closeIcon");



function showMobileMenu() {
    
    document.body.style.overflow = "hidden";
    burgerIcon.style.display = "none";
    closeIcon.style.display = "block";
}
function hideMobileMenu() {
    document.body.style.overflow = "auto";
    burgerIcon.style.display = "block";
    closeIcon.style.display = "none";
    
}
export function initModalEvents() {
    
    const modal = document.getElementById('mobileMenuOverlay');
    const openButton = document.getElementById('burgerMenuIcon');
    const closeButton = document.getElementById('closeIcon');

    // Show modal when button is clicked
    openButton.addEventListener('click', function () {
      modal.showModal();
      modal.classList.add("show");
      showMobileMenu();
    });

    // Close modal when close button is clicked
    closeButton.addEventListener('click', function () {
      modal.close();
      modal.classList.remove("show");
      hideMobileMenu();
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
          modal.close();
          modal.classList.remove('show');
          hideMobileMenu();
        }
    });
}