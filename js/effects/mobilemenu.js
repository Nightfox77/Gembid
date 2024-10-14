const mobileMenu = document.querySelector("#mobileMenuOverlay");
const burgerIcon = document.querySelector("#burgerMenuIcon");
const closeIcon = document.querySelector("#closeIcon");


export function showMobileMenu() {
    document.body.style.overflow = "hidden";
    burgerIcon.style.display = "none";
    closeIcon.style.display = "block";
    mobileMenu.style.transform = "translateX(0%)";
}
export function hideMobileMenu() {
    document.body.style.overflow = "auto";
    burgerIcon.style.display = "block";
    closeIcon.style.display = "none";
    mobileMenu.style.transform = "translateX(100%)";
}
