var petApiKey = "vb5V9lDO52aGeCa72ne1m62jbeBVnpsmo0zNWB6WXNlaHsxHwX";
var petSecret = "lSZxDywC45exeleR65WjlWjkIIIPl8F4BTB9GexH";
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


var saveBreeds = function (selectedBreeds) { //saves recent breeds to local storage
    var checkBreeds = recentBreeds.breeds.some(breed => breed.breedName === selectedBreeds); //checks to see if breed exists in breeds array
    if (!checkBreeds) { //if breed does not exist
        recentBreeds.breeds.push({ //adds breed to breeds array
            breedName: selectedBreeds
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
    showRecentBreeds(selectedBreed);
}

function loadRecentBreeds() { // get recent breeds searched from local storage
    recentBreeds = JSON.parse(localStorage.getItem("recentBreeds"));
    // if nothing in localStorage, create a new object to track cities arrays
    if (!recentBreeds) {
        recentBreeds = {
            breeds: []
        };
    }
    // loop over object properties
    $.each(recentBreeds, function (select, arr) {
        // then loop over sub-array
        arr.forEach(function (selectedBreed) { // prints recent breeds
            // showRecentBreeds(recentbreed.breedName); 
        });
    });
};
loadRecentBreeds();

function showRecentBreeds(selectedBreeds) { //prints a recent breed
    // create elements that make up a task item
    var breedLi = $("<li>").addClass("list-group-item");
    var breedSpan = $("<span>")
        .attr("breed", selectedBreeds)
        .text(selectedBreeds);
    breedLi.append(breedSpan);
    // append to li list on the page
    $("#selectedBreeds").append(breedLi);
}
// call the pet finder API with your bearer token and get specific info

// call the pet finder API to get a bearer token
function getBearerToken() {
    // These are your credentials. Copied from Slack
    var clientId = "vb5V9lDO52aGeCa72ne1m62jbeBVnpsmo0zNWB6WXNlaHsxHwX"
    var clientSecret = "lSZxDywC45exeleR65WjlWjkIIIPl8F4BTB9GexH"
    // Has to be a POST request because you are sending data
    fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: 'POST',
        // They expect you to send this info in the "body"
        body: "grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret,
        // Needed to prevent errors 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
    }).then(function (apiResponse) {
        return apiResponse.json()
    }).then(function (bearerToken) {
        // This provides you an access token. 
        // It is good for 3600 seconds, or 1 hour.
        console.log(bearerToken)
        getPetData(bearerToken.access_token)
    })
}
function getPetData(bearerToken) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var endpoint = "animals"
    var searchQuery = "type=cat&limit=5&location=19805"
    // This fetch request is a "GET".
    // It doesn't need to be specified though since it is the default
    fetch(proxyurl + "https://api.petfinder.com/v2/" + endpoint + "?" + searchQuery, {
        headers: {
            // Here is where you attach your token
            Authorization: "Bearer " + bearerToken
        }
    }).then(function (apiResponse) {
        return apiResponse.json()
    }).then(function (apiResponse) {
        // This is your example data
        console.log(apiResponse)
    })
}
getBearerToken()

// getPetData();

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