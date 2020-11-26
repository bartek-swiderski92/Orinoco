const cartContent = document.querySelector('#cart-content');
// const basketSpinner = document.querySelector('#basket-spinner');
// cartContent.innerHTML = `<div class="text-center p-5">
// <div class="spinner-border text-primary" id="basket-spinner"role="status">
//   <span class="sr-only">Loading...</span>
// </div>
// </div>`
// basketSpinner.style.display = 'none'

function generateNodes() {
    basketContent = JSON.parse(localStorage.getItem('basket'))
    cartContent.innerHTML = '';
    for (let i = 0; i < basketContent.length; i++) {
        const itemEl = document.createElement('div');
        itemEl.id = `index-${i}`
        itemEl.classList.add('row', 'item-node');
        itemEl.dataset.itemId = basketContent[i];
        cartContent.appendChild(itemEl);
    }
    enableForm();

}

function displayItems(items) {
    const itemNodes = document.querySelectorAll('.item-node');
    for (let i = 0; i < itemNodes.length; i++) {
        let datasetId = itemNodes[i].dataset.itemId
        items.forEach(item => {
            if (datasetId === item._id) {
                let itemIndex = 0;
                let dollars = priceToDollars(item.price)
                itemNodes[i].innerHTML = ` <div class="col">
                <div class="container ">
                    <div class="row my-2 shadow border border-warning">
                        <div class="col-5 col-md-3 my-3">
                            <img src="${item.imageUrl}" alt="${item.name}" class="img-fluid img-thumbnail">
                        </div>
                        <div class="col-5 col-md-8">
                            <h3 class="mt-3">${item.name}</h3>
                            <div class="h5 font-weight-bold mt-3" data-item-price="${item.price}">${dollars}</div>
                            <button id="item-index-${itemIndex++}"class="btn btn-warning my-4 remove-btn">Remove from cart</button>
                        </div>
                    </div>
                </div>
            </div>`
            };
        });
    };
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(removeButton => removeButton.addEventListener('click', removeItem));
}

function enableForm() {
    const inputElements = document.querySelectorAll('.input-element')
    inputElements.forEach(inputElement => {
        inputElement.removeAttribute('disabled');
    });
};

function displayTotalPrice() {
    const itemPrices = document.querySelectorAll(`[data-item-price]`)
    let totalPrice = 0;
    itemPrices.forEach(itemPrice => {
        totalPrice += itemPrice.dataset.itemPrice * 1
    });
    let totalPriceDollars = priceToDollars(totalPrice)
    const totalPriceElement = document.querySelector('#total-price')
    totalPriceElement.textContent = `Total: ${totalPriceDollars}`
}

async function displayCart(query) {
    if (localStorage.length > 0) {
        generateNodes();
        await getContent(query).then(items => {
            displayItems(items)
            displayTotalPrice();
        })
    }
}

function removeItem() {
    let itemIndex = this.closest('.item-node').id.split('-')[1];
    basketContent.splice(itemIndex, 1)
    console.log(basketContent);
    localStorage.setItem('basket', JSON.stringify(basketContent));
    displayCart(camerasApi);
};

displayCart(camerasApi);

//TODO: form validation