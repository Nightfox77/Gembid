
function showSublist(button) {
    const sublist = button.closest('li').nextElementSibling; 
    sublist.style.display = "flex"; 

    
    button.style.display = "none"; 
    const closeIcon = button.nextElementSibling; 
    closeIcon.style.display = "flex"; 
}


function hideSublist(button) {
    const sublist = button.closest('li').nextElementSibling; 
    sublist.style.display = "none"; 

    
    const addIcon = button.previousElementSibling; 
    addIcon.style.display = "flex"; 
    button.style.display = "none"; 
}
export function initIconToggle() {
    const addIcons = document.querySelectorAll('.addIcon'); 
    const closeIcons = document.querySelectorAll('.closeIcon'); 

    
    // Make sure addIcons are visible
    addIcons.forEach(button => {
        button.style.display = 'inline'; // Ensure addIcon is visible
        button.onclick = function() {
            showSublist(this);
        };
    });

    // Attach click event listeners to close icons
    closeIcons.forEach(button => {
        button.style.display = 'none'; // Ensure closeIcon is hidden
        button.onclick = function() {
            hideSublist(this);
        };
    });
}

// Function to remove icon toggle for desktop view
export function removeIconToggle() {
    const addIcons = document.querySelectorAll('.addIcon'); 
    const closeIcons = document.querySelectorAll('.closeIcon'); 
    const sublists = document.querySelectorAll('.listItems'); // Get all sublists

    // Hide both addIcons and closeIcons in desktop mode
    addIcons.forEach(button => {
        button.style.display = 'none'; // Hide all addIcons
    });

    closeIcons.forEach(button => {
        button.style.display = 'none'; // Hide all closeIcons
    });

    // Ensure all sublists are visible in desktop mode
    sublists.forEach(sublist => {
        sublist.style.display = 'block'; // Show all sublists
    });
}