// Global definition of elements needed for this process
const containerDiv = document.getElementById("hero-container");
const formEl = document.getElementById("hero-form");
const heroInput1El = document.getElementById("heroNameStart");

//if a favorite hero exists in local storage use that as the input
const favorite = document.getElementById('favorite');
const notFavorite = document.getElementById('notFavorite');
const favoriteName = localStorage.getItem('favoriteHero');

if (favoriteName) {
  heroInput1El.value = favoriteName;
} else {
  console.log(`A favorite does not exist in local storage`)
}

//set pow image to 0px width and 350px height
const imgObj = document.getElementById('powImage');
console.log(imgObj);

imgObj.style.height = "250px";
imgObj.style.width = "0px";



//Upon submit expand POW image to the right, fetch data from the API and populate the page
formEl.addEventListener('submit', function (e) {
  e.preventDefault();

  // delete any hero results from a prior fetch request
  const containerPrior = document.querySelector('#hero-container');
  while (containerPrior.firstChild) {
    containerPrior.removeChild(containerPrior.firstChild);
  }

  // Move the resize the image so it appears on the page via animation


  const expandImage = () => {
    if (parseInt(imgObj.style.width) < 300) {
      imgObj.style.width = parseInt(imgObj.style.width) + 10 + 'px';
      // imgObj.style.width = parseInt(imgObj.style.height) + 10 + 'px';
      requestAnimationFrame(expandImage);
    }
  };

  //animate image
  expandImage();

  //set curent hero input as favorite - to be triggered by event Listener
  const nameStarts = heroInput1El.value;

  const setFavorite = () => {
    if ((document.getElementById('favorite').checked)) {
      localStorage.setItem('favoriteHero', nameStarts);
    } else {
      localStorage.setItem('favoriteHero', '')
    }
  };

  setFavorite();

  // Define variables needed to create the URL
  const BASE_URL = `https://gateway.marvel.com:443/`;
  const resourceType = `v1/public/characters`
  const API_KEY = '192c597a69f5e5f60181fcd4569e8f79';
  const hash = `07dced18d8feafe4974a0029ce3e1003`
  let nameStartsWith = heroInput1El.value;
  const orderBy = 'name';
  const limit = 50;
  const url = `${BASE_URL}${resourceType}?nameStartsWith=${nameStartsWith}&orderBy=${orderBy}&limit=${limit}&ts=1&apikey=${API_KEY}&hash=${hash}`;

  // Fetch heros
  fetch(url)
    .then(function (data) {
      return data.json();
    })

    //DEFINE THE ARRAY HEROSS THAT RETURNS FROM THE FETCH
    .then(function (responseJson) {
      // console.log(responseJson);

      const heroResults = responseJson.data.results;
      // console.log(heroResults);
      // console.log(heroResults.length);

      //DEFINE THE HEROS THAT WILL DISPLAY ON THE PAGE
      for (let i = 0; i < heroResults.length; i++) {

        const heros = responseJson.data.results[i];
        // console.log(heros);

        //DEFINE VARIABLES THAT WILL BE NEEDED TO POPULATE THE PAGE
        const heroId = heros.id;
        const heroName = heros.name;
        const heroDescr = heros.description;
        const thumbPath = heros.thumbnail.path
        const thumbExt = heros.thumbnail.extension
        const heroThumbnail = `${thumbPath}.${thumbExt}`

        // console.log(heroId);
        // console.log(heroName);
        // console.log(heroDescr);
        // console.log(heroThumbnail);

        //add favorite hero to the nav bar


        //ADD THE RESULTS TO THE HTML PAGE
        const container = document.getElementById("hero-container");
        // console.log(container);

        const heroContent = document.createElement("div");
        heroContent.setAttribute('class', 'hero-card');
        // console.log(heroContent);

        heroContent.innerHTML =
          `<div class="picture">
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