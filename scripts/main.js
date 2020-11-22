// API URL
const api = 'http://localhost:3000/';
const camerasApi = `${api}api/cameras/`;

async function getContent(query) {
    const response = await fetch(query);
    const data = await response.json();
    return data;
}

const priceToDollars = (price) => {
    price /= 100
    price = price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
    return price
};