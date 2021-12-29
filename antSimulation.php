<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/mainStyle.css">
    <link rel="stylesheet" href="styles/c_navBar.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>Document</title>
</head>
<body>
    <!--<Nav Bar>-->
        
        <script id="replace_with_navbar" src="nav.js"></script>
    <!--</Nav Bar>-->
    <form class="form-inline">
        <label class="my-1 mr-2" for="algo">Algo&#8205;&#8205;&#8205;&#8205;&#8205;&#8205;&#8205;&#8205;&#8205; &#8205; &#8205; &#8205; &#8205; &#8205; &#8205; &#8205; &#8205;&#8205; &#8205; &#8205; &#8205; &#8205; &#8205; &#8205; &#8205; &#8205; &#8205; &#8205;    </label>
        <select class="custom-select my-1 mr-sm-2" id="algo">
            <option selected>Quadtree nlog(n)</option>
            <option value="Quadtree nlog(n)">Classic (n*n)</option>
        </select>
    </form>
    <form style="z-index: 100;">
        <div class="form-group row">
            <label for="qtreeN" class="col-sm-2 col-form-label">QuadTree sub divide</label>
            <div class="col-sm-10">
                <input type="number" id="qtreeN" value="5" class="form-control-plaintext">
            </div>
        </div>
        <div class="form-group row">
            <label for="nbAnt" class="col-sm-2 col-form-label">Nb Ants</label>
            <div class="col-sm-10">
                <input type="number" id="nbAnt" value="200" class="form-control-plaintext">
            </div>
        </div>
        <div class="form-group row">
            <label for="nbFood" class="col-sm-2 col-form-label">Nb Food</label>
            <div class="col-sm-10">
                <input type="number" id="nbFood" value="2000" class="form-control-plaintext">
            </div>
        </div>
        <div class="form-group row">
            <label for="nbAnthills" class="col-sm-2 col-form-label">Nb Anthills</label>
            <div class="col-sm-10">
                <input type="number" id="nbAnthills" value="1" class="form-control-plaintext">
            </div>
        </div>
        <br>
        <button type="button" class="btn btn-primary" onclick="changeValues()">OK</button>
    </form>

    <center>
        <h1 class="titleDemo">Ant Simulation</h1>

        <canvas style="background-color: grey;" id="canvas" class="canvas"></canvas>
        <br>
        <button type="button" class="btn btn-primary" onclick="left()"><-</button>
        <button type="button" class="btn btn-primary" onclick="right()">-></button>
        <button type="button" class="btn btn-primary" onclick="up()">up</button>
        <button type="button" class="btn btn-primary" onclick="down()">down</button>
        <br><br>
        <button type="button" class="btn btn-primary" onclick="pauseGame()">Stop</button>
        <button type="button" class="btn btn-primary" onclick="resumeGame()">Resume</button>
        <button type="button" class="btn btn-primary" onclick="plusZoom()">+</button>
        <button type="button" class="btn btn-primary" onclick="minusZoom()">-</button>
        <br><br>
        <button type="button" class="btn btn-primary" onclick="location.reload();">reset</button>
        <br><br>

    </center>



    
    <br><br><br><br><br><br><br>



    <!--Ant With QuadTree Algo-->
    <script src="scripts/antSimulation/menuHandler.js"></script>
    <script src="scripts/antSimulation/drawerHandler.js"></script>
    <script src="scripts/antSimulation/zoomHandler.js"></script>
    <script src="scripts/antSimulation/gameLogic.js"></script>
    <script src="scripts/antSimulation/quadTree.js"></script>
    <script src="scripts/antSimulation/quadtreeAlgoHandler.js"></script>
    <script src="scripts/antSimulation/antAI.js"></script>
    <script src="scripts/antSimulation/mapObjects.js"></script>
    
    <script src="scripts/antSimulation/antGUI.js"></script>
    <!--/Ant With QuadTree Algo-->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>