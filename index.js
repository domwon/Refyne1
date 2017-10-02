var arrObjects = [];
var arrPlaced = [];

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

function getX(id) {
    return id%3;
}

function getY(id) {
    return parseInt((id/3));
}

//Create boxes and push to array "arrObjects"
for(var i = 0; i < 9; i++)
    {
        var id = document.getElementById(i+1).id;
        var newBox = new boxObject(id, "empty", getX(i), getY(i));
        arrObjects.push(newBox);
    }

//Checking surrounding boxes if drop is valid
function checkRight(currentObject)
{
    for(var i = 0; i < arrObjects.length; i++)
        {
            if(arrObjects[i].xcoord == currentObject.xcoord + 1 && arrObjects[i].ycoord == currentObject.ycoord)
                {
                    var testObject = arrObjects[i];
                    if(testObject.type != "empty")
                        {
//                            testObject.connectNum++;
//                            testObject.connect = true;
//                            currentObject.connectNum++;
//                            currentObject.connect = true;                            
//                            if((((testObject.type.startsWith("pipe") || testObject.type.startsWith("heater")) && testObject.connectNum > 2) || (testObject.type.startsWith("valve") && testObject.connectNum > 3)) || (((currentObject.type.startsWith("pipe") || currentObject.type.startsWith("heater")) && currentObject.connectNum > 2) || (currentObject.type.startsWith("valve") && currentObject.connectNum > 3)))
//                                {
//                                    adjustBox(testObject);
//                                    return 0;
//                                }
                            
                        }
                        else
                            {
                                testObject.highlight = true;
                                return 1;
                            }
                }
        }
}

function checkLeft(currentObject)
{
    for(var i = 0; i < arrObjects.length; i++)
        {
            if(arrObjects[i].xcoord == currentObject.xcoord - 1 && arrObjects[i].ycoord == currentObject.ycoord)
                {
                    var testObject = arrObjects[i];
                    if(testObject.type != "empty")
                        {
//                            testObject.connectNum++;
//                            testObject.connect = true;
//                            currentObject.connectNum++;
//                            currentObject.connect = true;                            
//                            if((((testObject.type.startsWith("pipe") || testObject.type.startsWith("heater")) && testObject.connectNum > 2) || (testObject.type.startsWith("valve") && testObject.connectNum > 3)) || (((currentObject.type.startsWith("pipe") || currentObject.type.startsWith("heater")) && currentObject.connectNum > 2) || (currentObject.type.startsWith("valve") && currentObject.connectNum > 3)))
//                                {
//                                    adjustBox(testObject);
//                                    return 0;
//                                }
                            
                        }
                    else
                        {
                            testObject.highlight = true;
                            return 1;
                        }
                }
        }
}

function checkUp(currentObject)
{
    for(var i = 0; i < arrObjects.length; i++)
        {
            if(arrObjects[i].xcoord == currentObject.xcoord && arrObjects[i].ycoord == currentObject.ycoord - 1)
                {
                    var testObject = arrObjects[i];
                    if(testObject.type != "empty")
                        {
//                            testObject.connectNum++;
//                            testObject.connect = true;
//                            currentObject.connectNum++;
//                            currentObject.connect = true;                            
//                            if((((testObject.type.startsWith("pipe") || testObject.type.startsWith("heater")) && testObject.connectNum > 2) || (testObject.type.startsWith("valve") && testObject.connectNum > 3)) || (((currentObject.type.startsWith("pipe") || currentObject.type.startsWith("heater")) && currentObject.connectNum > 2) || (currentObject.type.startsWith("valve") && currentObject.connectNum > 3)))
//                                {
//                                    adjustBox(testObject);
//                                    return 0;
//                                }
                            
                        }
                    else
                        {
                            testObject.highlight = true;
                            return 1;
                        }
                }
        }
}


function checkDown(currentObject)
{
    for(var i = 0; i < arrObjects.length; i++)
        {
            if(arrObjects[i].xcoord == currentObject.xcoord && arrObjects[i].ycoord == currentObject.ycoord + 1)
                {
                    var testObject = arrObjects[i];
                    if(testObject.type != "empty")
                        {
//                            testObject.connectNum++;
//                            testObject.connect = true;
//                            currentObject.connectNum++;
//                            currentObject.connect = true;                            
//                            if((((testObject.type.startsWith("pipe") || testObject.type.startsWith("heater")) && testObject.connectNum > 2) || (testObject.type.startsWith("valve") && testObject.connectNum > 3)) || (((currentObject.type.startsWith("pipe") || currentObject.type.startsWith("heater")) && currentObject.connectNum > 2) || (currentObject.type.startsWith("valve") && currentObject.connectNum > 3)))
//                                {
//                                    adjustBox(testObject);
//                                    return 0;
//                                }
                            
                        }
                    else
                        {
                            testObject.highlight = true;
                            return 1;
                        }
                }
        }
}

function eraseBox(currentObject)
{
    currentObject.connect = false;
    currentObject.type = "empty";
    currentObject.pressure = 0;
    currentObject.temperature = 0;
    currentObject.connectNum = 0;
}

function adjustBox(nearbyBox)
{
    nearbyBox.connect = false;
    nearbyBox.pressure += 1;
    nearbyBox.temperature -= 50;
    nearbyBox.connectNum--;
}
console.log(arrObjects);

//Random generator for input and output
var temp;
var input;
var output;
function randomGenerator()
{
    var arrayLetters = ["T", "L", "B", "R"];
    var ranLetter = parseInt(Math.random()*arrayLetters.length);
    var ranNumber = parseInt(Math.random()*Math.sqrt(arrObjects.length));
    if(ranLetter == 0)
        {
            for(var i = 0; i < arrObjects.length; i++)
                {
                    if(arrObjects[i].ycoord == 0 && arrObjects[i].xcoord == ranNumber)
                        {
                            temp = arrObjects[i];
                        }
                }
        }
    else if(ranLetter == 1)
        {
            for(var i = 0; i < arrObjects.length; i++)
                {
                    if(arrObjects[i].xcoord == 0 && arrObjects[i].ycoord == ranNumber)
                        {
                            temp = arrObjects[i];
                        }
                }
        }
    else if(ranLetter == 2)
        {
            for(var i = 0; i < arrObjects.length; i++)
                {
                    if(arrObjects[i].ycoord == Math.sqrt(arrObjects.length) - 1 && arrObjects[i].xcoord == ranNumber)
                        {
                            temp = arrObjects[i];
                        }
                }
        }
    else if(ranLetter == 3)
        {
            for(var i = 0; i < arrObjects.length; i++)
                {
                    if(arrObjects[i].xcoord == Math.sqrt(arrObjects.length) - 1 && arrObjects[i].ycoord == ranNumber)
                        {
                            temp = arrObjects[i];
                        }
                }
        }
}
randomGenerator();
input = temp;
console.log(input);
while(input == temp)
    {
        randomGenerator()
    }
output = temp;
console.log(output);

var inputPressure;
var inputTemperature;
var outputPressure;
var outputTemperature;
function checkSolution(arr)
{
    var finalPressure = inputPressure;
    var finalTemperature = inputTemperature;
    for(var i = 0; i < arr.length; i++)
        {
            finalPressure += arr[i].pressure;
            finalTemperature += arr[i].temperature;
        }
    if(finalPressure == outputPressure && finalTemperature == outputTemperature)
        {
            alert("You won!");
        }
    else
        {
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

function drop(ev) {
    ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.innerHTML="";
    var id = ev.currentTarget.id;
    var idTest = document.getElementById(id);
    
    console.log(arrPlaced);
    
    //TODO: Setting input/output
    console.log(input);
    console.log(output);
    input.highlight = true;
    console.log(ev.currentTarget.id);
    if(ev.currentTarget.hasChildNodes())    //Replacing values
        {
            console.log("Replacing previous element");
            eraseBox(arrObjects[ev.currentTarget.id - 1]);
            for(var i = 0; i < arrPlaced.length; i++)
                {
                    if(arrPlaced[i].id == ev.currentTarget.id)
                        {
                            var replacement = arrPlaced[i];
                        }
                }
            console.log(replacement);
            ev.currentTarget.removeChild(ev.currentTarget.childNodes[0]);
            ev.currentTarget.appendChild(document.getElementById(data));
            if(idTest.children[0].id.startsWith("pipe"))
                {
                    arrObjects[id - 1].type = idTest.children[0].id;
                    arrObjects[id - 1].pressure = arrObjects[id - 1].pressure - 1;    //1 can be changed to any value
                    replacement.type = idTest.children[0].id;
                    replacement.pressure = -1;
                }
            if(idTest.children[0].id.startsWith("heater"))
                {
                    arrObjects[id - 1].type = idTest.children[0].id;
                    arrObjects[id - 1].pressure = arrObjects[id - 1].pressure - 1;
                    arrObjects[id - 1].temperature = arrObjects[id - 1].temperature + 50;    //50 can be changed to any value
                    replacement.type = idTest.children[0].id;
                    replacement.pressure = -1;
                    replacement.temperature = 50;
                }
            if(idTest.children[0].id.startsWith("valve"))
                {
                    arrObjects[id - 1].type = idTest.children[0].id;
                    arrObjects[id - 1].pressure = -1;
                    replacement.type = idTest.children[0].id;
                    replacement.pressure = -1;
                    //TODO
                }
            console.log(arrPlaced);
            var lastPlaced = arrPlaced.length - 1;
            arrPlaced[lastPlaced].highlight = false;
        }
    else if(arrObjects[ev.currentTarget.id - 1].highlight == false)     //Invalid box
        {
            alert("This is not a highlighted box!");
            eraseBox(arrObjects[ev.currentTarget.id - 1]);
            ev.currentTarget.removeChild(ev.currentTarget.childNodes[0]);
        }

    else    //No error, push value
        {
            ev.target.appendChild(document.getElementById(data));
            if(idTest.children[0].id.startsWith("pipe"))
                {
                    arrObjects[id - 1].type = idTest.children[0].id;
                    arrObjects[id - 1].pressure = arrObjects[id - 1].pressure - 1;    //1 can be changed to any value
                }
            if(idTest.children[0].id.startsWith("heater"))
                {
                    arrObjects[id - 1].type = idTest.children[0].id;
                    arrObjects[id - 1].pressure = arrObjects[id - 1].pressure - 1;
                    arrObjects[id - 1].temperature = arrObjects[id - 1].temperature + 50;    //50 can be changed to any value
                }
            if(idTest.children[0].id.startsWith("valve"))
                {
                    arrObjects[id - 1].type = idTest.children[0].id;
                    arrObjects[id - 1].pressure = arrObjects[id - 1].pressure - 1;
                    //TODO
                }
            arrPlaced.push(arrObjects[id - 1]);
            console.log(arrPlaced);
            var lastPlaced = arrPlaced.length - 1;
            arrPlaced[lastPlaced].highlight = false;
        }
    if(ev.currentTarget.id == output.id)
        {
            checkSolution(arrPlaced);
        }

    //To reset all highlight values to false after each drop
    for(var i = 0; i < arrObjects.length; i++)
        {
            arrObjects[i].highlight = false;
        }
    checkRight(arrPlaced[lastPlaced]);
    checkLeft(arrPlaced[lastPlaced]);
    checkUp(arrPlaced[lastPlaced]);
    checkDown(arrPlaced[lastPlaced]);
    
    //Replacing powerup container
    var container = document.getElementById("powerup-bar");
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
    console.log(arrObjects);
}