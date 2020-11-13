// API URL
const api = 'http://localhost:3000/';
const camerasApi = `${api}api/cameras/`;

// DOM ELEMENTS
const itemsGrid = document.querySelector('#items-grid');

// function makeRequest(verb, url, data) {
//     return new Promise((resolve, reject) => {
//         let request = new XMLHttpRequest();
//         request.open(verb, url);
//         request.onreadystatechange = () => {
//             if (request.readyState === 4) {
//                 if (request.status === 200 || request.status === 201) {
//                     resolve(JSON.parse(request.response));
//                     console.log(JSON.parse(request.response)[0].name);
//                 } else {
//                     reject(JSON.parse(request.response));
//                     reject(console.log('rejecting'));
//                 }
//             }
//         };
//         if (verb === 'POST') {
//             console.log('posting');
//         } else {
//             request.send();
//         }
//     });
// }

// async function createContent() {
//     const cameraItemPromise = makeRequest('GET', camerasApi);
//     // const cameraItemResponse = await Promise(cameraItemPromise);
//     await console.log(cameraItemPromise);

// };




// async function getContent(query) {
//     const response = await fetch(query)
//     const data = await response.json();
//     return data;
// };

// async function displayContent(items) {
//     itemsGrid.innerHTML = 'Loading...';
//     console.log('Creating HTML...');
//     const htmlContent = await items.map(item => {
//         /*html*/
//         `${item.name}`
//     });
//     console.log(htmlContent);
// };

// async function fetchAndDisplay(query) {
//     const items = await getContent(query)
//         .then((items) => {
//             console.log(items);
//             displayContent(items);

//         });
// };
// fetchAndDisplay(camerasApi);

async function getContent(query) {
    const response = await fetch(query);
    const data = await response.json();
    return data;
}

function displayContent(items) {
    itemsGrid.innerHTML = "Loading...";
    console.log("Creating HTML...");
    const htmlContent = items.map(item =>

        /*html*/
        `<div>${
            item.name
        }</div>`

    );
    console.log(htmlContent);
}

async function fetchAndDisplay(query) {
    await getContent(query).then(items => {
        console.log(items);
        displayContent(items);
    });
}
fetchAndDisplay(camerasApi);