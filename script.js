var displayCharArr = [
  "Iron Man",
  "Captain America",
  "Black Panther",
  "Thor",
  "Hulk",
  "Doctor Strange",
  "Spider-man",
  "Falcon",
  "Scarlet Witch",
  "Ant-Man",
  "Hawkeye",
  "Star-Lord",
  "Gamora",
  "Groot",
  "Nebula",
];

// Foundation reveal - with Jquery
generateHeroReveal();

//add attributes and elements
for (i = 0; i < displayCharArr.length; i++) {
  var superheroQueryURL =
    "https://superhero-search.p.rapidapi.com/?hero=" + displayCharArr[i];
  $.ajax({
      url: superheroQueryURL,
      method: "GET",
      headers: {
        "x-rapidapi-key": "a8a7d89ab3msha883a3614974b83p18f91bjsne43e3e3a76a2",
        "x-rapidapi-host": "superhero-search.p.rapidapi.com",
      },
    })
    .then(function(response) {
      var hero = JSON.parse(response);
      // console.log(hero);

      // make elements dynamically to create cards
      var cellElement = $("<div>")
        .addClass("cell");
      var zoomElement = $("<div>")
        .addClass("zoom");
      var cardSectionElement = $("<div>")
        .addClass("card-section");
      cardSectionElement.attr("style", "font-family: 'Bangers', cursive;");
      // Card Header Name
      var heroName = hero.name;
      var heroNameElement = $("<h4>")
        .text(heroName);
      cardSectionElement.append(heroNameElement);

      // Card Image --> give image a data-attribute of heroName[i] to call upon later when img clicked
      var imageElement = $("<img>");
      imageElement.attr({
        src: hero.images.md,
        "data-heroName": displayCharArr[i],
      });
      imageElement.addClass("heroPicClass");
      imageElement.attr("id", "HeroPic");
      cardSectionElement.append(imageElement);

      // Real Name Description
      var realname = hero.biography.fullName;
      var realnameP = $("<p>")
        .text("Real Name: " + realname);
      cardSectionElement.append(realnameP);
      zoomElement.append(cardSectionElement);
      cellElement.append(zoomElement);
      $("#cardAttach")
        .append(cellElement);
      cellElement.on("click", function() {
        clickCardInfo(heroName);
        renderImages(heroName);
        // $("#cardAttach").hide();
        $("#doodle")
          .show();
      });
    });
}
// need to make changes here so that information goes into the Reveal

// initialize hero reveal (modal)
function generateHeroReveal() {
  // Create reveal modal element
  // create layout of modal
  var revealElem = $("<div>")
    .attr("id", "reveal-elem")
    .addClass("reveal")
    .addClass("modalContainer");
  var heroNameSpan = $("<span>")
    .attr("id", "hero-name");
  revealElem.append($("<h1>")
    .append(heroNameSpan));
  var revealElemContents = $("<div>")
    .attr("id", "reveal-elem-contents");
  revealElem.append(revealElemContents);

  // create close button and append to modal
  var closeBtn = $("<button>")
    .addClass("close-button");
  closeBtn.append($("<span>")
    .attr("aria-hidden", "true")
    .html("&times;"));
  closeBtn.click(function(e) {
    $("#reveal-elem")
      .foundation("close");
  });
  revealElem.append(closeBtn);

  var revealObj = new Foundation.Reveal(revealElem, {});
  console.log(revealObj + " reveal object logged");
}

// CLICK CARD FUNCTION
function clickCardInfo(heroName) {
  var heroInfo = $("#reveal-elem-contents");
  heroInfo.empty();

  $("#hero-name")
    .text(heroName);
  var modalPic = $("<img>")
    .attr("id", "modalHeroImage");
  heroInfo.append(modalPic);

  // create a place to put the Images
  var heroParagraphs = $("<div>")
    .attr("id", "hero-paragraphs");
  heroInfo.append(heroParagraphs);
  var heroPosterDiv = $("<div>")
    .attr("id", "hero-poster-div");
  heroInfo.append(heroPosterDiv);
  console.log("HERO PARAGRAPH DIV AND POSTER DIV ADDED TO Reveal elem");

  var marvelQueryURL =
    "https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=99+&name=" +
    heroName +
    "&apikey=1f75ef821356b695e0ddea475096c267&hash=3700da1df635c0697acbbcfcd70c655a";
  // do ajax call to MARVEL API
  $.ajax({
      url: marvelQueryURL,
      method: "GET",
    })
    .then(function(response) {

      // get marvel superhero object
      var charObj = response.data.results[0];
      // number of comic appearances
      var charComics = charObj.comics.available;
      var comicsNum = $("<p>")
        .text("Number of Comic Appearances: " + charComics)
        .addClass("modalP");
        heroParagraphs.append(comicsNum);
      // number of series appearances
      var charSeries = charObj.series.available;
      var seriesNum = $("<p>")
        .text(
          "Number of Series Appearances: " + charSeries
        );
      heroParagraphs.append(seriesNum);
      // description
      var charDescrip = charObj.description;
      var heroDescription = $("<p>")
        .text("Description: " + charDescrip);
      heroParagraphs.append(heroDescription);

    });
    
  // search Superhero API for other information
  var superheroQueryURL =
    "https://superhero-search.p.rapidapi.com/?hero=" + heroName; // name refers to the heroname being passed
  $.ajax({
      url: superheroQueryURL,
      method: "GET",
      headers: {
        "x-rapidapi-key": "54c80468acmsh43ee2bf41fce3bcp10eeadjsnb0994b7b57f7",
        "x-rapidapi-host": "superhero-search.p.rapidapi.com",
      },
    })
    .then(function(response) {

      // create div for hero information
      var character = JSON.parse(response);
      // characater name
      var name = character.name;
      var nameP = $("<p>")
        .text("Name: " + name);
      heroParagraphs.append(nameP);
      //real name
      var realname = character.biography.fullName;
      var realnameP = $("<p>")
        .text("Real Name: " + realname);
      heroParagraphs.append(realnameP);
      // height .
      var height = character.appearance.height[0];
      var heightP = $("<p>")
        .text("Height: " + height);
      heroParagraphs.append(heightP);
      // weight
      var weight = character.appearance.weight[0];
      var weightP = $("<p>")
        .text("Weight: " + weight);
      heroParagraphs.append(weightP);
      // place of birth
      var placeOfBirth = character.biography.placeOfBirth;
      var placeOfBirthP = $("<p>")
        .text("Place of Birth: " + placeOfBirth);
      heroParagraphs.append(placeOfBirthP);
      // race
      var race = character.appearance.race;
      var raceP = $("<p>")
        .text("Race: " + race);
      heroParagraphs.append(raceP);
      // occupation
      var occupation = character.work.occupation;
      var occupationP = $("<p>")
        .text("Occupation: " + occupation);
      heroParagraphs.append(occupationP);
      // aliases(?)
      var aliases = character.biography.aliases;
      var aliases = $("<p>")
        .text("Aliases: " + aliases);
      heroParagraphs.append(aliases);
      // first appearance(?)
      var firstAppearance = character.biography.firstAppearance;
      var firstAppearanceP = $("<p>")
        .text(
          "First Appearance: " + firstAppearance
        );
      heroParagraphs.append(firstAppearanceP);
      // image to the left of the description
      modalPic.attr("src", character.images.md);

      $("#reveal-elem")
        .foundation("open");
    });

  // search movie API for movie information
  var queryURL =
    "https://movie-database-imdb-alternative.p.rapidapi.com/?s=" +
    heroName +
    "&page=1&r=json";
  $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "x-rapidapi-key": "54c80468acmsh43ee2bf41fce3bcp10eeadjsnb0994b7b57f7",
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
      },
    })
    .then(function(response) {
      var movieMarvel = response;
      //movie title
      var movTitle = movieMarvel.Search[0].Title;
      //create an element
      var movTitleP = $("<p>")
        .text("Title:" + movTitle);
      //append to the div & repeat
      heroParagraphs.append(movTitleP);
      //movie year
      var movYear = movieMarvel.Search[0].Year;
      var movYearP = $("<p>")
        .text("Year:" + movYear);
      heroParagraphs.append(movYearP);
      console.log(movieMarvel);
    });
}
// call the card in the search button function but as large as it can get
$("#searchButton")
  .on("click", function(event) {
    event.preventDefault();
    //start preparing for Marvel API KEY
    var heroName = $("#searchBarField")
      .val()
      .trim();
    localStorage.setItem("heroName", heroName);
    clickCardInfo(heroName);
    renderImages(heroName);

    $("#doodle").show();
  });

  function history(){
    var lastHeroSearched =localStorage.getItem("heroName")
    if (lastHeroSearched !== null){
    $("#searchBarField").val(lastHeroSearched);
    }};
  history();

var herosWithMovies = [{
  name: "Iron Man",
  image: [
    "Images/mcu-ironman-poster.jpg",
    "Images/mcu-marvel%20avengers-poster.jpg",
    "Images/mcu-ironman2-poster.jpg",
    "Images/mcu-ironman3-poster.jpg",
    "Images/mcu-avengers-age-of-ultron-poster.jpg",
    "Images/mcu-captain-america-civil-war-poster.jpg",
    "Images/mcu-spderman-homecoming-poster.jpg",
    "Images/mcu-marvel%20avengers-infinity-war.jpg",
    "Images/mcu-marvel%20avengers-endgame.jpg",
  ],
},

{
  name: "Captain America",
  image: [
    "Images/mcu-captain-america-poster.jpg",
    "Images/mcu-marvel%20avengers-poster.jpg",
    "Images/mcu-captain-america-civil-war-poster.jpg",
    "Images/mcu-avengers-age-of-ultron-poster.jpg",
    "Images/mcu-captain-america-civil-war-poster.jpg",
    "Images/mcu-spderman-homecoming-poster.jpg",
    "Images/mcu-marvel%20avengers-infinity-war.jpg",
    "Images/mcu-captian-marvel-poster.jpg",
    "Images/mcu-marvel%20avengers-endgame.jpg",
  ],
},

{
  name: "Black Panther",
  image: [
    "Images/mcu-captain-america-civil-war-poster.jpg",
    "Images/mcu-black-panther-poster.jpg",
    "Images/mcu-marvel%20avengers-infinity-war.jpg",
    "Images/mcu-marvel%20avengers-endgame.jpg",
  ],
},

{
  name: "Thor",
  image: [
    "Images/mcu-thor-poster.jpg",
    "Images/mcu-marvel%20avengers-poster.jpg",
    "Images/mcu-thor-dark-world-poster.jpg",
    "Images/mcu-avengers-age-of-ultron-poster.jpg",
    "Images/mcu-doctor-strange-poster.jpg",
    "Images/mcu-thor-ragnarok-poster.jpg",
    "Images/mcu-marvel%20avengers-infinity-war.jpg",
    "Images/mcu-marvel%20avengers-endgame.jpg",
  ],
},

{
  name: "Hulk",
  image: [
    "Images/mcu-hulk-poster.jpg",
    "Images/mcu-marvel%20avengers-poster.jpg",
    "Images/mcu-avengers-age-of-ultron-poster.jpg",
    "Images/mcu-thor-ragnarok-poster.jpg",
    "Images/mcu-marvel%20avengers-infinity-war.jpg",
    "Images/mcu-marvel%20avengers-endgame.jpg",
  ],
},

{
  name: "Doctor Strange",
  image: [
    "Images/mcu-doctor-strange-poster.jpg",
    "Images/mcu-thor-ragnarok-poster.jpg",
    "Images/mcu-marvel%20avengers-infinity-war.jpg",
    "Images/mcu-marvel%20avengers-endgame.jpg",
  ],
},

{
  name: "Spider-man",
  image: [
    "Imagesmcu-ironman2-poster.jpg",
    "Images/mcu-captain-america-civil-war-poster.jpg",
    "Images/mcu-spderman-homecoming-poster.jpg",
    "Images/mcu-marvel%20avengers-infinity-war.jpg",
    "Images/mcu-marvel%20avengers-endgame.jpg",
    "Images/mcu-spderman-far-from-home-poster.jpg",
  ],
},

{
  name: "Falcon",
  image: [
    "Images/mcu-captain-america-civil-war-poster.jpg",
    "Images/mcu-avengers-age-of-ultron-poster.jpg",
    "Images/mcu-antman1-poster.jpg",
    "Images/mcu-captain-america-civil-war-poster.jpg",
    "Images/mcu-marvel%20avengers-infinity-war.jpg",
    "Images/mcu-marvel%20avengers-endgame.jpg",
  ],
},

{
  name: "Scarlet Witch",
  image: [
    "Images/mcu-captain-america-civil-war-poster.jpg",
    "Images/mcu-avengers-age-of-ultron-poster.jpg",
    "Images/mcu-captain-america-civil-war-poster.jpg",
    "Images/mcu-marvel%20avengers-infinity-war.jpg",
    "Images/mcu-marvel%20avengers-endgame.jpg",
  ],
},

{
  name: "Ant-Man",
  image: [
    "Images/mcu-antman1-poster.jpg",
    "Images/mcu-captain-america-civil-war-poster.jpg",
    "Images/mcu-antman-&-wasp-poster.jpg",
    "Images/mcu-marvel%20avengers-endgame.jpg",
  ],
},

{
  name: "Hawkeye",
  image: [
    "Images/mcu-marvel%20avengers-poster.jpg",
    "Images/mcu-avengers-age-of-ultron-poster.jpg",
    "Images/mcu-antman1-poster.jpg",
    "Images/mcu-captain-america-civil-war-poster.jpg",
    "Images/mcu-marvel%20avengers-endgame.jpg",
  ],
},

{
  name: "Star-Lord",
  image: [
    "Images/mcu-guardians-of%20the%20galaxy1-poster.jpg",
    "Images/mcu-guardians-of%20the%20galaxy2-poster.jpg",
    "Images/mcu-marvel%20avengers-infinity-war.jpg",
    "Images/mcu-marvel%20avengers-endgame.jpg",
  ],
},

{
  name: "Gamora",
  image: [
    "Images/mcu-guardians-of%20the%20galaxy1-poster.jpg",
    "Images/mcu-guardians-of%20the%20galaxy2-poster.jpg",
    "Images/mcu-marvel%20avengers-infinity-war.jpg",
    "Images/mcu-marvel%20avengers-endgame.jpg",
  ],
},

{
  name: "Groot",
  image: [
    "Images/mcu-guardians-of%20the%20galaxy1-poster.jpg",
    "Images/mcu-guardians-of%20the%20galaxy2-poster.jpg",
    "Images/mcu-marvel%20avengers-infinity-war.jpg",
    "Images/mcu-marvel%20avengers-endgame.jpg",
  ],
},

{
  name: "Nebula",
  image: [
    "Images/mcu-guardians-of%20the%20galaxy1-poster.jpg",
    "Images/mcu-guardians-of%20the%20galaxy2-poster.jpg",
    "Images/mcu-marvel%20avengers-infinity-war.jpg",
    "Images/mcu-marvel%20avengers-endgame.jpg",
  ],
},
];

function renderImages(heroName) {
var heroPosterDiv = $("#hero-poster-div");
console.log(heroPosterDiv);
heroPosterDiv.empty();
// console.log("The hero name chosen is", heroName);

//images from "herosWithMovies" needs to be displayed for the selected character

// Create something to trigger reveal
for (var i = 0; i < herosWithMovies.length; i++) {
  if (herosWithMovies[i].name === heroName) {
    console.log("We found", herosWithMovies[i].name);
    herosWithMovies[i].image.map(image => {
      var heroImage = $("<img>")
        .attr({
          src: image,
          "data-heroName": herosWithMovies[i].name,
        });
      heroImage.addClass("hero-image");
      console.log(heroImage);
      heroPosterDiv.append(heroImage);
    });
  }
}
}
