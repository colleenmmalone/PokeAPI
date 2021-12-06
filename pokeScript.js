//https://pokeapi.co/api/v2/pokemon/eevee
//https://pokeapi.co/api/v2/pokemon/10

// Endpoint you are sending a GET request to
var apiURL = 'https://pokeapi.co/api/v2/pokemon/';

document.getElementById('getData').onclick = getData;

function getData() {
    // If using input for identifiers, etc.    
    var userInput = document.getElementById('dataInput').value; // 5
    // 4 steps to making an AJAX call
    // STEP 1: Create an XML Http Request object
    var xhttp = new XMLHttpRequest();
    // STEP 2: Set a callback function for the readystatechange event
    xhttp.onreadystatechange = receiveData;

    // STEP 3: Open the request 
    //https://reqres.in/api/users/5
    xhttp.open('GET', apiURL + '' + userInput.toLowerCase());


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
        var dataSection = document.getElementById('restData');
        dataSection.innerHTML = '';
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                // Ready state is DONE, HTTP status code is "OK"
                var response = xhttp.responseText;
                response = JSON.parse(response);
                displayData(response);
                console.log(response)
            } else {
                // Ready state is DONE but status code is not "OK"
                dataSection.innerHTML = 'It Got Away!';
            }
        } else {
            // Ready state is not DONE
            /*
                Can have some sort of "loading" action
            */
           
        }
    }
}


function createTypes(types, ul){
    types.forEach(function(type){
    let typeLi = document.createElement('li');
    typeLi.innerText = type['type']['name'];
    ul.append(typeLi)
    })
  }

function displayData(response) {
    var dataSection = document.getElementById('restData');
    
    var idTag = document.createElement('h3');
    idTag.innerHTML=`name: ${response.species.name}`;
    var num = document.createElement('h3');
    num.innerHTML=`number: ${response.id}`;
    var baseXP = document.createElement('h3');
    baseXP.innerHTML=`base experience: ${response.base_experience}`;
    var pix = document.createElement('h3');
    pix.innerHTML=`<center><img src="${response.sprites.front_default}" style="width: 200px;"><img src="${response.sprites.front_shiny}" style="width: 200px;"></center>`;


    var types = document.createElement('h3');
    var t = (response.types).length;
    if(t == 1){
        types.innerHTML = `type: ${response.types[0].type.name}`;
    }else{
        types.innerHTML = `types: ${response.types[0].type.name}, ${response.types[1].type.name}`;
    }

    dataSection.appendChild(idTag);
    dataSection.appendChild(num);
    dataSection.appendChild(types);
    dataSection.appendChild(baseXP);
    dataSection.appendChild(pix);
    
  //  dataSection.appendChild(lastTag);
  //  dataSection.appendChild(avatarTag);
   
}
