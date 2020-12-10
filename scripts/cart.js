//DOM ELEMENTS
const cartContent = document.querySelector('#cart-content');

const basketContent = JSON.parse(localStorage.getItem('basket'))

//FORM ELEMENTS
const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const addressInput = document.querySelector('#address');
const cityInput = document.querySelector('#city');
const emailInput = document.querySelector('#email');
const submitOrderBtn = document.querySelector('#submit-order');
const inputArray = [firstNameInput, lastNameInput, addressInput, cityInput, emailInput]

function formValidation() {
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    let emptyInput = 0;
    inputArray.forEach(input => {
        if (!input.value) {
            input.classList.add('highlight')
            emptyInput++
        } else {
            input.classList.remove('highlight')
        }
    });
    if (!validateEmail(emailInput.value)) {
        emailInput.classList.add('highlight')
        alert('Please input correct email address!')
        return false
    } else {
        emailInput.classList.remove('highlight')
    }
    if (emptyInput > 0) {
        alert('Please fill all highlighted fields!')
        return false
    } else {
        return true
    }
}
inputArray.forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('highlight')
    })
});

function generateNodes() {
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
    let itemIndex = 0;
    for (let i = 0; i < itemNodes.length; i++) {
        let datasetId = itemNodes[i].dataset.itemId
        items.forEach(item => {
            if (datasetId === item._id) {
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
    cartContent.innerHTML = loadingAnimation;

    if (basketContent && basketContent.length > 0) {
        generateNodes();
        await getContent(query).then(items => {
            displayItems(items)
            displayTotalPrice();
        })
    } else {

        inputArray.forEach(inputElement => {
            inputElement.setAttribute('disabled', true);
        });
        submitOrderBtn.setAttribute('disabled', true);
        displayTotalPrice();

        cartContent.innerHTML = `<div class="row">
        <div class="col">
            <div class="container ">
                <div class="row my-2 shadow border border-danger">
                    <div class="col m-5">
                        <h3 class="text-center">Your Basket is empty!</h3>
                    </div>

                </div>
            </div>
        </div>
    </div>`;
    }
    displayCartSpan();
}

function removeItem(event) {
    let itemIndex = event.target.id.split('-')[2];
    basketContent.splice(itemIndex, 1)
    localStorage.setItem('basket', JSON.stringify(basketContent));
    displayCart(camerasApi);
};

displayCart(camerasApi);

async function placeOrder(event) {
    event.preventDefault();
    if (formValidation()) {
        const products = basketContent;
        const contact = {
            firstName: document.querySelector('#firstName').value,
            lastName: document.querySelector('#lastName').value,
            address: document.querySelector('#address').value,
            city: document.querySelector('#city').value,
            email: document.querySelector('#email').value
        }
        await fetch(camerasApiOrder, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contact: contact,
                    products: products
                })
            })
            .then(response => response.json())
            .then(response => localStorage.setItem('order', JSON.stringify(response)))
            .then(() => window.location.href = `/order.html`)
            .catch(error => console.log(error))
    } else {
        return
    }
};

submitOrderBtn.addEventListener('click', placeOrder);