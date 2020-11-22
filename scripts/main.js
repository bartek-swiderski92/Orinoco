// API URL
const api = 'http://localhost:3000/';
const camerasApi = `${api}api/cameras/`;

const priceToDollars = (price) => {
    price /= 100
    price = price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
    return price
};