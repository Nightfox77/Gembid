

export async function bidButtonToggle(status) {
    const bidButton = document.getElementById("bidBtn");
if (status === "logged in") {
   
  bidButton.style.pointerEvents = 'auto'; // Enable click events
  bidButton.style.opacity = '1'; // Reset opacity to full
  
} else if (status !== undefined && status === null) {
    bidButton.style.pointerEvents = 'none'; // Enable click events
    bidButton.style.opacity = '.5'; // Reset opacity to full

}
}