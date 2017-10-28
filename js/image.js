function getPlacedImgLink(currBox, objPlacedID) {
    var currBoxObj = arrPlaced[objPlacedID];
    currX = currBoxObj.xcoord;
    currY = currBoxObj.ycoord;
    var currType = (currBoxObj.type).split('-')[0]; // Get type of obj (w/o num)
    var dirPrev;
    var source;
     
    if (currType != 'heater') { // Element not a heater
        
        // Placed obj at input
        if (arrPlaced[objPlacedID - 1] === undefined) { // obj is first obj
            
            var inputFirstLet = inputSideBoxID[0];
            debugger;
            if (inputFirstLet === "T") {
                dirPrev = "FromTop";
            } else if (inputFirstLet === "R") {
                dirPrev = "FromRight";
            } else if (inputFirstLet === "B") {
                dirPrev = "FromBot";
            } else {
                dirPrev = "FromLeft";
            }
        } else { // Placed obj not at input
            // TODO:
            var prevBoxObj = arrPlaced[objPlacedID-1];

            prevX = prevBoxObj.xcoord;
            prevY = prevBoxObj.ycoord;
            var deltaX = currX - prevX;
            var deltaY = currY - prevY;

            // Determine direction (dir)
            if (Math.abs(deltaX) === 1) { // new obj is left or right of prev obj
                if (deltaX === 1) {// new obj is right of prev obj
                    dirPrev = "FromLeft";
                } else { // ew obj is left of prev obj
                    dirPrev = "FromRight";
                }
            } else if (Math.abs(deltaY) === 1) { // new obj is above or below prev obj
                if (deltaY === 1) {// new obj is above of prev obj
                    dirPrev = "FromBot";
                } else { // new obj is below of prev obj
                    dirPrev = "FromTop";
                }
            }

            // Get link of replace img in prev obj and replace img
            var prevBoxID = arrPlaced[objPlacedID - 1].id;
            var prevBox = document.getElementById(prevBoxID);
            debugger;
            addBoxImg(prevBox, getReplacedImgLink(objPlacedID - 1));

        }
        
        if (dirPrev === "FromTop" || dirPrev === "FromBot") {
            dirPrev = "Vertical";
        } else if (dirPrev === "FromLeft" || dirPrev === "FromRight") {
            dirPrev = "Horizontal";
        }
        
        source = 'res/' + currType + dirPrev + '.png';
        debugger;
        return source;
        
    } else { // element is heater
        return 'res/heater.png';
    }
    
}

function getReplacedImgLink(objPlacedID) {
    var currBox = arrPlaced[objPlacedID];
    currX = currBox.xcoord;
    currY = currBox.ycoord;
    var currType = (currBox.type).split('-')[0]; // Get type of obj (w/o num)
    var dirPrev;
    var dirNext = '';
    var source;
     
    if (currType != 'heater') { // Element not a heater
        
        // Replaced obj at input
        if (arrPlaced[objPlacedID - 1] === undefined) { // obj is first obj
            
            var inputFirstLet = inputSideBoxID[0];
            debugger;
            if (inputFirstLet === "T") {
                dirPrev = "FromTop";
            } else if (inputFirstLet === "R") {
                dirPrev = "FromRight";
            } else if (inputFirstLet === "B") {
                dirPrev = "FromBot";
            } else {
                dirPrev = "FromLeft";
            }
            console.log("Replacing at input");
        } else { // Replaced obj not at input
            // TODO:
            var prevBox = arrPlaced[objPlacedID-1];

            prevX = prevBox.xcoord;
            prevY = prevBox.ycoord;
            var deltaX = currX - prevX;
            var deltaY = currY - prevY;

            // Determine previous direction (dirPrev)
            if (Math.abs(deltaX) === 1) { // new obj is left or right of prev obj
                if (deltaX === 1) {// new obj is right of prev obj
                    dirPrev = "FromLeft";
                } else { // ew obj is left of prev obj
                    dirPrev = "FromRight";
                }
            } else if (Math.abs(deltaY) === 1) { // new obj is above or below prev obj
                if (deltaY === 1) {// replaced obj is below new obj
                    dirPrev = "FromTop";
                } else { // replaced obj is above new obj
                    dirPrev = "FromBot";
                }
            }
        }
        
        // Add additional direction for replace object that has two connections
        var nextBox = arrPlaced[objPlacedID + 1];
        if (nextBox !== undefined) {
            nextX = nextBox.xcoord;
            nextY = nextBox.ycoord;
            var deltaX = nextX - currX;
            var deltaY = nextY - currY;
                
            // Determine next direction (direNext)
            if (Math.abs(deltaX) === 1) { // new obj is left or right of next obj
                if (deltaX === 1) {// replaced obj is left of new obj
                    dirNext = "AndRight";
                } else { // replaced obj is right of new obj
                    dirNext = "AndLeft";
                }
            } else if (Math.abs(deltaY) === 1) { // new obj is above or below next obj
                if (deltaY === 1) {// replaced obj is above new obj
                    dirNext = "AndBot";
                } else { // replaced obj is below new obj
                    dirNext = "AndTop";
                }
            }
        }
        var totalDir = dirPrev + dirNext;
        if (totalDir === "FromBotAndTop" || totalDir === "FromTopAndBot") {
            totalDir = "Vertical";
        } else if (totalDir === "FromLeftAndRight" || totalDir === "FromRightAndLeft"){
            totalDir = "Horizontal";
        } else if (totalDir === "FromBotAndRight" || totalDir === "FromRightAndBot") {
            totalDir = "SECorner";
        } else if (totalDir === "FromTopAndRight" || totalDir === "FromRightAndTop") {
            totalDir = "NECorner";
        } else if (totalDir === "FromBotAndLeft" || totalDir === "FromLeftAndBot") {
            totalDir = "SWCorner";
        } else if (totalDir === "FromTopAndLeft" || totalDir === "FromLeftAndTop") {
            totalDir = "NWCorner";
        } 
        
        source = 'res/' + currType + totalDir + '.png';
        
        debugger;
        return source;
        
    } else { // element is heater
        return 'res/heater.png';
    }
}

function addBoxImg(currBox, source) {
    if (source.startsWith('res/heater')) { // add onclick attrib to heaters
        currBox.innerHTML = '<img id="' + currBox.type + '" src="' + source + '" class="imgElement" onclick="heaterSetting(this);">';
        console.log("heater added");
    } else {
        currBox.innerHTML = '<img src="' + source + '" class="imgElement">'
    }
}