// DOM ELEMENTS
const orderIdEl = document.querySelector('#order-id');
const orderTotalEl = document.querySelector('#order-total');
const customerNameEl = document.querySelector('#customer-name');

const orderDetails = JSON.parse(localStorage.getItem('order'))
const productList = orderDetails.products
// TODO loading screen

function displayOrderDetails(){
    console.log(orderDetails);
    
    orderIdEl.textContent = orderDetails.orderId;
    customerNameEl.textContent = orderDetails.contact.firstName;
    addTotalCost();
    clearLocalStorage('basket', 'order');
    displayCartSpan();
}

function addTotalCost(){
    let totalCost = 0;
    for (let i = 0; i < productList.length; i++) {
        const product = productList[i];
        totalCost += product.price
    }
    console.log(priceToDollars(totalCost));
    orderTotalEl.textContent = priceToDollars(totalCost)
}

function clearLocalStorage(basket, order){
    localStorage.removeItem(basket);
    localStorage.removeItem(order);
}

displayOrderDetails();