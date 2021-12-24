<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="styles/mainStyle.css">
    <link rel="stylesheet" href="styles/c_navBar.css">

    <title>My Website I Guess</title>
</head>
<body>
    <!--<Nav Bar>-->
        <script id="replace_with_navbar" src="nav.js"></script>
    <!--</Nav Bar>-->
    <center>
        <br>
        <h1 class="titleDemo">Demo Of The Quadtree Algorithm</h1><br><br>
        <p class="lead">Refresh the page to have a new random green rectange<br>
        Clic and move the mouse to see the quadtree subdivise<br>
        The points are placed near the cursor with a random factor<br>
        To check all point pos this algo works on nlog(n) instead log(n*n)<br>
        clic and drag the mouse in the square to see the démo<br>
        -<br>
        fr: Recharger la page pour avoir un nouveau rectange vert<br>
        cliquez et bouger votre souris pour voir le quadtree se diviser<br>
        les points sont placés près de la souris avec un petit écart aléatoire<br></p>
        

        <canvas id="canvas" class="canvas"></canvas>
            <br><br>
        
        <a href="antSimulation.php" class="btn btn-primary">Go To Main Event -></a>

        <div class="centerTxt">
            <p class="lead">Why this website<p2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas aperiam dicta eum magnam earum adipisci recusandae illum repellat in aliquam ex eveniet molestiae dolores, exercitationem doloribus minima. Quo, dolorem. Quis.
            </p>
            
        </div>
    </center>
    
    <!--Demo QuadTree Algo-->
    <script src="scripts/quadTreeVisual/quadTree.js"></script>
    <script src="scripts/quadTreeVisual/mainGraphic.js"></script>
    <!--/Demo QuadTree Algo-->



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>