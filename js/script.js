
var catapiKey = "9582ba93-02b0-45de-aa25-7a09bacf82dd";


//in Pawssible Pet Section
//when a breed is selected, and submit button is clicked, site should prompt a picture of

var selectBreed = document.querySelector("#breed").value;

fetch
  ("https://api.thecatapi.com/v1/breeds/search?q=" + selectBreed + "&api_key=" + catapiKey
  )

  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response.data[0]);
  });

console.log(data);

document.getElementById

// for (var)

//     var populateWeather = function (data, cityName) {

//     console.log(data);

//     for (var i = 0; i < 5; i++) {
//       var weather = data['daily'][i];

//       document.getElementById("city-search-term").innerHTML = cityName;

//corresponding breed
//(the user should also be able to see a random fact about cats under the picture??)
//user should be able to save their favorite cat breeds to local storage
//user can view their favorites list
//in Find your Furry Friend Section
//when user