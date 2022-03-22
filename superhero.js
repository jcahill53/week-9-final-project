// Global definition of elements needed for this process
const containerDiv = document.getElementById("hero-container");
const formEl = document.getElementById("hero-form");
const heroInput1El = document.getElementById("heroNameStart");

//Upon submit move the POW image to the right, fetch data from the API and populate the page
formEl.addEventListener('submit', function (e) {
  e.preventDefault();

  // delete any hero results from a prior fetch request
  const containerPrior = document.querySelector('#hero-container');
  while (containerPrior.firstChild) {
    containerPrior.removeChild(containerPrior.firstChild);
  }

  // move Pow image to the right
  const imgObj = document.getElementById('powImage');
  console.log(imgObj);
  imgObj.style.position = 'relative';
  imgObj.style.left = '0px';

  // Move the image left until it reaches the middle of the page
  const moveRight = () => {
    if (parseInt(imgObj.style.left) < 550) {
      imgObj.style.left = parseInt(imgObj.style.left) + 10 + 'px';
      requestAnimationFrame(moveRight);
    }

  };

  moveRight();

  //  const moveLeft = () => {
  //   if (parseInt(imgObj.style.left) > 550) {
  //     imgObj.style.left = parseInt(imgObj.style.left) - 10 + 'px';
  //     requestAnimationFrame(moveLeft);
  //   }
  //  };

  //  moveLeft();

  // Define variables needed to create the URL
  const BASE_URL = `https://gateway.marvel.com:443/`;
  const resourceType = `v1/public/characters`
  const API_KEY = '192c597a69f5e5f60181fcd4569e8f79';
  const hash = `07dced18d8feafe4974a0029ce3e1003`
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

    //DEFINE THE ARRAY HEROSS THAT RETURNS FROM THE FETCH
    .then(function (responseJson) {
      console.log(responseJson);

      const heroResults = responseJson.data.results;
      console.log(heroResults);
      console.log(heroResults.length);

      //DEFINE THE HEROS THAT WILL DISPLAY ON THE PAGE
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

        // console.log(heroId);
        // console.log(heroName);
        // console.log(heroDescr);
        // console.log(heroThumbnail);

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