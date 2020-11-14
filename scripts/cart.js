// API URL
const api = 'http://localhost:3000/';
const camerasApi = `${api}api/cameras/`;

const cartContent = document.querySelector('#cart-content');
// const basketSpinner = document.querySelector('#basket-spinner');
// cartContent.innerHTML = `<div class="text-center p-5">
// <div class="spinner-border text-primary" id="basket-spinner"role="status">
//   <span class="sr-only">Loading...</span>
// </div>
// </div>`
// basketSpinner.style.display = 'none'

function generateNodes() {

    function generateItemNode(i) {
        const itemEl = document.createElement('div');
        itemEl.id = `item-no-${i}`;
        itemEl.classList.add('row', 'item-node');
        itemEl.dataset.itemId = `${localStorage.getItem(`item-${i}`)}`
        cartContent.appendChild(itemEl);
        // itemEl.innerHTML = localStorage.getItem(`<div>test</div>`)
        document.querySelector(`#item-no-${i}`).innerHTML = `<div>${localStorage.getItem(`item-${i}`)}</div>`
    }
    for (let i = 1; i < localStorage.length + 1; i++) {
        console.log(localStorage.getItem(`item-${i}`));
        generateItemNode(i);
    }

}

async function getContent(query) {
    const response = await fetch(query);
    const data = await response.json();
    return data;
}

function displayItems(items) {
    console.log('displaying items');
    console.log(items);
    const itemNodes = document.querySelectorAll('.item-node');
    for (let i = 0; i < itemNodes.length; i++) {
        let datasetId = itemNodes[i].dataset.itemId
        items.forEach(item => {
            if (datasetId === item._id) {
                //converts price to dollars
                let dollars = item.price / 100
                dollars = dollars.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                });
                itemNodes[i].innerHTML = ` <div class="col">
                <div class="container ">
                    <div class="row my-2 shadow border border-warning">
                        <div class="col-5 col-md-3 my-3">
                            <img src="${item.imageUrl}" alt="${item.name}" class="img-fluid img-thumbnail">
                        </div>
                        <div class="col-5 col-md-8">
                            <h3 class="mt-3">${item.name}</h3>
                            <div class="h5 font-weight-bold mt-3" data-item-price="${item.price}">${dollars}</div>
                            <a href="#" class="btn btn-danger my-4">Remove from cart</a>
                        </div>
                        <!-- <div class="col col-md-2 mx-4 mb-4 mt-md-5"> -->
                        <!-- </div> -->
                    </div>
                </div>
            </div>`
            }
        });
    }
}

function displayTotalPrice() {
    const itemPrices = document.querySelectorAll(`[data-item-price]`)
    // [3].dataset.itemPrice
    let totalPrice = 0;
    itemPrices.forEach(itemPrice => {
        totalPrice += itemPrice.dataset.itemPrice * 1
    });
    //converts price to dollars
    let totalPriceDollars = totalPrice / 100
    totalPriceDollars = totalPriceDollars.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
    console.log(totalPriceDollars);
    const totalPriceElement = document.querySelector('#total-price')
    totalPriceElement.textContent = `Total: ${totalPriceDollars}`
}


function displayCart(query) {
    if (localStorage.length > 0) {
        console.log('cart is full');
        generateNodes();
        getContent(query).then(items => {
            displayItems(items)
            displayTotalPrice();
        })

    } else {
        console.log('cart is empty');

    }
}

displayCart(camerasApi);