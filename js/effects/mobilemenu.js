const mobileMenu = document.querySelector("#mobileMenuOverlay");
const burgerIcon = document.querySelector("#burgerMenuIcon");
const closeIcon = document.querySelector("#closeIcon");


export function showMobileMenu() {
    burgerIcon.style.display = "none";
    closeIcon.style.display = "block";
    mobileMenu.style.transform = "translateX(0%)";
}
export function hideMobileMenu() {
    burgerIcon.style.display = "block";
    closeIcon.style.display = "none";
    mobileMenu.style.transform = "translateX(100%)";
}
