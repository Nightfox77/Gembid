


export async function smallCard(item) {
    const currentDate = new Date();
    const endsAtDate = new Date(item.endsAt);
    let timeStatus = "";

    // Check if the auction has ended
    if (endsAtDate < currentDate) {
        timeStatus = `<p class="timeLeft text-danger fw-bold text-end">Ended</p>`;
    } else {
        timeStatus = `<p class="timeLeft text-muted text-end">Ends at: ${endsAtDate.toLocaleString()}</p>`;
    }
    let userImage = item.media && item.media.length > 0 ?
            `<img class="rounded card-img-top" src="${item.media[0].url}" alt="product image" onerror="this.src='./assets/images/gembid-default-pic.jpg'">` :
            `<img class="rounded card-img-top" src="./assets/images/gembid-default-pic.jpg" alt="default image">`;

    let itemDescription = item.description ? item.description : "No description was added for this auction";
    const card = `
        <div id="${item.id}" class="card border-0 p-0">
            ${userImage}
            <div class="card-body  p-1">
                <h4 class="card-title">${item.title}</h4>
                <p class="card-text ">${itemDescription}</p>
            </div>
            <div class="time pe-2 mt-2">
                ${timeStatus}
            </div>
            
        </div>
    `;
    return card;
}