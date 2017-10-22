var arrObjects = [];
var arrPlaced = [];
var allObjectsPlaced = [];
var elements = [];
var boxesModified = [];
var moves = [];
var lastPlaced;
var lastBox;

//Box Constructor
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
}

// Functions to get coordinates of box object
function getX(id) {
    return id % 3;
}
function getY(id) {
    return parseInt((id/3));
}

//Create boxes and push to array "arrObjects"
for (var i = 0; i < 9; i++) {
    var id = document.getElementById(i+1).id;
    var newBox = new boxObject(id, "empty", getX(i), getY(i));
    arrObjects.push(newBox);
}
console.log(arrObjects);

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

//Random generator for input and output
var temp;
var input;
var output;
var inputSideBoxID;
var outputSideBoxID;

// Function to generate random box location
function randomGenerator() {
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

// Function to generate random input and output and highlight starting box
function initiate() {
    inputSideBoxID = randomGenerator();
    input = temp;
    input.highlight = true;
    while (input == temp) {
        outputSideBoxID = randomGenerator();
    }
    output = temp;
    console.log("Input Box ID: " + input.id + 
                "\nOutput Box ID: " + output.id +
                "\nInput Side Box ID: " + inputSideBoxID + 
                "\nOutput Side Box ID: " + outputSideBoxID);
    
    highlightBoxes();
}
initiate();

var inputPressure;
var inputTemperature;
var outputPressure;
var outputTemperature;
var pressureDrop = 1;
var tempInc = 50;

// Function to check if outlet process conditions are satisfied
function checkSolution(arr) {
    var finalPressure = inputPressure;
    var finalTemperature = inputTemperature;
    for (var i = 0; i < arr.length; i++) {
        finalPressure += arr[i].pressure;
        finalTemperature += arr[i].temperature;
    }
    if (finalPressure == outputPressure && finalTemperature == outputTemperature) {
        alert("You won!");
    }
    else {
        alert("Sorry, that's not quite right.");
    }
}

/* Drag and Drop Functions */
var pipeNum = 1, valveNum = 1, heaterNum = 1;
var pipeContainer = document.getElementById("pipe-container");
var valveContainer = document.getElementById("valve-container");
var heaterContainer = document.getElementById("heater-container");

function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

var oldElement;
var newElement;
var currentBox;
function drop(ev) {
    var box = ev.currentTarget;
    console.log("Attempted to place element in Box " + box.id);
    var boxArrayLoc = box.id - 1;
    
    // If placing invalid box
    if (arrObjects[boxArrayLoc].highlight == false && arrObjects[boxArrayLoc].type == "empty") {
        
        console.log("%cFAILED: Box " + box.id + " is not highlighted", "color:red");
        
    } else { // Placing in valid box
        
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.innerHTML="";
        var id = ev.currentTarget.id;
        var currentBox = document.getElementById(id);
        newElement = document.getElementById(data);
        oldElement = currentBox.children[0];
        
        // Push box into "boxesModified" array and new element into "elements" array
        boxesModified.push(box);
        elements.push(newElement);

        // Replace an existing element with new element
        if(box.hasChildNodes()) {
            eraseBox(arrObjects[box.id - 1]);
//            for (var i = 0; i < arrPlaced.length; i++) {
//                if (arrPlaced[i].id == box.id) {
//                    var replacement = arrPlaced[i];
//                }
//            }
            
            box.removeChild(box.childNodes[0]);
            box.appendChild(newElement);

            if (newElement.id.startsWith("pipe")) {

                    arrObjects[id - 1].type = newElement.id;
                    arrObjects[id - 1].pressure = arrObjects[id - 1].pressure - pressureDrop;
//                    replacement.type = newElement.id;
//                    replacement.pressure = -pressureDrop;
                
            } else if (newElement.id.startsWith("heater")) {

                    arrObjects[id - 1].type = newElement.id;
                    arrObjects[id - 1].pressure = arrObjects[id - 1].pressure - pressureDrop;
                    arrObjects[id - 1].temperature = arrObjects[id - 1].temperature + tempInc;
//                    replacement.type = newElement.id;
//                    replacement.pressure = -pressureDrop;
//                    replacement.temperature = tempInc;
                
            } else if (newElement.id.startsWith("valve")) {

                    arrObjects[id - 1].type = newElement.id;
                    arrObjects[id - 1].pressure = -pressureDrop;
//                    replacement.type = newElement.id;
//                    replacement.pressure = -pressureDrop;
                    //TODO
            }
            console.log("%cSUCCESS: Replaced " + oldElement.id + " in Box " + 
                        box.id + " with " + newElement.id, "color:green");
//                console.log(arrPlaced);
            lastPlaced = arrPlaced.length - 1;
            arrPlaced[lastPlaced].highlight = false;
            
            // Add move to "moves" array
            moves.push("replace");
            
        } else { //No error, push value
                
            box.appendChild(newElement);
            newElement = currentBox.children[0];
            if (newElement.id.startsWith("pipe")) {
                
                    arrObjects[id - 1].type = newElement.id;
                    arrObjects[id - 1].pressure = arrObjects[id - 1].pressure - pressureDrop;
                
            } else if (newElement.id.startsWith("heater")) {
                
                    arrObjects[id - 1].type = newElement.id;
                    arrObjects[id - 1].pressure = arrObjects[id - 1].pressure - pressureDrop;
                    arrObjects[id - 1].temperature = arrObjects[id - 1].temperature + tempInc;
                
            } else if (newElement.id.startsWith("valve")) {
                
                    arrObjects[id - 1].type = newElement.id;
                    arrObjects[id - 1].pressure = arrObjects[id - 1].pressure - pressureDrop;
                    //TODO
            }
            arrPlaced.push(arrObjects[id - 1]);
            lastPlaced = arrPlaced.length - 1;
            arrPlaced[lastPlaced].highlight = false;
            
            console.log("%cSUCCESS: Placed " + newElement.id + " in Box " + box.id, "color:green");
            
            moves.push("place");
        }
        
        // Check if puzzle solved
        if (box.id == output.id) {
            checkSolution(arrPlaced);
        }

        // Rehighlight boxes
        rehighlight(arrPlaced[lastPlaced]);

        // Replace powerup container
        replacePowerUp();
        console.log(arrObjects);
    }
    allObjectsPlaced.push(arrObjects[id - 1]);
}

var container = document.getElementById("powerup-bar");
// Function to replace powerup
function replacePowerUp() {
    
    for(var i = 0; i < 3; i++)
        {
            if(container.children[i].children[0] == undefined)
                {
                    if(container.children[i].id.startsWith("pipe"))
                        {
                            pipeNum++;
                            pipeContainer.innerHTML = "<div id='pipe" + pipeNum + "' class='pipe element' draggable='true' ondragstart='drag(event)'></div>";
                        }
                    else if(container.children[i].id.startsWith("heater"))
                        {
                            heaterNum++;
                            heaterContainer.innerHTML = "<div id='heater" + heaterNum + "' class='heater element' draggable='true' ondragstart='drag(event)'></div>";
                        }
                    else if(container.children[i].id.startsWith("valve"))
                        {
                            valveNum++;
                            valveContainer.innerHTML = "<div id='valve" + valveNum + "' class='valve element' draggable='true' ondragstart='drag(event)'></div>";
                        }
                }
        }
}

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
    checkNearby(box);
   

    // Visually highlight assigned boxes
    highlightBoxes();
}

// Function to transfer properties of element to box object
function transferProperties(element) {
    
}

//Function to highlight last element placed to be removed
function highlightRemove() {
    console.log(lastPlaced);
    resetHighlight();
    arrPlaced[lastPlaced].highlight = true;
    highlightBoxes();
}

function undo() {
    
    if (allObjectsPlaced.length != 0) {
        
        lastBox = boxesModified.pop();
        var lastBoxObject = allObjectsPlaced.pop();
        var prevBoxObject = allObjectsPlaced[allObjectsPlaced.length - 1];
        var lastMove = moves.pop();
        var lastElement = elements.pop();
        var prevElement = elements[elements.length - 1];
        
        // Remove last element from last box
        lastBox.removeChild(lastElement);
        if (lastMove == "replace") {
            lastBox.appendChild(prevElement);
        }

        // Rehighlight boxes
        if (allObjectsPlaced.length == 0) {
            totalReset();
        } else {
            rehighlight(prevBoxObject);
        }
    }
    
}

function totalReset() {
    
    resetHighlight();
    input.highlight = true;
    highlightBoxes();
    arrPlaced = [];
    allObjectsPlaced = [];
    elements = [];
    boxesModified = [];
    moves = [];
}