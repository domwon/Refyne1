var myApp = angular.module('myApp', ['ngRoute']);

// AngularJS configuration
myApp.config(function ($routeProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'html/splash.html'
	})

	.when('/play', {
		templateUrl: 'html/play.html'
	})
	
	.when('/tutorial', {
		templateUrl: 'html/tutorial.html'
	})
    .when('/team', {
		templateUrl: 'html/team.html'
	})
});

// Box Constructor
function boxObject(id, type, x, y) {
    this.id = id;
    this.type = type;
    this.ycoord = y;
    this.xcoord = x;
    this.connect = false;
    this.pressure = 0;
    this.temperature = 0;
    //TODO: add flow rate for valves?
    this.connectNum = 0;    //pipes and heaters can have max of 2 | valves can have max of 3
    this.highlight = false;
    this.placeNum = 0;
}

// Functions to get coordinates of box object
function getX(id) {
    return id % 3;
}
function getY(id) {
    return parseInt((id/3));
}

// Functions to check surrounding boxes if drop is valid
function checkNearby(currentObject) {
    checkRight(currentObject);
    checkLeft(currentObject);
    checkUp(currentObject);
    checkDown(currentObject);
}
function checkRight(currentObject) {
    for (var i = 0; i < arrObjects.length; i++) {
        if (arrObjects[i].xcoord == currentObject.xcoord + 1 && arrObjects[i].ycoord == currentObject.ycoord) {
            var testObject = arrObjects[i];
            if (testObject.type != "empty") {
            }
            else {
                testObject.highlight = true;
                return 1;
            }
        }
    }
}
function checkLeft(currentObject) {
    for (var i = 0; i < arrObjects.length; i++) {
        if (arrObjects[i].xcoord == currentObject.xcoord - 1 && arrObjects[i].ycoord == currentObject.ycoord) {
            var testObject = arrObjects[i];
            if (testObject.type != "empty") {
            }
            else {
                testObject.highlight = true;
                return 1;
            }
        }
    }
}
function checkUp(currentObject) {
    for (var i = 0; i < arrObjects.length; i++) {
        if (arrObjects[i].xcoord == currentObject.xcoord && arrObjects[i].ycoord == currentObject.ycoord - 1) {
            var testObject = arrObjects[i];
            if (testObject.type != "empty") {
            }
            else {
                testObject.highlight = true;
                return 1;
            }
        }
    }
}
function checkDown(currentObject) {
    for (var i = 0; i < arrObjects.length; i++) {
        if (arrObjects[i].xcoord == currentObject.xcoord && arrObjects[i].ycoord == currentObject.ycoord + 1) {
            var testObject = arrObjects[i];
            if (testObject.type != "empty") {
            }
            else {
                testObject.highlight = true;
                return 1;
            }
        }
    }
}

// Function to delete element in box
function eraseBox(currentObject) {
    currentObject.connect = false;
    currentObject.type = "empty";
    currentObject.pressure = 0;
    currentObject.temperature = 0;
    currentObject.connectNum = 0;
}

// Function to calculate process condition of nearby boxes
function adjustBox(nearbyBox) {
    nearbyBox.connect = false;
    nearbyBox.pressure += 1;
    nearbyBox.temperature -= 50;
    nearbyBox.connectNum--;
}

// Function to generate random box location
function randomLocation() {
    var arrayLetters = ["T", "L", "B", "R"];
    var ranLetter = parseInt(Math.random()*arrayLetters.length);
    var ranNumber = parseInt(Math.random()*Math.sqrt(arrObjects.length));
    
    if (ranLetter == 0) {
        for (var i = 0; i < arrObjects.length; i++){
            if (arrObjects[i].ycoord == 0 && arrObjects[i].xcoord == ranNumber) {
                temp = arrObjects[i];
            }
        }
    }
    else if (ranLetter == 1) {
        for (var i = 0; i < arrObjects.length; i++) {
            if (arrObjects[i].xcoord == 0 && arrObjects[i].ycoord == ranNumber) {
                temp = arrObjects[i];
            }
        }
    }
    else if (ranLetter == 2) {
        for (var i = 0; i < arrObjects.length; i++) {
            if (arrObjects[i].ycoord == Math.sqrt(arrObjects.length) - 1 && arrObjects[i].xcoord == ranNumber) {
                temp = arrObjects[i];
            }
        }
    }
    else if (ranLetter == 3) {
        for (var i = 0; i < arrObjects.length; i++) {
            if (arrObjects[i].xcoord == Math.sqrt(arrObjects.length) - 1 && arrObjects[i].ycoord == ranNumber) {
                temp = arrObjects[i];
            }
        }
    }
    
    // Return sidebox string for id
    return arrayLetters[ranLetter] + (ranNumber + 1).toString();
}

function randomProcessCond() {
    inputPressure = randInt(20, 30);
    inputTemperature = randInt(1, 4) * 50;
    outputPressure = inputPressure - randInt(5, 10);
    outputTemperature = inputTemperature + randInt(0, 4) * 25;
}

function randInt(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Function to generate boxes, random input and output, and highlight starting box
function initiate() {
    // Create boxes and push to array "arrObjects"
    for (var i = 0; i < 9; i++) {
        var id = document.getElementById(i+1).id;
        var newBox = new boxObject(id, "empty", getX(i), getY(i));
        arrObjects.push(newBox);
    }
    console.log(arrObjects);
    
    inputSideBoxID = randomLocation();
    input = temp;
    input.highlight = true;
    while (input == temp) {
        outputSideBoxID = randomLocation();
    }
    output = temp;
    console.log("Input Box ID: " + input.id + 
                "\nOutput Box ID: " + output.id +
                "\nInput Side Box ID: " + inputSideBoxID + 
                "\nOutput Side Box ID: " + outputSideBoxID);
    
    highlightBoxes();
    
    randomProcessCond();

    // Highlight and display input and output process conditions
    var inputSideBox = document.getElementById(inputSideBoxID);
    inputSideBox.classList.add("sideHighlighted");
    inputSideBox.innerHTML = "<h3>Input<br>P: " + inputPressure + "<br>T: " + inputTemperature + "</h3>";
    
    var outputSideBox = document.getElementById(outputSideBoxID);
    outputSideBox.classList.add("sideHighlighted");
    outputSideBox.innerHTML = "<h3>Output<br>P: " + outputPressure + "<br>T: " + outputTemperature + "</h3>";
}

// Function to check if outlet process conditions are satisfied
function checkSolution(arr) {
    var finalPressure = inputPressure;
    var finalTemperature = inputTemperature;
    for (var i = 0; i < arrPlaced.length; i++) {
        finalPressure += arrPlaced[i].pressure;
        finalTemperature += arrPlaced[i].temperature;
    }
    
    if (finalPressure == outputPressure && finalTemperature == outputTemperature) {
        
        
        messageDiv.innerHTML =  '<h1 class="green">You won!</h1><br>Final Conditions<br>P: ' + 
            finalPressure + "<br>T: " + finalTemperature + 
            '<br><br>Required Conditions<br>P: ' + outputPressure + '<br>T: ' + outputTemperature;
        openModal();
        userWin = true;
        
    } else {
        
//        alert("Sorry, that's not quite right.\n\nRequired Conditions\nP: " + 
//              outputPressure + "\nT: " + outputTemperature +
//              "\n\nFinal Conditions\nP: " + finalPressure + "\nT: " + finalTemperature
//             );
        
        messageDiv.innerHTML = "<h1 class='red'>Try again!</h1><br>Final Conditions<br>P: " + 
            finalPressure + "<br>T: " + finalTemperature + 
            "<br><br>Required Conditions<br>P: " + outputPressure + "<br>T: " + outputTemperature;
        openModal();
        
        // Complete reset board
        completeReset();
        
        // Hide checkBtn & resetBtn
        checkBtn.style.visibility = "hidden";
        resetBtn.style.visibility = "hidden";
        
    }
}

// Function to completely reset game
function completeReset() {
    console.log(input);
    var grid = document.getElementById("grid");
    var squareArr = grid.getElementsByClassName("gridSquare");
    for(var i = 0; i < arrObjects.length; i++)
        {
            if(squareArr[i].childNodes[0] != undefined)
                {
                    squareArr[i].innerHTML = '';               
                }
            arrObjects[i].type = "empty";
            arrObjects[i].connect = false;
            arrObjects[i].pressure = 0;
            arrObjects[i].temperature = 0;
            arrObjects[i].connectNum = 0;    //pipes and heaters can have max of 2 | valves can have max of 3
            arrObjects[i].highlight = false;
        }
    arrPlaced = [];
    input.highlight = true;
    highlightBoxes();
}

/* Drag and Drop Functions */
function allowDrop(ev) {
    ev.preventDefault();
} 

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    
    var oldElement;
    var newElement;
    
    currBox = ev.currentTarget;
    
    ev.draggable = false;
    console.log("Attempted to place element in Box " + currBox.id);
    var boxArrayLoc = currBox.id - 1;
    
    // If placing invalid box
    if (arrObjects[boxArrayLoc].highlight == false && arrObjects[boxArrayLoc].type == "empty") {
        
        console.log("%cFAILED: Box " + currBox.id + " is not highlighted", "color:red");
        
    } else { // Placing in valid box
        oldElement = currBox.childNodes[0];
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.innerHTML="";
        newElement = document.getElementById(data);
        var source;
        
        // Disable further dragging of element
        newElement.draggable = false;
//        console.log(oldElement);

        // Replace an existing element with new element
        if (currBox.hasChildNodes()) {
            
            eraseBox(arrObjects[currBox.id - 1]);
            
            currBox.removeChild(currBox.childNodes[0]);
            currBox.appendChild(newElement);
            
            // Transfer element properties to box object
            transferProperties(currBox.id, newElement, false);
            
            console.log("%cSUCCESS: Replaced " + oldElement.id + " in Box " + 
                        currBox.id + " with " + newElement.id, "color:green");
            
//            source = getReplacedImgLink();
            
        } else { // Place new element
                
            currBox.appendChild(newElement);
            newElement = currBox.children[0];
          
            // Transfer element properties to box object
            transferProperties(currBox.id, newElement, true);
            
            arrPlaced.push(arrObjects[currBox.id - 1]);
            lastPlaced = arrPlaced.length - 1;
            arrPlaced[lastPlaced].highlight = false;
            
            console.log("%cSUCCESS: Placed " + newElement.id + 
                        " in Box " + currBox.id, "color:green");
            
//            source = getPlacedImgLink(currBox, lastPlaced);
//            addBoxImg(currBox, source);
        }
        
        // Rehighlight boxes
        console.log(currBox.id);
        console.log(output.id);
        if (currBox.id != output.id && !outputReached) {
            
            console.log("Output not reached");
            rehighlight(arrPlaced[lastPlaced]);
            
        } else { // Remove all highlights
            
            resetHighlight();
            highlightBoxes();
            
            // Make checkBtn visible
            checkBtn.style.visibility = "visible";
            outputReached = true;
            console.log("Output reached");
            
        }
        
        // Replace powerup container
        replacePowerUp();
        console.log(arrObjects);
        
        // Display undoBtn & resetBtn if there's at least 1 element on grid
        if (arrPlaced.length == 1) {
            resetBtn.style.visibility = "visible";
        }
    }
    
}

// Function to replace powerup
function replacePowerUp() {
    
    for(var i = 0; i < 3; i++) {
        if(container.children[i].children[0] == undefined) {
            
            if (container.children[i].id.startsWith("bluePipe")) {
                
                bluePipeNum++;
                bluePipeContainer.innerHTML = "<div id='bluePipe-" + bluePipeNum + 
                    "' class='bluePipe element' draggable='true' ondragstart='drag(event)'></div>";
                
            } else if (container.children[i].id.startsWith("greenPipe")) {
                            
                greenPipeNum++;
                greenPipeContainer.innerHTML = "<div id='greenPipe-" + greenPipeNum + 
                    "' class='greenPipe element' draggable='true' ondragstart='drag(event)'></div>";
            
            } else if (container.children[i].id.startsWith("heater")) {
                            
                heaterNum++;
                heaterContainer.innerHTML = "<div id='heater-" + heaterNum + 
                    "' class='heater element' draggable='true' ondragstart='drag(event) ' onclick = 'heaterSetting(this)'><div>&#9832;</div></div>";
            
            }
                    
        }
    }
}

// Function to set all boxes highlight property to false
function resetHighlight() {
    for (var i = 0; i < arrObjects.length; i++) {
            arrObjects[i].highlight = false;
        }
}

// Function to visually show highlighted boxes
function highlightBoxes() {
    // Look in objects array and boxes that have highlighted = true
    for (var i = 0; i < arrObjects.length; i++) {
        var boxID = (i+1).toString();
        if (arrObjects[i].highlight == true) {
            document.getElementById(boxID).classList.add("highlighted");
        } else {
            document.getElementById(boxID).classList.remove("highlighted");
        }
    }
}

// Wrapping function to rehighlight boxes
function rehighlight(box) {
    //To reset all highlight values to false after each drop
    resetHighlight();

    // Assign highlighted boxes
//    console.log(box);
    checkNearby(box);
   
    // Visually highlight assigned boxes
    highlightBoxes();
}

// Function to transfer properties of element to box object
function transferProperties(boxID, element, placement) {
    
    var boxObjectLoc = boxID - 1;
    var currBoxObj = arrObjects[boxObjectLoc];
    
    
    if (element.id.startsWith("bluePipe")) {

        currBoxObj.type = element.id;
        currBoxObj.pressure = -pressureDrop;
        
    } else if (element.id.startsWith("greenPipe")) {

        // Green Pipe has 2x more pressure drop than Blue Pipe
        currBoxObj.type = element.id;
        currBoxObj.pressure = -pressureDrop * 2;

    } else if (element.id.startsWith("heater")) {

        currBoxObj.type = element.id;
        currBoxObj.pressure = -pressureDrop;
        currBoxObj.temperature = tempInc;

    } else {
        
        currBoxObj.type = "empty";
        currBoxObj.pressure = 0;
        currBoxObj.temperature = 0;
        
    }
    
    // Change placeNum in box obj if it's new placement
    if (placement) {
        placeNum ++;
        currBoxObj.placeNum = placeNum;
    }
}

//Function to highlight last element placed to be removed
function highlightRemove() {
    console.log(lastPlaced);
    resetHighlight();
    arrPlaced[lastPlaced].highlight = true;
    highlightBoxes();
}

function resetGame() {
    
    resetHighlight();
    input.highlight = true;
    highlightBoxes();
    arrPlaced = [];
    moves = [];
    outputReached = false;
    var placeNum = 0;
    resetBtn.style.visibility = "hidden";
}

// Open the modal 
function openModal() {
    modal.style.display = "block";
}

// Close the modal when the user clicks on the x btn
function closeModal() {
    modal.style.display = "none";
    if (userWin) {
        location.reload();
    }
    userWin = false;
    outputReached = false;
}

function heaterSetting(ev) {
    var parentNodeId = ev.parentElement.id;
    heatObject = parentNodeId - 1;

    if(parentNodeId != "heaterContainer")
        {
            var oldTemp = arrObjects[parentNodeId-1].temperature;
            messageDiv.innerHTML = '<div id="heaterControlsRightSide"><div class="center-wrapper">' +
                '<div><div id = "heaterDisplay"><b>Heating Temp: <br><br><span id = "value"></span></b></div>' +
                '<br><div><button id = "heaterSubmit" onclick = "submitHeat();"><b>Set</b></button>' +
                '</div></div></div></div>' +
                '<div id="heaterControlsLeftSide"><div class="center-wrapper">' +
                '<input  id = "slider" type = "range" min = "0" max = "50" value = "' + oldTemp + '" step = "25">' +
                '</div></div>';
            openModal();
            slider = document.getElementById("slider");
            heaterOutput = document.getElementById("value");
            updatedHeat = slider.value;
            heaterOutput.innerHTML = slider.value + " &#x2103";
            
            slider.oninput = function(){
                heaterOutput.innerHTML = this.value + " &#x2103"; 
                updatedHeat = this.value;
            }
        }
}

function submitHeat() {
    newHeaterTemp = parseInt(updatedHeat);
    modal.style.display = "none";
    console.log("Element in array is " + heatObject);
    
    // Change pressure based on heater.
    switch (newHeaterTemp) {
        case 50:
            newHeaterPressure = 1;
            break;
        case 25:
            newHeaterPressure = 0;
            break;
        default: // newHeaterTemp = 0
            newHeaterPressure = -1;
            break;
    }
    
    // Update process conditions in backend
    arrObjects[heatObject].temperature = newHeaterTemp;
    arrObjects[heatObject].pressure = newHeaterPressure;
    console.log("New heater temperature is: " + newHeaterTemp);
    console.log("New heater pressure is: " + newHeaterPressure);
    
}