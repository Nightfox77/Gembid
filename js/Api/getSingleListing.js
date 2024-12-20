
import { load, API_Listings, save } from "../constants/constants.js";





async function getSingleListing() {
    
    
    try {
        
        const response = await fetch(`${API_Listings}/${load("id")}?_seller=true&_bids=true`, {
            method: "GET"
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const result = await response.json();
        const data = result.data;
        return data;
    } catch (error) {
        console.log('Error fetching posts:', error);
       
    }
}

export async function displaySingleListing() {
    const item = await getSingleListing();
    save("seller", item.seller.name)
    let userImage = "";
    let userText = item.description || ""; 
    if (!item.media || item.media.length === 0) {
        userImage = `<img class="rounded img-fluid " src="./assets/images/gembid-default-pic.jpg" alt="default image" >`;
    } else {
        userImage = `<img class="rounded img-fluid" src="${item.media[0].url}" alt="product image" onerror="this.src='./assets/images/gembid-default-pic.jpg'"  >`;
    }
   
    const currentDate = new Date();
    const endsAtDate = new Date(item.endsAt);
    let timeStatus = "";
    if (endsAtDate < currentDate) {
        timeStatus = `<p class="timeLeft text-danger fw-bold ">Ended:  ${endsAtDate.toLocaleString()}</p>`;
        save("auction", "ended");
    } else {
        timeStatus = `<p class="timeLeft  text-muted ">Ends at: ${endsAtDate.toLocaleString()}</p>`;
        save("auction", "active");
    } 


    const status = load("status"); 

const bidsList = item.bids || [];
const highestBid = bidsList.length > 0 ? bidsList[bidsList.length - 1].amount : 0;
const minimumBid = highestBid + 1;


const bidsHTML = !status
    ? `<li class="list-group-item text-muted">Please log in to see the bids.</li>` 
    : bidsList.length > 0
        ? bidsList.map(bid => `
            <li class="list-group-item">
                <img class="rounded-circle" 
                     src="${bid.bidder.avatar.url || './assets/images/gembid-default-pic.jpg'}" 
                     alt="product image" 
                     onerror="this.src='./assets/images/gembid-default-pic.jpg'" />
                <strong class="bidderName">${bid.bidder.name}:</strong> 
                $${bid.amount} on ${new Date(bid.created).toLocaleDateString()}
            </li>
          `).join('')
        : `<li class="list-group-item text-muted">No bids have been placed.</li>`; 




    let cardHTML =  `<div class="productDetails  d-flex flex-column    ">
        
    <div class="d-flex flex-column gap-3  ">
    <div  class="productHeader">
            <h1>${item.title}</h1>
            <p class="username fw-bold fs-7">Seller <span class="text-decoration-underline cl-green ">${item.seller.name}</span></p>
            ${timeStatus}
                            
        </div>
        <div class="productImage d-flex">
            ${userImage}
        </div>
        <div  class="productDescription">
            <p class="lead fw-bold border border-top-0 border-bottom-1 border-start-0 border-end-0 border-dark">Product description</p>
            <p class="">${userText}</p>
        </div>
        <div class="bidsHistory">
            <p class="lead fw-bold border border-top-0 border-bottom-1 border-start-0 border-end-0 border-dark">Bids history</p>
            <ol class="bids list-group list-group-numbered list-group-flush">
                ${bidsHTML}

                </ol>
            </div>
            <form  class="placeBid menuFooter row d-flex flex-column text-center justify-content-center align-items-center gap-3 my-5 m-auto" method="post">
                <p class="gap-2 d-flex align-items-center justify-content-center">Minimum Bid <span class="minimunBid fw-bold lead"> $ ${minimumBid}</span></p>
                <input type="number" class="bidInput col col-md-6 text-center" placeholder="Enter Your Bid Here" min="${minimumBid}" required>
                <button id="bidBtn" type="submit" class="btn col col-md-6 bg-green text-white d-flex justify-content-center align-items-center gap-2 rounded-0">Place Bid<img src="/assets/images/gembid-hammer-icon.svg" width="20px" height="20px"></button>
            </form>
            </div>
                     `;

    return cardHTML;
}
