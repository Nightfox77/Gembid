


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

    const card = `
        <div id="${item.id}" class="card border-0 p-0">
            ${item.userImage}
            <div class="card-body  p-1">
                <h4 class="card-title">${item.title}</h4>
                <p class="card-text ">${item.userText}</p>
            </div>
            <div class="time pe-2 mt-2">
                ${timeStatus}
            </div>
            
        </div>
    `;
    return card;
}