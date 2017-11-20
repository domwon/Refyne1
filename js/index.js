var myApp = angular.module('myApp', ['ngRoute']);
var cost = {
    bluePipe: 200,
    greenPipe: 100,
    heater: 1000
};
var manager;
// AngularJS configuration
myApp.config(function ($routeProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'html/splash.html'
	})

	.when('/play', {
		templateUrl: 'html/play.html'
	})
    
    .when('/play/select-a-manager', {
		templateUrl: 'html/choose.html'
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
function checkSolution() {
    pause = true; // Pause timer
    var finalPressure = inputPressure;
    var finalTemperature = inputTemperature;
    for (var i = 0; i < arrPlaced.length; i++) {
        finalPressure += arrPlaced[i].pressure;
        finalTemperature += arrPlaced[i].temperature;
    }
    
    if (finalPressure == outputPressure && finalTemperature == outputTemperature) {
        // User won
        
        // Increase level count
        levels++;
        
        var timeBonus = Math.round(secLimit - sec)*25;
        
        var budgetAdditionMSG = "Completion payment: $3000<br>Time bonus: $" + timeBonus.toString();
        
        // Manager boost
        if (manager == "BA") {
            budget += (4000 + timeBonus);
            budgetAdditionMSG += "<br>Manager bonus: $1000";
        } else {
            budget += (3000 + timeBonus);
        }
        
        // Add new budget statement
        budgetAdditionMSG += "<br><br><p class='green'>New budget: $" + budget + '</p>';
        
        messageDiv.innerHTML =  "<h1 class='green''>Level " + levels + " Complete!</h1>" + "<p>" + budgetAdditionMSG + "</p>";
        closeBtn.style.display = "block"; // Display OK btn
        closeBtn.innerHTML = "NEXT GAME"; // Change btn msg
        openModal();
        userWin = true;
        
    } else {
        // User lost
        var pressureMSG = "";
        var tempMSG = "";
        
        // Determine inaccurate condition
        if (finalPressure > outputPressure) {
            pressureMSG = "Excessive pressure<br>";
        } else if (finalPressure < outputPressure) {
            pressureMSG = "Inadequate pressure<br>";
        }
        if (finalTemperature > outputTemperature) {
            tempMSG = "Excessive temperature";
        } else if (finalTemperature < outputTemperature) {
            tempMSG = "Inadequate temperature";
        }
        
        var primaryLostMSG = "Game Over!";
        var secondaryLostMSG = "";
        var accidentMSG = "<h3>Cause of Accident</h3><p>" + pressureMSG + tempMSG + "</p>";
		var lifeMSG;
        var lifeMSGColor;
        
        // Decrease lives, 
        if (manager == "SE") {
            var num = Math.floor(Math.random()*2);
            if (num == 0) {
                lives--;
                lifeMSG = "Accident resulted in losing a life.";
                lifeMSGColor = "yellow";
            } else {
                lifeMSG = "Good safety practices prevented a loss of a life.<br>"
                lifeMSGColor = "green";
            }
        } else {
            lives--;
            lifeMSG = "Accident resulted in losing a life.";
            lifeMSGColor = "yellow";
        }
        
        if (budget < 0) { // User ran out of money
            
            lifeMSG = "Ran out of money.";
            lifeMSGColor = "red";
            accidentMSG = "";
            secondaryLostMSG = "Levels Completed: " + levels + 
                "<br>Budget Remaining: $" + budget + "<br>Lives: " + lives;
            playAgainBtn.style.display = "block"; // Display PLAY AGAIN btn
            window.clearInterval(myInterval);
        
        } else if (timerOut) { // User ran out of time
            
            lifeMSG = "Ran out of time.";
            lifeMSGColor = "red";
            accidentMSG = "";
            secondaryLostMSG = "Levels Completed: " + levels + 
                "<br>Budget Remaining: $" + budget + "<br>Lives: " + lives;
            playAgainBtn.style.display = "block"; // Display PLAY AGAIN btn
            window.clearInterval(myInterval);
        
        } else if (lives == 0) { // User ran out of lives
            
            lifeMSG = "All lives lost.";
            lifeMSGColor = "red";
            secondaryLostMSG = "<br><br>Levels Completed: " + levels + 
                "<br>Budget Remaining: $" + budget + "<br>Lives: " + lives;
            playAgainBtn.style.display = "block"; // Display PLAY AGAIN btn
            window.clearInterval(myInterval);
        
        } else { // User did not have matched conditions
            
            primaryLostMSG = "Try Again!";
            closeBtn.style.display = "block"; // Display OK btn
        }
        
        messageDiv.innerHTML = "<h1 class='red'>" + primaryLostMSG + "</h1><h3 class='" + lifeMSGColor + "'>" + lifeMSG + "</h3>" + accidentMSG + "<p>" + secondaryLostMSG + "</p>";
        openModal();
        
        // Complete reset board
        completeReset();
        
        // Hide checkBtn & resetBtn
        checkBtn.style.visibility = "hidden";
        resetBtn.style.visibility = "hidden";
        
        // Update lives in HTML
        livesEl.innerHTML = lives;
        
    }
    // Save data in local storage
    localStorage.setItem('budget', budget);
    localStorage.setItem('refineryLives', lives);
    localStorage.setItem('levelsCompleted', levels);
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
    
    outputReached = false;
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

        // Replace an existing element with new element
        if (currBox.hasChildNodes()) {
            
            eraseBox(arrObjects[currBox.id - 1]);
            
            currBox.removeChild(currBox.childNodes[0]);
            currBox.appendChild(newElement);
            
            // Transfer element properties to box object
            transferProperties(currBox.id, newElement.id, false);
            
            console.log("%cSUCCESS: Replaced " + oldElement.id + " in Box " + 
                        currBox.id + " with " + newElement.id, "color:green");
            
            for(var i = 0; i < arrPlaced.length; i++)
                {
                    if(arrPlaced[i].id == (currBox.id))
                        {
                            console.log(i);
                            source = getReplacedImgLink(i);
                        }
                }
            
            addBoxImg(currBox, source);
            
        } else { // Place new element
                
            currBox.appendChild(newElement);
            newElement = currBox.children[0];
          
            // Transfer element properties to box object
            transferProperties(currBox.id, newElement.id, true);
            
            arrPlaced.push(arrObjects[currBox.id - 1]);
            lastPlaced = arrPlaced.length - 1;
            arrPlaced[lastPlaced].highlight = false;
            
            console.log("%cSUCCESS: Placed " + newElement.id + " in Box " + currBox.id, "color:green");
            
            if (currBox.id === output.id) {
                source = getReplacedImgLink(lastPlaced);
            } else {
                source = getPlacedImgLink(lastPlaced);
            }
            addBoxImg(currBox, source);
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
        
        // Update budget using cost of element
        updateBudget(newElement.id);
    }
    
}

// Function to replace powerup
function replacePowerUp() {
    
    for(var i = 0; i < 3; i++) {
        if(container.children[i].children[0] == undefined) {
            
            if (container.children[i].id.startsWith("bluePipe")) {
                
                bluePipeNum++;
                bluePipeContainer.innerHTML = '<div id="bluePipe-' + bluePipeNum + 
                    '" class="bluePipe element" draggable="true" ondragstart="drag(event)"><h3>$' + cost.bluePipe + '</h3></div>';
                
            } else if (container.children[i].id.startsWith("greenPipe")) {
                            
                greenPipeNum++;
                greenPipeContainer.innerHTML = '<div id="greenPipe-' + greenPipeNum + 
                    '" class="greenPipe element" draggable="true" ondragstart="drag(event)"><h3>$' + cost.greenPipe + '</h3></div>';
            
            } else if (container.children[i].id.startsWith("heater")) {
                            
                heaterNum++;
                heaterContainer.innerHTML = '<div id="heater-' + heaterNum + 
                    '" class="heater element" draggable="true" ondragstart="drag(event)" onclick = "heaterSetting(this)"><h3>$' + cost.heater + '</h3></div>';
            
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
function transferProperties(boxID, elementID, placement) {
    
    var boxObjectLoc = boxID - 1;
    var currBoxObj = arrObjects[boxObjectLoc];
    currBoxObj.type = elementID;
    
    if (elementID.startsWith("bluePipe")) {

        currBoxObj.pressure = -pressureDrop;
        
    } else if (elementID.startsWith("greenPipe")) {

        // Green Pipe has 2x more pressure drop than Blue Pipe
        currBoxObj.pressure = -pressureDrop * 2;

    } else if (elementID.startsWith("heater")) {

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

// Function to highlight last element placed to be removed
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

// Close the modal when the user clicks on the OK btn
function closeModal() {
    modal.style.display = "none";
    if (userWin) {
        location.reload();
    }
    closeBtn.style.display = "none"; // Hide OK btn
    userWin = false;
    outputReached = false;
    pause = false;
}

// Close the modal when the user clicks on the PLAY AGAIN btn
function playAgain() {
    modal.style.display = "none";
    playAgainBtn.style.display = "none"; // Hide PLAY AGAIN btn
    userWin = false;
    outputReached = false;
    window.location.href = "#!/play/select-a-manager";
    pause = false;
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
            heaterOutput.innerHTML = slider.value + "&deg;C";
            
            slider.oninput = function(){
                heaterOutput.innerHTML = this.value + "&deg;C"; 
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

// Function to update budget
function updateBudget(elementID) {
    budgetEl.style.opacity = 0;
    if (elementID.startsWith("bluePipe")) {

        budget -= cost.bluePipe;
        
    } else if (elementID.startsWith("greenPipe")) {

        budget -= cost.greenPipe;

    } else if (elementID.startsWith("heater")) {

        budget -= cost.heater;
    }
    
    if (budget < 0) {
        checkSolution();
        openModal();
        budget = 5000;
        completeReset();
    }
    
    
    setTimeout(function() {
        budgetEl.innerHTML = budget;
        budgetEl.style.opacity = 1;
    }, 150);
    
    localStorage.setItem('budget', budget);
}

// Function to select manager
function managerAbility(ev) {
    manager = ev.currentTarget.id;
	// Only display border on selected manager div
	$(".managerDiv").css({"border": "none", "opacity": 0.5});
	$(".managerDescription").css({"opacity": 0.5});
	$("#" + manager).css({"border": "0.75vmin solid white", "opacity": 1});
	$("#" + manager + "-description").css({"opacity": 1});
	// Display play btn
	$("#playBtnOnManagerPage").css("opacity", "1");
    window.localStorage.setItem('manager', manager);
}

// Function to initiate user data
function initiateData() {
	// If data doesn't exist, set it with defaults
	if (window.localStorage.getItem('refineryLives') === null) {
		window.localStorage.setItem('budget', 5000);
		window.localStorage.setItem('refineryLives', 3);
        window.localStorage.setItem('levelsCompleted', 0);
        window.localStorage.setItem('manager', manager);
        
        // Adjust timer speed for PO manager
        if (manager === "PO") {
            window.localStorage.setItem('timerSpeed', 125);
        } else {
            window.localStorage.setItem('timerSpeed', 100);
        }
	} 
	// Pass data onto JS global variables
	budget = parseInt(window.localStorage.budget);
	lives = parseInt(window.localStorage.refineryLives);
    levels = parseInt(window.localStorage.levelsCompleted);
    timerSpeed = parseInt(window.localStorage.timerSpeed);
    manager = window.localStorage.manager;
    
    // Pass data to HTML page
    budgetEl.innerHTML = budget;
    livesEl.innerHTML = lives;
    levelsEl.innerHTML = levels + 1;
    
    // Change color of manager type
    if (manager === "BA") {
        managerEl.style.color = "#E07A5F";
    } else if (manager === "SE") {
        managerEl.style.color = "#F2CC8F";
    } else {
        managerEl.style.color = "#81B29A";
    }
    
}

// Updates time and transitions
function update() {
    if (!pause) {
        // Increase time by 0.1 seconds
        sec += 0.1;

        var secRemaining = secLimit - sec;

        timer.innerHTML = (Math.round(secRemaining*10)/10).toFixed(1);

        // Change timer color based on time remaining
        if (secRemaining > 30) {
            timer.style.color = "#DAF0EF";
            timerUnit.style.color = "#DAF0EF";
        }                   
        else if (secRemaining <= 30 && secRemaining > 10) {
            timer.style.color = "#F2CC8F";
            timerUnit.style.color = "#F2CC8F";
        }
        else if (secRemaining <= 10) {
            timer.style.color = "#E07A5F";
            timerUnit.style.color = "#E07A5F";
        }

        // Signal game over if time is up
        if (sec >= secLimit) {
            timerOut = true;
            window.clearInterval(myInterval);
            checkSolution();
        }
    }
}