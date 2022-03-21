const BASE_URL = `https://gateway.marvel.com:443/`;
const resourceType = `v1/public/characters`
const API_KEY = '192c597a69f5e5f60181fcd4569e8f79';
const hash = `07dced18d8feafe4974a0029ce3e1003`

const containerDiv = document.getElementById("hero-container");
const formEl = document.getElementById("hero-form");
const heroInput1El = document.getElementById("heroNameStart");

//Upon submit fetch data from the API and populate the page

formEl.addEventListener('submit', function (e) {
  e.preventDefault();

  const containerPrior = document.querySelector('#hero-container');
  while (containerPrior.firstChild) {
    containerPrior.removeChild(containerPrior.firstChild);
  }

  console.log(containerPrior)


  const nameStartsWith = heroInput1El.value;
  const orderBy = 'name';
  const limit = 50;
  const url = `${BASE_URL}${resourceType}?nameStartsWith=${nameStartsWith}&orderBy=${orderBy}&limit=${limit}&ts=1&apikey=${API_KEY}&hash=${hash}`;

  // console.log(url);
  // console.log(containerDiv);
  // console.log(formEl);
  // console.log(heroInput1El);
  // console.log(nameStartsWith);``

  // Fetch heros
  fetch(url)
    .then(function (data) {
      return data.json();
    })

    //DEFINE THE ARRAY OF BOOKS THAT RETURNS FROM THE FETCH
    .then(function (responseJson) {
      console.log(responseJson);

      const heroResults = responseJson.data.results;
      console.log(heroResults);
      console.log(heroResults.length);

      //DEFINE THE FIVE BOOKS THAT WILL DISPLAY ON THE PAGE
      for (let i = 0; i < heroResults.length; i++) {

        const heros = responseJson.data.results[i];
        console.log(heros);

        //DEFINE VARIABLES THAT WILL BE NEEDED TO POPULATE THE PAGE
        const heroId = heros.id;
        const heroName = heros.name;
        const heroDescr = heros.description;
        const thumbPath = heros.thumbnail.path
        const thumbExt = heros.thumbnail.extension
        const heroThumbnail = `${thumbPath}.${thumbExt}`

        console.log(heroId);
        console.log(heroName);
        console.log(heroDescr);
        console.log(heroThumbnail);

        //ADD THE RESULTS TO THE HTML PAGE
        const container = document.getElementById("hero-container");
        console.log(container);

        const heroContent = document.createElement("div");
        heroContent.setAttribute('class', 'hero-card');
        console.log(heroContent);

        heroContent.innerHTML =
          `
           <div class="picture">
           <img class="hero-image"
           src="${heroThumbnail}"
           alt="Picture of the selected hero">
           </div>
          <h2>${heroName}</h2>
          <p>${heroDescr}</p>`

        container.appendChild(heroContent);
      }
    })
    //CONSOLE A MESSAGE IF THE FETCH IS NOT SUCCESSFUL
    .catch(function () {
      console.log(`No data returned from the fetch request`)

      // const container = document.getElementById("hero-container");
      // console.log(container);

      // const heroContent = document.createElement("div");
      // heroContent.setAttribute('class', 'hero-card');
      // console.log(heroContent);

      // heroContent.innerHTML =
      //   `<p>No heros matching your request were found</p>`

      // container.appendChild(heroContent);

    })
});
//end of event listener`