//https://gateway.marvel.com:443/v1/public/characters?name=Spider%20Man&orderBy=name&limit=50&apikey=192c597a69f5e5f60181fcd4569e8f79
//https://gateway.marvel.com:443/v1/public/characters?name=Thor&orderBy=name&limit=20&api-key=192c597a69f5e5f60181fcd4569e8f79
const referrer = `curl --referer cahill53.github.io `
const BASE_URL = `https://gateway.marvel.com:443/`;
const resourceType = `v1/public/characters`
const API_KEY = '192c597a69f5e5f60181fcd4569e8f79';
const heroName = 'Thor';
const nameStartsWith = 'Sp'
const orderBy = 'name';
const limit = 50;
const hash = `07dced18d8feafe4974a0029ce3e1003`

//const url = `${BASE_URL}${resourceType}?name=${heroName}&orderBy=${orderBy}&limit=${limit}&ts=1&apikey=${API_KEY}&hash=${hash}`;
const url = `${BASE_URL}${resourceType}?nameStartsWith=${nameStartsWith}&orderBy=${orderBy}&limit=${limit}&ts=1&apikey=${API_KEY}&hash=${hash}`;

const containerDiv = document.getElementById('container');
const buttonEl = document.getElementsByTagName('button')[0];

console.log(url);
console.log(buttonEl);

 //Upon submit fetch data from the API and populate the page
 
// buttonEl.addEventListener('submit', function (e) {
//   e.preventDefault();

   // Fetch heros
  fetch(url)
    .then(function (data) {
      return data.json();
    })

//DEFINE THE ARRAY OF HEROS THAT RETURNS FROM THE FETCH
    .then(function (responseJson) {
      console.log(responseJson);

//DEFINE HEROS THAT WILL DISPLAY ON THE PAGE
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