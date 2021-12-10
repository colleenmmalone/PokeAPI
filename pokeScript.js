//https://pokeapi.co/api/v2/pokemon/eevee
//https://pokeapi.co/api/v2/pokemon/10

var apiURL = 'https://pokeapi.co/api/v2/pokemon/'; // Endpoint you are sending a GET request to

document.getElementById('getData').onclick = getData; //getData is my button id

function getData() {
    // If using input for identifiers, etc.    
    var userInput = document.getElementById('dataInput').value; // my texbox

    // 4 steps to making an AJAX call ==========================================================

    // STEP 1: Create an XML Http Request object
    var xhttp = new XMLHttpRequest();

    // STEP 2: Set a callback function for the readystatechange event
    xhttp.onreadystatechange = receiveData;

    // STEP 3: Open the request 
    //where userInput = 10
    xhttp.open('GET', apiURL + '' + userInput.toLowerCase()); //was not recognizing capitalization
    // GET https://pokeapi.co/api/v2/pokemon/10

    // STEP 4: Send the request
    xhttp.send();

    // This needs to be an inner function so that it has closure to xhttp.
    function receiveData() {
        /*
            Different ready states of an XMLHttpRequest object
            0: UNSENT
            1: OPENED
            2: HEADERS RECEIVED
            3: LOADING
            4: DONE
        */
        // Emptying out the div before inserting new data.
        var dataSection = document.getElementById('restData'); // my div
        dataSection.innerHTML = ''; //clear contents of div
        if (xhttp.readyState === 4) { //if done
            if (xhttp.status === 200) { // HTTP status code is "OK"
                var response = xhttp.responseText;
                response = JSON.parse(response); //parse a JSON object to a "readable" output
                displayData(response); //calls displayData function
                //console.log(response)
            } else {
                // Ready state is DONE but status code is not "OK"
                dataSection.innerHTML = 'It Got Away!';
            }
        } else {
            // Ready state is not DONE
            dataSection.innerHTML = 'I\'m thinking...'; 
        }
    }
}

function displayData(response) {
    var dataSection = document.getElementById('restData'); //my div, now named dataSection
    
    var idTag = document.createElement('h3'); //create a new header that exists somewhere
    idTag.innerHTML=`name: ${response.species.name}`; //print name in my new header

    var num = document.createElement('h3'); //number
    num.innerHTML=`number: ${response.id}`;

    //Pokémon can have one or two types, they arrive as an array, causes errors if arr[1] is null
    var typesArr = document.createElement('h3'); //typing
    var t = (response.types).length; //find length of types array I GOT
    if(t == 1){ //print according to number of types
        typesArr.innerHTML = `type: ${response.types[0].type.name}`;
    }else{
        typesArr.innerHTML = `types: ${response.types[0].type.name}, ${response.types[1].type.name}`;
    }

    var baseXP = document.createElement('h3'); //base exp
    baseXP.innerHTML=`base experience: ${response.base_experience}`;

    var pix = document.createElement('h3'); //pictures: regular + shiny
    pix.innerHTML=`<center><img src="${response.sprites.front_default}" style="width: 200px;"><img src="${response.sprites.front_shiny}" style="width: 200px;"></center>`;

    dataSection.appendChild(idTag); //append the headers I created to the dataSection div
    dataSection.appendChild(num);
    dataSection.appendChild(typesArr);
    dataSection.appendChild(baseXP);
    dataSection.appendChild(pix);
    
    
}
