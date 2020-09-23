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
                //console.log(data);
                //console.log('datalength:' + data.length);
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
        //console.log(response);
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                //Create Result Display Info
                fetch("https://api.thecatapi.com/v1/images/search?breed_id=" + data[0].id + "&limit=1&size=thumb&api_key=" + catapiKey).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (urlInfo) {
                            console.log(urlInfo);

                            var breedDisplay = document.getElementById("display")
                            breedDisplay.innerHTML = "";
                            var breedName = document.createElement("h3");
                            breedName.textContent = data[0].name;
                            var breedImage = document.createElement("div");
                            breedImage.innerHTML = '<img src="' + urlInfo[0].url + '">';
                            breedImage.className = "image-resize";
                            var breedFacts = document.createElement("p");
                            breedFacts.className = "playnice";
                            breedFacts.textContent = data[0].description;
                            var learnMore = document.createElement("div");
                            learnMore.innerHTML = "<a href='" + data[0].wikipedia_url + "' target='_blank'> Learn More </a>";
                            breedDisplay.appendChild(breedName);
                            breedDisplay.appendChild(breedImage);
                            breedDisplay.appendChild(breedFacts);
                            breedDisplay.appendChild(learnMore);
                        })
                    }
            })
        });
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

//test modal pop-up
// var modal = document.getElementById("myModal");
// var trigger = document.getElementById("submit");
// var closeButton = document.getElementsByClassName("close-button");

// trigger.onclick = function(){
//     modal.display= "block";
// }

// closeButton.onclick = function(){
//     modal.style.display = "none";
// }
// window.onclick = function(event){
//     if (event.target == modal){
//         modal.style.display = "none";
//     }
// }

//end of modal test

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
        //console.log(bearerToken)
        getPetData(bearerToken.access_token)
    })
}
function getPetData(bearerToken) {
    var zip = document.getElementById("zipInput").value;
    var distance = document.getElementById("distanceInput").value;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var endpoint = "animals"
    var searchQuery = "type=cat&limit=5&location=" + zip + "&distance=" + distance;
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
        console.log(apiResponse);
        console.log(apiResponse.animals);

        var findDisplay = document.getElementById('adoptable');

        findDisplay.innerHTML = "";
         for (var i = 0; i < apiResponse.animals.length; i++) {
            var adoptDiv=$("<div>").attr("id", "adoptDiv"+i);
            var myAnimals=apiResponse.animals[i];
            var myName = myAnimals.name
            var myGender = myAnimals.gender;
            var myAge = myAnimals.age
            var myBreed = myAnimals.breeds.primary;
            var myShelterURL = myAnimals.url;
            var myPublished = myAnimals.published_at;
            var myEmail = myAnimals.contact.email;
            var myPhone = myAnimals.contact.phone;

            if (myAnimals.description) {
            var myDescription = myAnimals.description;
            } else {
                var myDescription = "No description available";
            }

            if (myAnimals.photos[0]){
                var petPhoto = $('<img src="'+myAnimals.photos[0].medium+' alt="Pet Result Photo"/>');
            } else {
                var petPhoto=$('<img src="https://raw.githubusercontent.com/chender93/curtishenderson.github.io/master/no-cat-photos.png" />');
            };

            findDisplay.innerHTML =
            '<div class="card"> <div class="card-image"> <figure class="image is-1by1">' + petPhoto + '</figure> </div> <div class="card-content"> <div class="media"> <div class="media-content"> <p class="title is-3">' + myName + '</p> <p class="subtitle is-5">Age: ' + myAge + ' | Gender: ' + myGender + ' | Breed: ' + myBreed + '</p> <p class="subtitle is-5">' + myDescription + '<a href ="' + myShelterURL + 'Learn More</a> </p> <p class="subtitle is-6"> Contact by Phone: ' + myPhone + '</p> <a href="' + myEmail + ' class="subtitle is-6">Contact the Shelter</a> </div>  </div> <div class="content"> Published: ' + myPublished + '<br></div></div></div>'

            $("#adoptable").append(findDisplay);
               
         }
        
    })
}
document.getElementById('find').addEventListener('click', function (event) {
    getBearerToken();
});


// getPetData();


document.getElementById("submit").addEventListener('click', function (event) {
    var selectedBreed = $('#breed').find(":selected").text();
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