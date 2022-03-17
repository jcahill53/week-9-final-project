//https://gateway.marvel.com:443/v1/public/characters?name=Spider%20Man&orderBy=name&limit=50&apikey=192c597a69f5e5f60181fcd4569e8f79
//https://gateway.marvel.com:443/v1/public/characters?name=Thor&orderBy=name&limit=20&api-key=192c597a69f5e5f60181fcd4569e8f79
const BASE_URL = `https://gateway.marvel.com/`;
const resourceType = `v1/public/characters`
const API_KEY = '192c597a69f5e5f60181fcd4569e8f79';
const heroName = 'Thor';
const orderBy = 'name';
const limit = 20;
const hash = `af5adb642b6b43c3cb3fd39ddc83cc82`
const url = `${BASE_URL}${resourceType}?name=${heroName}&orderBy=${orderBy}&limit=${limit}&ts=1&apikey=${API_KEY}&hash=${hash}`;
//const url = `${BASE_URL}${resourceType}?ts=1&apikey=${API_KEY}&hash=${hash}`;

const containerDiv = document.getElementById('container');
const buttonEl = document.getElementsByTagName('button')[0];

console.log(url);
// console.log(buttonEl);

 //Upon submit fetch data from the API and populate the page
 
// buttonEl.addEventListener('submit', function (e) {
//   e.preventDefault();

   // Fetch bestselling books for date and add top 5 to page
  fetch(url)
    .then(function (data) {
      return data.json();
    })

//DEFINE THE ARRAY OF BOOKS THAT RETURNS FROM THE FETCH
    .then(function (responseJson) {
      console.log(responseJson);

//DEFINE THE FIVE BOOKS THAT WILL DISPLAY ON THE PAGE
      for (let i = 0; i < array.length; i++) {
 
        const heros = responseJson.results[i];
        console.log(heros);

//DEFINE VARIABLES THAT WILL BE NEEDED TO POPULATE THE PAGE

      }
    })
//CONSOLE A MESSAGE IF THE FETCH IS NOT SUCCESSFUL
    .catch(function () {
      console.log(`No data returned from the fetch request`)
    })

// });