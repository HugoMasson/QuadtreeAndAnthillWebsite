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
    </center>
    <br><br><br><br><br><br><br>



    <!--Ant With QuadTree Algo-->
    <script src="scripts/antSimulation/drawerHandler.js"></script>
    <script src="scripts/antSimulation/zoomHandler.js"></script>
    <script src="scripts/antSimulation/gameLogic.js"></script>
    <script src="scripts/quadTreeVisual/quadTree.js"></script>
    <script src="scripts/antSimulation/antAI.js"></script>
    <script src="scripts/antSimulation/mapObjects.js"></script>
    
    <script src="scripts/antSimulation/antGUI.js"></script>
    <!--/Ant With QuadTree Algo-->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>