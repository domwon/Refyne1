var arrObjects = [];

//Box Constructor
function boxObject(id, type, x, y) {
    this.id = id;
    this.type = type;
    this.ycoord = y;
    this.xcoord = x;
}

function getX(id) {
    return id%3;
}

function getY(id) {
    return parseInt((id/3));
}

//Create  boxes and push to array "arrObjects"
for(var i = 0; i < 9; i++)
    {
        var id = document.getElementById(i+1).id;
        var newBox = new boxObject(id, "empty1", getX(i), getY(i));
        arrObjects.push(newBox);
    }

//Check to see if surrounding boxes are able to connect
checkRight(arrObjects);
checkLeft(arrObjects);
checkUp(arrObjects);
checkDown(arrObjects);

function checkRight(arrObjects) {
    console.log("This will check to see if the square to the right is filled.");
    for(var i = 0; i < arrObjects.length/3; i++)
        {
            for(var j = 0; j < arrObjects.length/3 - 1; j++)
                {
                    if(arrObjects[3*i + j + 1].type != "empty")
                       {
                            console.log(arrObjects[3*i + j].id + " will connect to " + arrObjects[3*i + j + 1].id);
                       }
                }
        }
    console.log("------------------------");
}

function checkLeft(arrObjects) {
    console.log("This will check to see if the square to the left is filled.");
    for(var i = 0; i < arrObjects.length/3; i++)
        {
            for(var j = 1; j < arrObjects.length/3; j++)
                {
                    if(arrObjects[3*i + j - 1].type != "empty")
                       {
                            console.log(arrObjects[3*i + j].id + " will connect to " + arrObjects[3*i + j - 1].id);
                       }
                }
        }
    console.log("------------------------");
}

function checkUp(colArr) {
    console.log("This will check to see if the square above is filled.");
    for(var i = 1; i < arrObjects.length/3; i++)
        {
            for(var j = 0; j < arrObjects.length/3; j++)
                {
                    if(arrObjects[3*i + j - 3].type != "empty")
                       {
                            console.log(arrObjects[3*i + j].id + " will connect to " + arrObjects[3*i + j - 3].id);
                       }
                }
        }
    console.log("------------------------");
}

function checkDown(colArr) {
    console.log("This will check to see if the square below is filled.");
    for(var i = 0; i < arrObjects.length/3 - 1; i++)
        {
            for(var j = 0; j < arrObjects.length/3; j++)
                {
                    if(arrObjects[3*i + j].type != "empty")
                       {
                            console.log(arrObjects[3*i + j].id + " will connect to " + arrObjects[3*i + j + 3].id);
                       }
                }
        }
    console.log("------------------------");
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
	ev.target.appendChild(document.getElementById(data));
	
	if (data.startsWith("pipe") && pipeContainer.childNodes.length === 1) {
		pipeNum ++;
		pipeContainer.innerHTML = "<div id='pipe" + pipeNum + "' class='pipe element' draggable='true' ondragstart='drag(event)'></div>";
	} 
}