// DOM ELEMENTS
const orderIdEl = document.querySelector('#order-id');
const orderTotalEl = document.querySelector('#order-total');
const customerNameEl = document.querySelector('#customer-name');
const orderSummary = document.querySelector('#order-summary');

const orderDetails = JSON.parse(localStorage.getItem('order'))
// TODO loading screen

function displayOrderDetails(){
    if (localStorage.getItem('order')){
        orderSummary.innerHTML = `
        <div class="row">
        <div class="text-center col">
        <h1 class="text-success h3 font-weight-bold">Order submitted!</h1>
        <h2 class="h4">Total Price: <span id="order-total" class="font-weight-bold text-danger"></span></h2>
        <h3 class="h4">Your Order ID: <span id="order-id"></span></h3>
        <p>Thank you <span id="customer-name"></span> for buying with Ornioco, please check your inbox for order details and tracking!</p>
        </div>`
        orderIdEl.textContent = orderDetails.orderId;
        customerNameEl.textContent = orderDetails.contact.firstName;
        addTotalCost();
        clearLocalStorage('basket', 'order');
        displayCartSpan();
    } else {
        orderSummary.innerHTML = `        
        <div class="row">
        <div class="text-center col">
        <h1 class="text-danger h3 font-weight-bold">Error! Your request has not been proccessed!</h1>
        <h2 class="h4">Please try again</h2>
        <p>If the problem keeps occuring, contact the website support!</p>
        
        </div>
        </div>`
    }
}

function addTotalCost(){
    const productList = orderDetails.products
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