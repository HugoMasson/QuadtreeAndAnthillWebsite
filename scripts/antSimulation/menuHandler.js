class MenuHandler {
    constructor() {
        //duh ... usefull to have a class like this one right xDDD
    }

    addMenu(posX, posY, elems) {        //could built a quadtree to avoid as much freeze when clicking in the future
        //console.log(posX, posY, elems);
        let toOpen = true;
        for(let i = 0; i < elems.length; i++) {
            if(toOpen) {
                for(let j = 0; j < elems[i].length; j++) {
                    let t = elems[i][j];
                    if(t.x >= posX-t.w/2 && t.x <= posX+t.w/2 && t.y >= posY-t.h/2 && t.y <= posY+t.h/2) {
                        if(elems[i][j].menuOpen == false) {    
                            elems[i][j].openMenu();
                        } else {
                            elems[i][j].menuOpen = false;
                        }
                        toOpen = false;
                        break;
                    }
                }
            } else {
                break;
            }
        }
    }
}