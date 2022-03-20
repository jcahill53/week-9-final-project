const BASE_URL = `https://gateway.marvel.com:443/`;
const resourceType = `v1/public/characters`
const API_KEY = '192c597a69f5e5f60181fcd4569e8f79';
const hash = `07dced18d8feafe4974a0029ce3e1003`

const containerDiv = document.getElementById("container");
const formEl = document.getElementById("hero-form");
const heroInput1El = document.getElementById("heroNameStart");

//Upon submit fetch data from the API and populate the page

formEl.addEventListener('submit', function (e) {
  e.preventDefault();

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
    //end of fetch

    //DEFINE THE ARRAY OF HEROS THAT RETURNS FROM THE FETCH
    .then(function (responseJson) {
      //return js object from json
      console.log(responseJson.data);

      //display array of objects returned
      const heroResults = responseJson.data.results;
      console.log(heroResults);

      for (let i = 0; i < array.length; i++) {

          const hero = responseJson.data.results[i];
          console.log(hero);

          const heroId = hero.id;
          const heroName = hero.name;
          const heroDescr = hero.description;
          const thumbPath = hero.thumbnail.path
          const thumbExt = hero.thumbnail.extension
          const heroThumbnail = `${thumbPath}.${thumbExt}`

          console.log(heroId);
          console.log(heroName);
          console.log(heroDescr);
          console.log(heroThumbnail);

      }
      //end of for loop

      // for (const i in heroResults) {
      //   if (heroResults.hasOwenProperty(i)) {
      //     let hero = heroResults[i]

      //     console.log(hero);
      //     const name = hero.name;
      //     console.log(name);
      //   }
      // }
      //end of for if loop

    })
    //end of then

    //CONSOLE A MESSAGE IF THE FETCH IS NOT SUCCESSFUL
    .catch(function () {
      console.log(`No data returned from the fetch request`)
    })
  //end of catch

});
//end of event listener