
var catapiKey = "9582ba93-02b0-45de-aa25-7a09bacf82dd";

// var selectBreed = "Siamese";

var recentBreeds = "";

function getBreeds() {
  var getBreedsUrl = "https://api.thecatapi.com/v1/breeds?attach_breed=0&api_key=" + catapiKey;

  fetch(getBreedsUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        console.log('datalength:' + data.length);
        for (var i = 0; i < data.length; i++) {
          var myOptions = $("<option>").val(data[i].id).text(data[i].name);

          $("#breed").append(myOptions);
        }

      
       
      });


    } else {
      console.log(response.statusText);
    }
  });
}
getBreeds();

//in Pawssible Pet Section
//when a breed is selected, and submit button is clicked, site should prompt a picture of


var saveBreeds = function(selectedBreeds) { //saves cities to local storage
  var checkBreeds = recentBreeds.breeds.some(breed => breed.breedName === selectedBreeds); //checks to see if breed exists in breeds array
  if (!checkBreeds){ //if breed does not exist
    recentBreeds.breeds.push({ //adds breed to breeds array
        breedName:selectedBreeds
    });
    // update task in array and re-save to localstorage
    // saveBreeds(); // saves breeds array to local storage
}
  localStorage.setItem("recentBreeds", JSON.stringify(recentBreeds));
};
function getBreed(selectedBreed) {


  var getBreedURL = "https://api.thecatapi.com/v1/breeds/search?q=" + selectedBreed + "&api_key=" + catapiKey;


  fetch(getBreedURL).then(function (response) {
    console.log(response);
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      })
    }
  });
 
  
 saveBreeds(selectedBreed);
}

function loadRecentBreeds(){ // get recent breeds searched from local storage
  recentBreeds = JSON.parse(localStorage.getItem("recentBreeds"));
  // if nothing in localStorage, create a new object to track cities arrays
  if (!recentBreeds) {
      recentBreeds = {
          breeds:[]
      };
  }
  // loop over object properties
  $.each(recentBreeds, function(select, arr) {
      // then loop over sub-array
      arr.forEach(function(selectedBreed) { // prints recent breeds
          // showRecentBreeds(recentbreed.breedName); 
      });  
  });  
};
loadRecentBreeds();


document.getElementById("submit").addEventListener('click', function (event) {
  var selectedBreed = $('#breed').find(":selected").val();
  getBreed(selectedBreed);
});


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