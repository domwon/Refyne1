function getPlacedImgLink(currBox, objPlacedID) {
    var currBoxObj = arrPlaced[objPlacedID];
    currX = currBoxObj.xcoord;
    currY = currBoxObj.ycoord;
    var currType = (currBoxObj.type).split('-')[0]; // Get type of obj (w/o num)
    var dirPrev;
    var source;
//    debugger;
     
    if (currType != 'heater') { // Element not a heater
        
        // Placed obj at input
        if (arrPlaced[objPlacedID - 1] === undefined) { // obj is first obj
            
            var inputFirstLet = inputSideBoxID[0];
            if (inputFirstLet = "T") {
                dirPrev = "FromTop";
            } else if (inputFirstLet = "R") {
                dirPrev = "FromRight";
            } else if (inputFirstLet = "B") {
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
                if (deltaX = 1) {// new obj is right of prev obj
                    dirPrev = "FromLeft";
                } else { // ew obj is left of prev obj
                    dirPrev = "FromRight";
                }
            } else if (Math.abs(deltaY) === 1) { // new obj is above or below prev obj
                if (deltaY = 1) {// new obj is above of prev obj
                    dirPrev = "FromBot";
                } else { // new obj is below of prev obj
                    dirPrev = "FromTop";
                }
            }

            // Get link of replace img in prev obj and replace img
            var prevBoxID = arrPlaced[objPlacedID - 1].id;
            var prevBox = document.getElementById(prevBoxID);
//            addBoxImg(prevBox, getReplacedImgLink(objPlacedID - 1));
            debugger;
            addBoxImg(prevBox, getPlacedImgLink(objPlacedID - 1));

        }
        
        source = 'res/' + currType + dirPrev + '.png';
        debugger;
        return source;
        
    } else { // element is heater
        return 'res/heater.png';
    }
    
}

function getReplacedImgLink(objPlacedID) {
    return;
    var currBox = arrPlaced[objPlacedID];
    currX = currBox.xcoord;
    currY = currBox.ycoord;
    var currType = (currBox.type).split('-')[0]; // Get type of obj (w/o num)
    var dirPrev;
    var source;
     
    if (currType != 'heater') { // Element not a heater
        
        // Replaced obj at input
        if (arrPlaced[objPlacedID - 1] === undefined) { // obj is first obj
            
            var inputFirstLet = inputSideBoxID[0];
            if (inputFirstLet = "T") {
                dirPrev = "FromTop";
            } else if (inputFirstLet = "R") {
                dirPrev = "FromRight";
            } else if (inputFirstLet = "B") {
                dirPrev = "FromBot";
            } else {
                dirPrev = "FromLeft";
            }
        } else { // Replaced obj not at input
            // TODO:
            var prevBox = arrPlaced[objPlacedID-1];

            prevX = prevBox.xcoord;
            prevY = prevBox.ycoord;
            var deltaX = currX - prevX;
            var deltaY = currY - prevY;

            // Determine direction (dir)
            if (Math.abs(deltaX) === 1) { // new obj is left or right of prev obj
                if (deltaX = 1) {// new obj is right of prev obj
                    dirPrev = "FromLeft";
                } else { // ew obj is left of prev obj
                    dirPrev = "FromRight";
                }
            } else if (Math.abs(deltaY) === 1) { // new obj is above or below prev obj
                if (deltaY = 1) {// new obj is above of prev obj
                    dirPrev = "FromBot";
                } else { // new obj is below of prev obj
                    dirPrev = "FromTop";
                }
            }

            if (arrPlaced[objPlacedID + 1] !== undefined) {
                var dirNext;
            } else {
                // Call function on prev obj
                selectCurrImage(objPlacedID-1);
            }

        }
        
        source = 'res/' + currType + dirPrev + '.png';
        debugger;
        return source;
        
    } else { // element is heater
        return 'res/heater.png';
    }
    
}

function addBoxImg(currBox, source) {
    currBox.innerHTML = '<img src="' + source + '" class="imgElement">'
}